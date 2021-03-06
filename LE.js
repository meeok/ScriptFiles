/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 13/12/2016       Mohit Sharma            Bug 66247 - Validation on submit button in ibps mobile form required
 * 07/05/2018       Gaurav Sharma           Bug 77543 - Events and webservice functionality not working in iform not getting output.
 * 06/11/2018       Gaurav                  Bug 81232 - Digit Grouping not working in setValues() API
 * 12/12/2018       Aman Khan               Bug 81913 - In style3 TextBox,Label name not aligned properly.
 * 12/02/2019       Aman Khan               Bug 83038 - We need to open the URL in the application on click of labels.
 * 21/02/2019       Gaurav                  Bug 83221 - Not able to set value in editable combo using setValues
 * 26/02/2019       Abhishek                Bug 83310 - Removal of RTE Features
 * 26/04/2019       Aman Khan               Bug 84373 - unable to set date in ipad
 * 30/04/2019       Aman Khan               Bug 84407 - If the type of field in a comboBox is a DropDown then it is not getting populated through code whereas a DropDownList is workking fine. Kindly check this.
 * 28/05/2019       Gaurav                  Bug 84949 - mandatory validation is not removed if data is set using API.
 * 28/05/2019       Abhishek                Bug 84964 - Custom alert on cross icon of grid
 * 12/07/2019       Abhishek                Bug 85595 - Suppress format tools in Richtext editor Initially 
 */
var activityName= getWorkItemData("activityName");   

function formLoadLE(){
    executeServerEvent("","formLoad","",true);
    makeAddInvisble("add_table4", "Review_and_advise_action");  
}

function customValidation(op){
    switch (op) {
        case 'S':
            break;
        case 'I':{
            var decision = getValue("Decision");
            var activityName= getWorkItemData('activityName');
            var count = getGridRowCount("table4");
            if (activityName == "Branch_Initiator" || activityName == "IA_Initiator"){
                if ((activityName == "Branch_Initiator" || activityName == "IA_Initiator") && decision == "Submit"){

                if (count == 1){
                    executeServerEvent("setSolId","CUSTOM",getGridRowCount("table4"),true);
                }
                        
                var docCount =  executeServerEvent("","ONDONE","",true);
                var resp = executeServerEvent("checkAccountTable","CUSTOM",getGridRowCount("table4"),true);
                var respReqType = executeServerEvent("checkRequest","CUSTOM",getGridRowCount("table4"),true);

                if(docCount=="false"){
                  showMessage("","Please Attach Document","error");
                 return false;
                }

                if(!(resp == null || resp == "")){
                    showMessage("",resp,"error");
                    return false
                    }

                if(!(respReqType == null || respReqType == "")){
                    showMessage("",respReqType,"error");
                    return false
                    }

                if ((activityName == "IA_Initiator" && decision == "Submit") && (count > 1)){
                saveWorkItem();
                executeServerEvent("import","ONDONE","Insert",true);
                } 
                    
            }
        }
            decisionHistory();   
           executeServerEvent("","SENDMAIL","",true);   
    }
            break;
        case 'D':{
            var activityname=getWorkItemData('activityName');
            var prev_WS = getValue ("Prev_WS");
            var decision = getValue("Decision");
            var count = getGridRowCount("table4");
            var attachedSolId = getValue("ATTAC_INIT_SOL");
			var orginatingSolId = getValue("Initiator_SOL_ID");
         
            if (activityname == "Review_and_advise_action"){
                if (decision == "Approve"){
                var resp = executeServerEvent("checkRequest","CUSTOM",getGridRowCount("table4"),true);
                if (!(resp == null || resp == "")){
                showMessage("",resp,"error");
                return false;
                }
            }
            if (count == 1){
                executeServerEvent("getRequestType","CUSTOM",getGridRowCount("table4"),true);
            }

                if ((prev_WS == "Branch_Initiator" && decision == "Approve") && (count > 1)){
                saveWorkItem();
                executeServerEvent("import","ONDONE","Insert",true);  
                }
            }

            if (activityname == "Attach_Documents" && decision == "Approve"){
                if (attachedSolId == orginatingSolId){
                var resp = executeServerEvent("","ONDONE","",true);
                if (!(resp == null || resp == "")){
                showMessage("",resp,"error");
                return false;
                }
            }
            else {
                var isDocCount = executeServerEvent("","ONDONE","",true);
                if(isDocCount=="false"){
                   showMessage("","Please Attach Document","error");
                    return false;
                }
            }
            }

            if(activityname == "Attach_acknowledgement_copy" && decision =="Approve") {
                var isDocCount = executeServerEvent("","ONDONE","",true);
                    if(isDocCount=="false"){
                       showMessage("","Please Attach Document","error");
                        return false;
                    }
            }
            
            if (activityname == "Internal_Audit" && decision =="Approve"){
                var resp = executeServerEvent("","ONDONE","",true);
                if (!(resp == null || resp == "")){
                showMessage("",resp,"error");
                return false;
                }
            }
            if (activityname == "Originating_Branch" && decision =="Approve"){
                var isDocCount = executeServerEvent("","ONDONE","",true);
                if(isDocCount=="false"){
                   showMessage("","Please Attach Document","error");
                    return false;
                }
            }

            decisionHistory();
           executeServerEvent("","SENDMAIL","",true);
        }
            break;
        default:
            break;
    }
    return true;
}

function checkDecision(){
    var activityName= getWorkItemData('activityName');
    if (activityName == "Branch_Initiator" || activityName == "IA_Initiator"){
        executeServerEvent("","CHECKDECISION","",true);
    }
}

function checkLEANumber(){
    var resp = executeServerEvent("checkLeRef","CUSTOM","",true);
    if (!(resp == null || resp == "")){
        showMessage("",resp,"error");
    }
}

function testWebService(){
    var temp = getValue("table4_AccountNumber");
    var res = temp.charAt(0);
    if(temp.length < 10 || temp.length > 10){
       setValue("table4_AccountNumber","");
       showMessage("","Length Of Account Number Is Incorrect","error");
    }
    else if (res > 3) {
        showMessage("","Please Check Account Number And Try Again","error");
    }
    else
        executeServerEvent("","WEBSERVICE","",true);   
}

function webServicePostHook(controlId) {
	if (controlId == "fetchSavingsAccount")
        getWEebServiceError();
    else if (controlId == "fetchCurrentAccount")
                getWEebServiceError();
    else if (controlId == "fetchSpecialAccount")
                 getWEebServiceError();
}

function getWEebServiceError(){
    var status = getValue("table4_status");
    var res = status.toUpperCase();
    var errorCode = getValue("table4_errorCode");
    var errorDesc = getValue("table4_errorDesc");
    if ((res != null || res != "")&& (res != "FAILURE" || res != "FAILED")){
       executeServerEvent("","GETUSERS","",true);
    }
   else if (res == "FAILURE" || res == "FAILED"){
        showMessage("",errorCode +" : "+ errorDesc,"error");
    }
    else if (status == "" || status == null){
        showMessage("","Finacle System Error Occured!!! Please Contact System Administrator","error");
    }
}

function makeAddInvisble(addTableId, activityname){
var activityName= getWorkItemData("activityName"); 
if(activityname == activityName)
   setStyle(addTableId,"visible","false"); 
}

function decisionHistory(){
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
    
// var dateStr="2011-08-03 09:15:11"; //returned from mysql timestamp/datetime field
// var a=dateStr.split(" ");
// var d=a[0].split("-");
// var t=a[1].split(":");
// var date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);


	var staff = getWorkItemData("userName");
	var entryDate = getValue('EntryDateTime');
    var entryDate2 = Date.parse(entryDate);
    var date2 = Date.parse(date);
	var TAT = (date2 - entryDate2);
	var seconds = Math.round((TAT/1000)%60);
    var TAT_Minutes = Math.round((TAT/(1000*60))%60);
    var TAT_Hours = Math.round((TAT/(1000*60*60)));
    
addDataToGrid('table1',[{
                        'WorkStepName':getWorkItemData('activityName'),
                        'Logged Staff':staff,
                        'Entry Date': getValue('EntryDateTime'),
                        'Exit Date':date,
                        'Turn Around Time':TAT_Hours+"h "+TAT_Minutes+"m "+seconds+"s",
                        'Decision':getValue('Decision'),
                        'Remarks':getValue('LE_REMARKS')}]);

}

function Is_domiciled(){
executeServerEvent("setIsDomiciled","CUSTOM","",true);
}

function makeIsDomiciledInvsible(){
executeServerEvent("setInvisible","CUSTOM",getGridRowCount("table4"),true);
}

function alphanum(){
    var ele = /((^[0-9]+[a-z]+)|(^[a-z+[0-9]+))+[0-9a-z]+$/i;
    if(getValue('LEA_Reference_Number').match(ele)){
    showMessage("","Your Reference Number is not Alphanumeric.","error");
    clearValue('LEA_Reference_Number','true');
    }
    else{
    checkLEANumber(); 
    }
}
    
function gridcount(){
        var countofrow=getGridRowCount('table4');
        setValue('gridCount',countofrow);   
    
}

function checkAcctNum(){
    var acct = getValue("table4_AccountNumber");
    if(acct.length < 10 || acct.length > 10){
        setValue("table4_AccountNumber","");
        showMessage("","Incorrect Account Number, Please Enter a correct one","error");
    }
}


function formload_LEA(){
        var activityname=getWorkItemData('activityName');
        var staffnumber = getWorkItemData('UserName');
        var remarks = getValue('Remarks');
        var sol_id = getValue('SOL_ID');
        var Decision = getValue('Decision');
    if(activityName == 'Branch_Initiator')
        {
            setValue('StaffID',getWorkItemData('UserName'));
            clearComboOptions("Decision");
            addItemInCombo("Decision", "Submit", "Submit", "tooltip");
            addItemInCombo("Decision", "Discard", "Discard", "tooltip");
    
        }
    else if(activityName == 'IA_Initiator')
        {
            clearValue('Decision','true');
            clearValue('Remarks','true');
            setValue('StaffID',getWorkItemData('UserName'));
            setStyle('AccountSOL_ID','visible','false');
            clearComboOptions("Decision");
            addItemInCombo("Decision", "Submit", "Submit", "tooltip");
            addItemInCombo("Decision", "Discard", "Discard", "tooltip");
        }        
        else if(activityName == 'Review_and_advise_action')
        {
            clearValue('StaffID','true');
            clearValue('Decision','true');
            clearValue('Remarks','true');
            setValue('StaffID',getWorkItemData('UserName'))
            var prev_WS= getValue("Prev_WS");
            if (prev_WS == "Attach_Documents") {
				    setStyle("frame5","visible","true");
				    setStyle("frame5","disable","true");
				    setStyle("frame4","visible","false");
            }
            clearComboOptions("Decision");
            addItemInCombo("Decision", "Approve", "Approve", "tooltip");
            addItemInCombo("Decision", "Reject", "Reject", "tooltip");
        }
        else if(activityName == 'Attach_Documents')
        {
            clearValue('StaffID','true');
            clearValue('Decision','true');
            clearValue('Remarks','true');
            setStyle("frame4","visible","false");
            setValue('StaffID',getWorkItemData('UserName'));
            clearComboOptions("Decision");
            addItemInCombo("Decision", "Approve", "Approve", "tooltip");
            addItemInCombo("Decision", "Return", "Return", "tooltip");
        }
        else if(activityName == 'Attach_acknowledgement_copy')
        {
            clearValue('StaffID','true');
            clearValue('Decision','true');
            clearValue('Remarks','true');
            setValue('StaffID',getWorkItemData('UserName'));
            // clearComboOptions("Decision");
            // addItemInCombo("Decision", "Approve", "Approve", "tooltip");
            // addItemInCombo("Decision", "Return", "Return", "tooltip");
        }  
}  


