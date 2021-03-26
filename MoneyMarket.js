
function formLoadMM() {
}

function customValidation(op){
     switch (op) {
        case 'S':{}
        break;
        case 'I':{}
		break;  
        case 'D':{} 
		break;    
        default:
            break;
    }	
        setDecisionHistory();
        sendMail();
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

function goBackToDashboard(){
    executeServerEvent('onClickGoBackToDashboard','onClick','',true);
}

function cpSelectCategory(){
    executeServerEvent('onChangeCategory','onChange','',true);
}

function cpUpdateLandMsg(){
    executeServerEvent('onClickUpdateMsg','onClick','',true);
}

function setupWin(){
   var resp = executeServerEvent('setupWin','onClick','',true);
   if (resp == "Window setup successful"){
        showMessage("",resp,"confirm");
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