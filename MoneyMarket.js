var jsIR = document.createElement('script');
jsIR.src = '/MoneyMarketW/CustomJS/table2excel.js';
document.head.appendChild(jsIR);

var ProcessName = "MoneyMarketW";
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

let flag = 'Y';
let downloadFlagLocal = 'downloadFlag';



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
            if (activityName == treasuryOfficerMaker){
                if (cpMarket == cpSecondaryMarket){
                    let resp = updateCpSmDtls();
                    if (!isEmpty(resp)){
                        showMessage('',resp,'error');
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

function cpSmSetup(){
    executeServerEvent('smSetup','onChange','',true);
}

function updateCpSmDtls(){
    return executeServerEvent('smCpBidUpdate','onDone',getGridRowCount('table93'),true);
}

function cpUpdatePmBid(){
    let selectedRows = getRowIndex('table90');
    if (selectedRows.length < 1)showMessage('','Kindly select a bid row/s to update','confirm');
    else { 
            for (let i = 0; i < selectedRows.length; i++)
             executeServerEvent('updateBids','onClick',selectedRows[i],true); 
        }
}

function cpPmViewGroupBids(){
    const row = getRowIndex('table88');
    if (row.length < 1) showMessage('','Kindly select a row to view','confirm');
    else  executeServerEvent('viewGroupBids','onClick',row[0],true);
}

function getRowIndex(table){
  return  getSelectedRowsIndexes(table);
}

function downloadCpPmBids(){
   const downloadFlag = getValue('downloadFlag');
    if (isEmpty(downloadFlag)){
         handleDownload();
         executeServerEvent('cpDownloadGrid','onClick','',true);
    }
}

function handleDownload(){
    let hearders = ['Tenor','Rate','Total Amount','Rate Type','Count','Status'];
    let id = "cpPmBidTbl";
    let cssId = "#cpPmBidTbl";
    const fileName = "myBids";
    let rows = getPmRows();
    console.log(rows);
    table = creatVirtualTable(hearders,rows,id);
    const myFrame = document.createElement('iframe');
    const html = '<body>Download Content</body>';
    document.body.appendChild(myFrame);
    myFrame.contentWindow.document.open();
    myFrame.contentWindow.document.write(html);
    myFrame.contentWindow.document.close();
    console.log(myFrame);
    const myFrameDoc = myFrame.contentDocument;
    console.log(myFrameDoc);
    myFrameDoc.body.appendChild(table);
    const tableData = myFrameDoc.querySelectorAll(cssId);
    console.log(tableData);
    myFrame.style.cssText = 'position: absolute; width:0; height:0;border:0;';
    exportToExcel(tableData,fileName);
    myTable = myFrameDoc.getElementById(id);
    console.log(myTable);
    myFrameDoc.body.removeChild(myTable);
    console.log(myFrame);
    document.body.removeChild(myFrame);
}

function disableField(local){
    setStyle(local,'disable','true');
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
        showMessage('','Window setup sucessful kindly submit workitem','confirm');
   }
   else   showMessage("",resp,"error");
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
   console.log(output);
   let outputs =  output.split("$");
   console.log('output array-- '+outputs);

   let rows = [];
   let count = outputs.length;
   console.log('count '+count);
   for (let i = 0; i <  count - 1; i++){
       console.log('string '+ outputs[i]);

       let obj = JSON.parse(outputs[i]);
        rows.push(obj);
   }
    return rows;
}

function createTable(){
    let hearders = ['Tenor','Rate','Total Amount','Rate Type','Count','Status'];
    let rows = getPmRows();
    console.log(rows);
    let id = 'myId';

    const table = creatVirtualTable(hearders,rows,id);

    console.log(table);
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