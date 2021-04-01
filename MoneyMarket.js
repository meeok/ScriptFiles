

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

function cpDownloadGrid(){
    var myWindow = window.open("", "MsgWindow", "width=200,height=100");
    myWindow.document.write("<p>This is 'Download window'. Excel download completed</p>");
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
