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

var pid = getWorkItemData("processInstanceId");
function customValidation(op){  
var activityname = getWorkItemData("activityName"); 
         
      switch (op) {
           case 'S':            
               break;

           case 'I':{  
          if (activityname == "Appraiser_Initiation"){  
          var resp = executeServerEvent("","solCheck","",true);
          if(!(resp == null || resp == "")){
            showMessage("",resp,"error");
            return false;
          } 
          var result = executeServerEvent("checkcloseDateInitSubmit","CUSTOM","", true);
          if(!(result == null || result == "")){
            showMessage("",result,"error");
            return false;
          } 
        decisionHistory();
           }

        if (activityname == "Appraisal_Window"){  
          var resp = executeServerEvent("checkDate","CUSTOM","", true);
            if(!(resp==null || resp=="")) {
              showMessage("",resp,"error");
              return false;
                   }
          decisionHistory();
             }
          }
           
           break;
           
          case 'D':{   
          if (activityname == "Appraiser_Rework"){  
              var resp = executeServerEvent("","solCheck","",true);
              if(!(resp == null || resp == "")){
                showMessage("",resp,"error");
                return false;
              }  
              var result = executeServerEvent("checkcloseDateReworkSubmit","CUSTOM","", true);
              if(!(result == null || result == "")){
                showMessage("",result,"error");
                return false;
              }                    
            decisionHistory();
               } 
           
          if (activityname == "Appraisee_workdesk") { 

            var resp = executeServerEvent("checkdisclaimer","CUSTOM","", true);
            if(!(resp==null || resp=="")) {
              showMessage("",resp,"error");
              return false;
                   }

            var result = executeServerEvent("checkcloseDateAppSubmit","CUSTOM","", true);
            if(!(result == null || result == "")){
              showMessage("",result,"error");
              return false;
                } 
           decisionHistory();
            break;	
          }

          if (activityname == "HCMD_Appraisal_Window") { 
            var resp = executeServerEvent("checkDate","CUSTOM","", true);
            if(!(resp==null || resp=="")) {
              showMessage("",resp,"error");
              return false;
                   }
            decisionHistory();
            break;	
          }
          if (activityname == "Line_Manager_workdesk") { 
            decisionHistory();
            break;	
          }

          }  
          
          default:
        break;
       }    
       return true;
      }
     
function sumKPIaverage (){
var count11 = getGridRowCount("sharedKPI_table");
var count12 = getGridRowCount("individualKPI_table");
if (count11 > 0 && count12 > 0){
  if (count11 == 3 && count12 == 5){
    var resp = executeServerEvent("checkActualValue","CUSTOM",getGridRowCount("sharedKPI_table")+"#"+getGridRowCount("individualKPI_table"),true);
    var resp2 = executeServerEvent("checkvaluesharedkpi","CUSTOM",getGridRowCount("sharedKPI_table")+"#"+getGridRowCount("individualKPI_table"), true);
    var resp3 = executeServerEvent("checkindivkpi","CUSTOM",getGridRowCount("individualKPI_table"), true);
    if(!(resp3==null || resp3=="")) {
        showMessage("",resp3,"error");
             } 
    else if(!(resp==null || resp=="")) {
      showMessage("",resp,"error");
          }
    else if(!(resp2==null || resp2=="")) {
      showMessage("",resp2,"error");
          }
       else if((resp==null || resp=="")) {
        executeServerEvent("","kpiReveiwSum",getGridRowCount("sharedKPI_table")+"#"+getGridRowCount("individualKPI_table"),true);
  }
}
else showMessage ("","Please DELETE any extra row(s) added as only predefined rows is required","error");
}
      else showMessage("","Please Input ALL Values in SOFT SKILLS REVIEW SECTION","error");   
saveWorkItem();
}



function sumSoftSkills (){
var count = getGridRowCount("workResult_table");
var count2 = getGridRowCount("performance_table");
var count3 = getGridRowCount("interpersonal_table");
if (count > 0 && count2 > 0 && count3 > 0){
  if (count == 1 && count2 == 1 && count3 == 1){
  var resp = executeServerEvent("checksoftskills","CUSTOM",getGridRowCount("workResult_table")+"#"+getGridRowCount("performance_table")+"#"+getGridRowCount("interpersonal_table"),true);
  var resp2 = executeServerEvent("checkvaluesoftskill","CUSTOM",getGridRowCount("workResult_table")+"#"+getGridRowCount("performance_table")+"#"+getGridRowCount("interpersonal_table"),true);
  if(!(resp==null || resp=="")) {
  showMessage("",resp,"error");
  }
  if(!(resp2==null || resp2=="")) {
    showMessage("",resp2,"error");
    }
else if ((resp==null || resp=="") || (resp2==null || resp2=="")) {

executeServerEvent("setSoftSkills","CUSTOM",getGridRowCount("workResult_table")+"#"+getGridRowCount("performance_table")+"#"+getGridRowCount("interpersonal_table"),true);
    }
  }
  else showMessage ("","Please DELETE any extra row(s) as only one row of data is needed for each tab","error");
  }
        else showMessage("","Please Input ALL Values in SOFT SKILLS REVIEW SECTION","error");  
        
  saveWorkItem();

}


function clearsoftskillresult(){
      executeServerEvent("erasesofttotal","CUSTOM",true);
      softskillerror();
      }
				 
 function checkvaluecusexp(){
  var count1 = getGridRowCount("sharedKPI_table");
    if (count1 > 0){
    var resp = executeServerEvent("checkvaluecustexp","CUSTOM",getGridRowCount("sharedKPI_table"), true);
    if(!(resp==null || resp=="")) {
      showMessage("",resp,"error");
           }
    }
  }

function checkindivscore(){
  var count12 = getGridRowCount("individualKPI_table");
  if (count12 > 0){
  var resp = executeServerEvent("checkindivkpi","CUSTOM",getGridRowCount("individualKPI_table"), true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
      }
}


function checkvaluetransvol(){
        var count12 = getGridRowCount("individualKPI_table");
        if (count12 > 0){
          var resp = executeServerEvent("checkvaluetransvol","CUSTOM",getGridRowCount("individualKPI_table"), true);
          if(!(resp==null || resp=="")) {
            showMessage("",resp,"error");
                 }
          }
  }

function solbutton(){
  var resp = executeServerEvent("","solCheck","",true);
          if(!(resp == null || resp == "")){
            showMessage("",resp,"error");
            return false;
          } 
}

function softskillerror (){
var count = getGridRowCount("workResult_table");
var count2 = getGridRowCount("performance_table");
var count3 = getGridRowCount("interpersonal_table");
if (count <= 0 || count2 <= 0 || count3 <= 0|| count >= 0 || count2 >= 0 || count3 >= 0){
  var resp = executeServerEvent("checkvaluesoftskillerror","CUSTOM", getGridRowCount("workResult_table")+"#"+getGridRowCount("performance_table")+"#"+getGridRowCount("interpersonal_table"),true);
  if(!(resp==null || resp=="")) {
  showMessage("",resp,"error");
  }
}
}

function sharedkpiset(){
  checkvaluecusexp();
   executeServerEvent("","ONLOSTFOCUS",true);
      }

function individualkpiset(){
  checkvaluetransvol()
   executeServerEvent("","ONCHANGE",true);
        }

        function setmail(){
        var staffid = getValue("appraiseeID");
        setValue("initiatorID", getValue("userID"));
        setValues({"emailadd": ''}, true);
        setValues({"emailadd": staffid + '@firstbanknigeria.com'}, true);
        setValues({"appraiseeName": ''}, true);
        setValues({"appraiseeSol": ''}, true);
        setValues({"appraiseeBranch": ''}, true);
        setValues({"appraiseeJobRole": ''}, true);
        setValues({"supervisorID": ''}, true);
        }

      function demmail(){
      executeServerEvent("", "GETUSERS", "", true);

      }
      function setup(){
        executeServerEvent("", "ONCHANGE", "", true);
        }

      function windowstatus(){
        clearValue("windowstatus", "true");
        var resp = executeServerEvent("","click","", true);
         if(!(resp == null || resp == "")){
            showMessage("",resp,"confirm");
          }          
        //alert ("Window status called");
      }

      function checkDate(){
        // checkDateUpdate();
          var resp = executeServerEvent("checkDate","CUSTOM","", true);
          if(!(resp==null || resp=="")) {
            showMessage("",resp,"error");
                 }
                 checkDateUpdate();
  }

  function checkDateUpdate(){
    var resp = executeServerEvent("checkDateUpdate","CUSTOM","", true);
    if(!(resp==null || resp=="")) {
      showMessage("",resp,"error");
           }
}

function checkOpenDate(){
  var resp = executeServerEvent("checkopenDate","CUSTOM","", true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
}

  function checkcloseDate(){
    var resp = executeServerEvent("checkcloseDate","CUSTOM","", true);
    if(!(resp==null || resp=="")) {
      showMessage("",resp,"error");
           }
}

function checkcloseDateInitSubmit(){
  var resp = executeServerEvent("checkcloseDateInitSubmit","CUSTOM","", true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
}

function checkdisclaimer(){
  var resp = executeServerEvent("checkdisclaimer","CUSTOM","", true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
}

function checkcloseDateApp(){
  var resp = executeServerEvent("checkcloseDateApp","CUSTOM","", true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
}

function checkcloseDateAppSubmit(){
  var resp = executeServerEvent("checkcloseDateAppSubmit","CUSTOM","", true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
}

function checkcloseDateRework(){
  var resp = executeServerEvent("checkcloseDateRework","CUSTOM","", true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
}

function checkcloseDateReworkSubmit(){
  var resp = executeServerEvent("checkcloseDateReworkSubmit","CUSTOM","", true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
}

function checkwindowstatus(){
  var resp = executeServerEvent("checkwindowstatus","CUSTOM","", true);
  if(!(resp==null || resp=="")) {
    showMessage("",resp,"error");
         }
}

      
        function staff_check() {
          executeServerEvent(
                 "",
                 "staff_check",
                 true
               );
         }

         
      function fetchstaffdetails()
        {
          demmail();  
          setmail();
          var resp = executeServerEvent("","click","", true);
          if(!(resp == null || resp == "")){
            showMessage("",resp,"error");
          }          
         //saveWorkItem();
        }
   
    function calltable(){
      var count = getGridRowCount("sharedKPI_table");
     // alert(count);
      var count2 = getGridRowCount("individualKPI_table");
      //alert(count2);
      var count3 = getGridRowCount("kpi_table");
      //alert(count3);
      var count4 = getGridRowCount("legend_table");
      //alert(count4);
      if (count === 0 && count2 === 0 && count3 === 0 && count4 === 0){
       executeServerEvent("", "tableLoad", "", true);
      }
      }
    
    function formLoad(){ 
      var activityname = getWorkItemData("activityName");
      if (activityname == "Appraisal_Window") {
        checkwindowstatus();
        var winame = getWorkItemData("processInstanceId");
        setValues({"winame": winame}, true);
        SEA(); 
     
      }

      if (activityname == "HCMD_Appraisal_Window" ) {
        var winame = getWorkItemData("processInstanceId");
        setValues({"winame": winame}, true);
        SEA(); 
     
      }
      if (activityname == "Appraiser_Initiation") {
        checkOpenDate();
        checkcloseDate();
        calltable();
        var winame = getWorkItemData("processInstanceId");
        setValues({"winame": winame}, true);
        executeServerEvent("", "formLoad","", true);
        SEA();
      } 
      
      if (activityname == "Appraisee_workdesk") {
        checkcloseDateApp();
        calltable();
        var winame = getWorkItemData("processInstanceId");
        setValues({"winame": winame}, true);
        executeServerEvent("", "formLoad","", true);
        SEA();
      }   

      if (activityname == "Appraiser_Rework") {
        checkcloseDateRework();
        //calltable();
        var winame = getWorkItemData("processInstanceId");
        setValues({"winame": winame}, true);
        executeServerEvent("", "formLoad","", true);
        SEA();
      }   

      if (activityname == "Line_Manager_workdesk") {
        calltable();
        var winame = getWorkItemData("processInstanceId");
        setValues({"winame": winame}, true);
        executeServerEvent("", "formLoad","", true);
        SEA();
      } 
    }
    
    function SEA() {
     var activityname = getWorkItemData("activityName");
      setValue("userID", getWorkItemData("userName"));
    
      if (activityname == "Appraisal_Window") {
      
        setValue("userID", getWorkItemData("userName"));
        clearValue("remark", "true");
     
        clearComboOptions("decison");
        addItemInCombo("decison", "Submit", "Submit", "tooltip");
        addItemInCombo("decison", "Discard", "Discard", "tooltip");   
      }

      if (activityname == "HCMD_Appraisal_Window") {
      
        setValue("userID", getWorkItemData("userName"));
        clearValue("remark", "true");
     
        clearComboOptions("decison");
        addItemInCombo("decison", "Submit", "Submit", "tooltip");
        addItemInCombo("decison", "Exit", "Exit", "tooltip");
     
      }
      
      if (activityname == "Appraiser_Initiation") {
      
       setValue("userID", getWorkItemData("userName"));
       clearValue("remark", "true");
    
       clearComboOptions("decison");
       addItemInCombo("decison", "Submit", "Submit", "tooltip");
       addItemInCombo("decison", "Discard", "Discard", "tooltip");
    
     }
     if (activityname == "Appraisee_workdesk") {
     
       setValue("userID", getWorkItemData("userName"));
    
       clearValue("remark", "true");
       clearComboOptions("decison");
       addItemInCombo("decison", "Submit", "Submit", "tooltip");
       addItemInCombo("decison", "Return", "Return", "tooltip");
    
     }
     
     if (activityname == "Line_Manager_workdesk") {
       
       setValue("userID", getWorkItemData("userName"));
    
    
       clearValue("remark", "true");
    
       clearComboOptions("decison");
       addItemInCombo("decison", "Submit", "Submit", "tooltip");
       addItemInCombo("decison", "Return", "Return", "tooltip");
       
    
     }
    
     if (activityname == "Appraiser_Rework") {
       
       setValue("userID", getWorkItemData("userName"));
    
    
       clearValue("remark", "true");
    
       clearComboOptions("decison");
       addItemInCombo("decison", "Submit to Appraisee", "SubmitApp", "tooltip");
       addItemInCombo("decison", "Submit to Line Manager", "SubmitMan", "tooltip");
    
     }
    }
    
    function decisionHistory() {

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
      var EntryDateTime = getValue('EntryDateTime');
      var entryDate2 = Date.parse(EntryDateTime);
      var date2 = Date.parse(date);
      var TAT = (date2 - entryDate2);
      var seconds = Math.round((TAT/1000)%60);
      var TAT_Minutes = Math.round((TAT/(1000*60))%60);
      var TAT_Hours = Math.round((TAT/(1000*60*60))%24);
      
      TAT_Minutes = (TAT_Minutes < 10) ? "0" + TAT_Minutes : TAT_Minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
      
      var TAT_Total = TAT_Hours+"h "+TAT_Minutes+"m "+seconds+"s";
      
       var activityname = getWorkItemData("activityName");
       var userName = getWorkItemData("userName");
       var Decision = getValue("decison");
       var Remark = getValue("remark");
       
       addDataToGrid('table3', [
         {
           'UserName': userName,
           'WorkstepName': activityname,
           'Remark': Remark,
           'EntryDateTime': EntryDateTime,
           'ExitDateTime': date,
           'Decision': Decision
         }
       ]);
       
     }

    function onRowClick(tableId,rowIndex){
       return true;
    }
    
    function customListViewValidation(controlId,flag){
       return true;
    }   
    
    function listViewLoad(controlId,action){
       
    }
    
    function clickLabelLink(labelId){
       
    }
    
    function selectFeatureToBeIncludedInRichText(){
       return {
           'bold' :true,
           'italic':true,
           'underline':true,
           'strikeThrough':true,
           'subscript':true,
           'superscript':true,
           'fontFamily':true,
           'fontSize':true,
           'color':true,
           'inlineStyle':true,
           'inlineClass':true,
           'clearFormatting':true,
           'emoticons':false,
           'fontAwesome':true,
           'specialCharacters':false,
           'paragraphFormat':true,
           'lineHeight':true,
           'paragraphStyle':true,
           'align':true,
           'formatOL':true,
           'formatUL':true,
           'outdent':true,
           'indent':true,
           'quote':true,
           'insertLink':false,
           'insertImage':false,
           'insertVideo':false,
           'insertFile':false,
           'insertTable':true,
           'insertHR':true,
           'selectAll':true,
           'getPDF':false,
           'print':false,
           'help':false,
           'html':false,
           'fullscreen':true,
           'undo':true,
           'redo':true
           
       }
    }

