var jsIR = document.createElement('script');
jsIR.src = '/MoneyMarketW/CustomJS/table2excel.js';
document.head.appendChild(jsIR);

var ProcessName = "MoneyMarketW";
let table;
//WorkSteps
var treasuryOfficerInitiator = "Treasury_Officer_Initiator";
var treasuryOfficerVerifier = "Treasury_Officer_Verifier";
var treasuryOfficerMaker = "Treasury_Officer_Maker";
var treasuryOpsVerifier = "TreasuryOps_Verifier";
var treasuryOpsMature = "TreasuryOps_Mature";
var awaitingMaturityUtility = "AwaitingMaturity_Utility";
var treasuryOpsMatureOnMaturity = "TreasuryOps_Mature_on_maturity";
var branchInitiator = "Branch_Initiator";
var branchVerifier = "Branch_Verifier";
var branchException = "Branch_Exception";
var rpcVerifier = "RPC_Verifier";
var treasuryOpsFailed = "TreasuryOps_Failed";
var awaitingMaturity = "AwaitingMaturity";
var treasuryOpsSuccessful = "TreasuryOps_Successful";
var discardWs = "Discard";
var exit = "Exit";
var query = "Query";

var commercialProcess = "cp_market";
var treasuryProcess ="tb_market";
var cpPrimaryMarket = "primary";
var cpSecondaryMarket = "secondary";
var cpPostErrMsg ="Kindly Post Transaction";



function formLoadMM() {
}

function customValidation(op){
var activityName = getWorkItemData("activityName");
var cpMarket = getValue("cp_select_market");
var getProcess = getValue("g_select_market");
var cpPostFlag = getValue("cp_postFlag");
     switch (op) {
        case 'S':{}
        break;
        case 'I':{
            if (activityName == branchInitiator){
                if (getProcess == commercialProcess && cpMarket ==  cpPrimaryMarket ){
                    var resp = cpValidatePmWindow();
                    if (!isEmpty(resp))
                            showMessage('',resp,'confirm');
                }
            }
            setDecisionHistory();
            sendMail();
        }
		break;  
        case 'D':{
            if (activityName == branchVerifier){
                if (getProcess == commercialProcess && cpMarket ==  cpPrimaryMarket ){
                    if (isEmpty(cpPostFlag)){
                        showMessage('',cpPostErrMsg, 'error');
                        return false;
                    }

                    var resp = cpValidatePmWindow();
                    if (!isEmpty(resp)){
                        showMessage('',resp,'confirm');
                        return false;
                    }
                }
            }
            setDecisionHistory();
            sendMail();
        } 
		break;    
        default:
            break;
    }	  
    return true;
}


function downloadCpPmBids(){
    let hearders = ['Tenor','Rate','Total Amount','Rate Type','Count','Status'];
    let id = "cpPmBidTbl";

    let rows = [
        {tenor: '7', rate: '10.0', totalAmount: '12000', rateType : 'kufre', count: '3', status: 'Awaiting Treasury' },
        {tenor: '20', rate: '13.0', totalAmount: '11000', rateType : 'Bank', count: '4', status: 'Awaiting Treasury' },
        {tenor: '200', rate: '7.0', totalAmount: '100', rateType : 'Personal', count: '3', status: 'Awaiting Treasury' },
        {tenor: '150', rate: '11.0', totalAmount: '1200', rateType : 'Personal', count: '3', status: 'Awaiting Treasury' }
    ];

    table = creatVirtualTable(hearders,rows,id);
    const iframe = document.getElementById('iframe3');
    const iframeDocument = iframe.contentDocument;
    iframeDocument.body.appendChild(table);

const tableData = iframeDocument.querySelectorAll("#cpPmBidTbl");
    exportToExcel(tableData,"bids");
}

function getPmGrid (){
   return executeServerEvent('cpPmGrid','custom',getGridRowCount('table88'),true);
}

function loadIframe(){
   var resp = document.getElementById("iframe1").src="CustomHtm/index.html";
}

function selectProcess (){
	executeServerEvent('onChangeProcess','onChange','',true);
}

function setDecisionHistory (){
    var decHisFlag = getValue("g_decisionHistoryFlag");
    if (decHisFlag == null || decHisFlag == "")
        executeServerEvent("","decisionHistory","",true);
}

function sendMail (){
    executeServerEvent('','sendMail','',true);
}


function goBackToDashboard(){
    executeServerEvent('onClickGoBackToDashboard','onClick','',true);
}

function cpSelectMarket(){
    executeServerEvent('onChangeMarket','onChange','',true);
}

function cpValidateAccount(){
    var resp = executeServerEvent('','cpApiCall','',true);
    var resp2 = resp.split("#");
    if (!isEmpty(resp))
         showMessage('',resp2[0],'confirm');
 }

function cpValidatePrincipal(){
    var resp = executeServerEvent('onChangePrincipal','onChange','',true);
    if (!isEmpty(resp))
        showMessage('',resp,'error');
}

function cpValidateToken (){
    resp = executeServerEvent('cpTokenEvent','cpApiCall','',true);
    if (!isEmpty(resp))
        showMessage('',resp,'confirm');
}

function cpViewReport(){
    executeServerEvent('cpViewReport','onClick','',true);
}

function cpPostTxn(){
    resp = executeServerEvent('cpPostEvent','cpApiCall','',true);
    showMessage('',resp,'confirm');
}

function cpValidateTenor(){
   var resp = executeServerEvent('onChangeTenor','onChange','',true);
   if (!isEmpty(resp))
        showMessage('',resp,'error');
}

function cpSelectRateType(){
     executeServerEvent('onChangeRate','onChange','',true);
}

function cpValidatePmWindow(){
   return executeServerEvent('validateWindow','onDone','',true);
}

function cpSelectCategory(){
    var resp = executeServerEvent('onChangeCategory','onChange','',true);
    if (!isEmpty(resp))
        showMessage('',resp,'confirm');
}

function cpUpdateLandMsg(){
    executeServerEvent('onClickUpdateMsg','onClick','',true);
}

function setupWin(){
   var resp = executeServerEvent('setupWin','onClick','',true);
   if (resp == "success"){
        completeWorkItem();
   }
   else   showMessage("",resp,"confirm");
}

function cpSubmitlandMsgUpdate(){
    var updateMsgflag = getValue('cp_updateMsg');
    if (updateMsgflag == "true")
          completeWorkItem();
}

function isEmpty(resp){
    return resp == null || resp == "";
}





function GenerateTemplate() {
	var sessionId=getWorkItemData("sessionId");
	var returnValue = executeServerEvent("TemplateGeneration", "click",sessionId, true)
	if(returnValue.indexOf("<ErrorCode>") != -1) {
		var errorCode=returnValue.substring(returnValue.indexOf("<ErrorCode>")+11,returnValue.indexOf("</ErrorCode>"));
		if(errorCode==1) {
			var errorDesc=returnValue.substring(returnValue.indexOf("<ErrorDesc>")+11,returnValue.indexOf("</ErrorDesc>"));
			showMessage("cmdGenerateTemplate",errorDesc,"error");			
		} else {
			var resultXML = returnValue.split("$");
			var docIndex = "";
			if(resultXML[1] == 'deleteadd') {
				docIndex=resultXML[2];
			}
			var activityname	= getWorkItemData('activityName');
				docPaneRefresh(resultXML[0],docIndex,resultXML[1]);
		}
	} else if(returnValue.indexOf("<MainCode>") == -1) {
		showMessage("cmdGenerateTemplate",returnValue.substring(returnValue.indexOf("<EDESC>")+7,returnValue.indexOf("</EDESC>")),"error");
	}
	if(mobileMode==""){
            saveWorkItem();
        }
}

function doPostAjax(url,sParams) {
	var retval="-1";
	var req = getACTObj();
	req.onreadystatechange = processRequest;
	req.open("POST",url, false);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.send(sParams);
	function processRequest() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				parseMessages();
			} else {
				retval='-1';
			}
		}
	}

	function parseMessages() {
		retval=trim(req.responseText);
	}
	return retval;
}

function getACTObj() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest
	}
	var a=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
	for(var c=0;c<a.length;c++) {
		try 
		{
			return new ActiveXObject(a[c])
		} catch(b){}
	}                              
	return null;
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}

function docPaneRefresh(result,docIndex,addModeCustom) {
    if(mobileMode=="ios"||mobileMode=="android"){reloadDocumentList();}
    else{window.parent.parent.customAddDoc(''+result+'',docIndex,addModeCustom);}
}
	

function reloadDocumentList(){ 
    var obj = {"ReloadDocument":"true"}; window.parent.postMessage(obj, "*"); 
}

function exportToExcel (tableData, filename){
    var table2excel = new Table2Excel();
    table2excel.export(tableData,filename);
}


function getPmRows (){
   let output = getPmGrid();
   let outputs =  output.split("$");
   let rows = [];
   let count = outputs.length;
   for (let i = 0; i <  count - 1; i++)
        rows.push(JSON.parse(outputs[i]));
   
    console.log(rows);
    return rows;
}

function creatVirtualTable(headers, rows, id){
    let headRow = document.createElement('tr');
    let table = document.createElement('table');
    table.setAttribute('id',id);
    var thead = table.createTHead();
    var tbody = table.createTBody();

    headers.forEach(headText =>{
        let header = document.createElement('th');
        let textNode = document.createTextNode(headText);
        header.appendChild(textNode);
        headRow.appendChild(header);
    });
    thead.appendChild(headRow);

    rows.forEach(value => {
        let row = document.createElement('tr');
        Object.values(value).forEach(text =>{
            let cell = document.createElement('td');
            let  textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    })
    console.log(table);
    return table;
}