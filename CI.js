/*---------------------------------------------------------------------------------------------------------------------------
	NEWGEN SOFTWARE TECHNOLOGIES LIMITED
	Group                        : Application -Projects
	Project/Product              : First Bank, Nigeria
	Application                  : iBPS
	Module                       : CI
	File Name                    : CI.js
	Author                       : Kufre Godwin Udoko
	Date (DD/MM/YYYY)            : 29/08/2019
	Description                  : This file consist of all custom code at JS level.
	--------------------------------------------------------------------------------------------------------------------------
	CHANGE HISTORY
	--------------------------------------------------------------------------------------------------------------------------
	Problem No/CR No   Change Date   Changed By         Change Description

----------------------------------------------------------------------------------------------------------------------------*/

var processName  = getWorkItemData("processName");
var activityName = getWorkItemData("activityName");

function formLoadCI(){
	executeServerEvent("form", "formLoad" , "" ,true);
	displayDenomination();
	transferTable();
	changeInTable();
	setCashReturnRowVisible();	
}

function customValidation(op) {
	if(op == "D" || op == "I") {
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
		var reqType = getValue("REQ_TYPE");
		var prevWs = getValue("PREV_WS");
		var decision = getValue("DECISION");
		var cashRequest = "CashRequest";
		var cashEvacuation = "CashEvacuation";
		var cashRequestException = "CashRequestException";
		var insuranceCover = "RequestInsurance";
		var insuranceTableCount = getGridRowCount("table22");
		var cvFlag = getValue("CVFLAG");
		var Y = "Y";

		if(activityName=="Spoke_Initiator" || activityName == "Spoke_Initiator_Exception") {
			if(activityName=="Spoke_Initiator" || activityName == "Spoke_Initiator_Exception"){
				executeServerEvent("", "ONDONE" , "" ,true);
				if (reqType == cashEvacuation && cvFlag == Y && decision == "Submit"){
					var resp1 = executeServerEvent("checkDenoNgn","CUSTOM",getGridRowCount("table26")+"#"+getGridRowCount("table15"),true);
				
					if(!(resp1==null || resp1=="")) {
						showMessage("",resp1,"error");
						return false;
					}
					var resp2 = executeServerEvent("checkDenoUsd","CUSTOM",getGridRowCount("table26")+"#"+getGridRowCount("table16"),true);

				
				if(!(resp2==null || resp2=="")) {
					showMessage("",resp2,"error");
					return false;
				}
				var resp3 = executeServerEvent("checkDenoGbp","CUSTOM",getGridRowCount("table26")+"#"+getGridRowCount("table17"),true);
			
				if(!(resp3==null || resp3=="")) {
					showMessage("",resp3,"error");
					return false;
				}

				var resp4 = executeServerEvent("checkDenoEur","CUSTOM",getGridRowCount("table26")+"#"+getGridRowCount("table18"),true);
			
				if(!(resp4==null || resp4=="")) {
					showMessage("",resp4,"error");
					return false;
				}
				
				var resp = executeServerEvent("checkDocument","CUSTOM","",true);
				if(!(resp==null || resp=="")) {
					showMessage("",resp,"error");
					return false;
				}
				}
				else if (reqType == cashRequest && cvFlag == Y && decision == "Submit"){
					var resp1 = executeServerEvent("checkDenoNgn","CUSTOM",getGridRowCount("table27")+"#"+getGridRowCount("table15"),true);
				
					if(!(resp1==null || resp1=="")) {
						showMessage("",resp1,"error");
						return false;
					}
					var resp2 = executeServerEvent("checkDenoUsd","CUSTOM",getGridRowCount("table27")+"#"+getGridRowCount("table16"),true);

				
				if(!(resp2==null || resp2=="")) {
					showMessage("",resp2,"error");
					return false;
				}
				var resp3 = executeServerEvent("checkDenoGbp","CUSTOM",getGridRowCount("table27")+"#"+getGridRowCount("table17"),true);
			
				if(!(resp3==null || resp3=="")) {
					showMessage("",resp3,"error");
					return false;
				}

				var resp4 = executeServerEvent("checkDenoEur","CUSTOM",getGridRowCount("table27")+"#"+getGridRowCount("table18"),true);
			
				if(!(resp4==null || resp4=="")) {
					showMessage("",resp4,"error");
					return false;
				}
				}
				else if (reqType == cashEvacuation && decision == "Submit"){
				var resp1 = executeServerEvent("checkDenoNgn","CUSTOM",getGridRowCount("table19")+"#"+getGridRowCount("table15"),true);
				
				if(!(resp1==null || resp1=="")) {
					showMessage("",resp1,"error");
					return false;
				}
				var resp2 = executeServerEvent("checkDenoUsd","CUSTOM",getGridRowCount("table19")+"#"+getGridRowCount("table16"),true);

				
				if(!(resp2==null || resp2=="")) {
					showMessage("",resp2,"error");
					return false;
				}
				var resp3 = executeServerEvent("checkDenoGbp","CUSTOM",getGridRowCount("table19")+"#"+getGridRowCount("table17"),true);
			
				if(!(resp3==null || resp3=="")) {
					showMessage("",resp3,"error");
					return false;
				}

				var resp4 = executeServerEvent("checkDenoEur","CUSTOM",getGridRowCount("table19")+"#"+getGridRowCount("table18"),true);
			
				if(!(resp4==null || resp4=="")) {
					showMessage("",resp4,"error");
					return false;
				}
				
				var resp = executeServerEvent("checkDocument","CUSTOM","",true);
				if(!(resp==null || resp=="")) {
					showMessage("",resp,"error");
					return false;
				}
			}
			else if (reqType == cashRequestException && decision == "Submit"){
				var resp1 = executeServerEvent("checkDenoNgn","CUSTOM",getGridRowCount("table24")+"#"+getGridRowCount("table15"),true);
				
				if(!(resp1==null || resp1=="")) {
					showMessage("",resp1,"error");
					return false;
				}
				var resp2 = executeServerEvent("checkDenoUsd","CUSTOM",getGridRowCount("table24")+"#"+getGridRowCount("table16"),true);

				
				if(!(resp2==null || resp2=="")) {
					showMessage("",resp2,"error");
					return false;
				}
				var resp3 = executeServerEvent("checkDenoGbp","CUSTOM",getGridRowCount("table24")+"#"+getGridRowCount("table17"),true);
			
				if(!(resp3==null || resp3=="")) {
					showMessage("",resp3,"error");
					return false;
				}

				var resp4 = executeServerEvent("checkDenoEur","CUSTOM",getGridRowCount("table24")+"#"+getGridRowCount("table18"),true);
			
				if(!(resp4==null || resp4=="")) {
					showMessage("",resp4,"error");
					return false;
				}
			}
			else if (reqType == insuranceCover){
				if (insuranceTableCount < 1){
					showMessage("","Please enter insurance request details","error");
					return false;
				}

			var resp = executeServerEvent("checkTime","CUSTOM","",true);
			if(!(resp==null || resp=="")) {
				showMessage("",resp,"error");
				return false;
			}
			}
			}
			decisionHistory("table2");
			//executeServerEvent("","SENDMAIL","",true);
		}
		else if(activityName == "RV_Mgt_Officer") {

			decisionHistory("table2");
			//executeServerEvent("","SENDMAIL","",true);
		}
		else if(activityName=="Spoke_Verifier" || 
				activityName=="Spoke_Hold_Request" || 
				activityName=="Spoke_Hold_Evacuation" || 
				activityName=="Spoke_Initiator_Exception" || 
				activityName=="Spoke_HBS" || 
				activityName == "Spoke_Post_Exception" ||
				activityName == "Spoke_Cash_Return_Maker")
		{
			if (activityName == "Spoke_Cash_Return_Maker"){
				var exception = getValue("EXCEPTION");
				var exception1 = getValue("CR_EX_EXCEPTION");
				if (reqType == cashRequest) {
					saveWorkItem();
					var resp1 = executeServerEvent("checkDenoNgn","CUSTOM",getGridRowCount("table15"),true);

					if(!(resp1==null || resp1=="")) {
						showMessage("",resp1,"error");
						return false;
					}

					var resp2 = executeServerEvent("checkDenoUsd","CUSTOM",getGridRowCount("table16"),true);

					if(!(resp2==null || resp2=="")) {
						showMessage("",resp2,"error");
						return false;
					}
					var resp3 = executeServerEvent("checkDenoGbp","CUSTOM",getGridRowCount("table17"),true);
				
					if(!(resp3==null || resp3=="")) {
						showMessage("",resp3,"error");
						return false;
					}

					var resp4 = executeServerEvent("checkDenoEur","CUSTOM",getGridRowCount("table18"),true);
				
					if(!(resp4==null || resp4=="")) {
						showMessage("",resp4,"error");
						return false;
					}
				}
				else if (reqType == cashRequestException){
					saveWorkItem();
					var resp1 = executeServerEvent("checkDenoNgn","CUSTOM",getGridRowCount("table15"),true);

					if(!(resp1==null || resp1=="")) {
						showMessage("",resp1,"error");
						return false;
					}

					var resp2 = executeServerEvent("checkDenoUsd","CUSTOM",getGridRowCount("table16"),true);

					if(!(resp2==null || resp2=="")) {
						showMessage("",resp2,"error");
						return false;
					}
					var resp3 = executeServerEvent("checkDenoGbp","CUSTOM",getGridRowCount("table17"),true);
				
					if(!(resp3==null || resp3=="")) {
						showMessage("",resp3,"error");
						return false;
					}

					var resp4 = executeServerEvent("checkDenoEur","CUSTOM",getGridRowCount("table18"),true);
				
					if(!(resp4==null || resp4=="")) {
						showMessage("",resp4,"error");
						return false;
					}
				}
			}
			else if(activityName=="Spoke_Verifier"){
				if (cvFlag == Y){
					if (reqType == cashRequest && prevWs == "Spoke_Cash_Return_Maker"){
						var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table27"),true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}
					}
					else if (reqType == cashEvacuation){
						var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table26"),true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}
					}
				}
				else if(reqType == cashRequest){
					executeServerEvent("","SETSPOKEMAIL","");

					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table6"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
				else if(reqType == cashEvacuation){
					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table19"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
				else if (reqType == cashRequestException){
					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table24"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
			} 
			else if(activityName=="Spoke_HBS"){

				if (cvFlag == Y){
					if(reqType == cashEvacuation){
						var retMsg= executeServerEvent("", "ONDONE" ,getGridRowCount("table26"),true);
						if(!(retMsg == null || retMsg == "")) {
							showMessage("",retMsg,"error");
							return false;
						}
					}
					else if (reqType == cashRequest){
						var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table27"),true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}

					}
				}
				else if(reqType == cashRequest){
					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table6"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
				else if(reqType == cashEvacuation){
					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table19"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
				else if (reqType == cashRequestException){
					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table24"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
			}
			else if (activityName == "Spoke_Post_Exception"){
				if (cvFlag == Y && reqType == cashRequest){
					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table27"),true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}
				}
			else if(reqType == cashRequest){
					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table6"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
				else if (reqType == cashRequestException){
					var retMsg=executeServerEvent("", "ONDONE" ,getGridRowCount("table24"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
			}
			decisionHistory("table2");
			executeServerEvent("","SENDMAIL","",true);
		}
		else if(activityName.includes("Hub") || 
				activityName == "Central_Vault" || 
				activityName == "Central_Vault_Verifier" || 
				activityName == "Central_Vault_Exception" || 
				activityName == "Central_Vault_Post_Exception" || 
				activityName == "CV_Foreign_Currency_Post"){

			if (activityName == "Hub_Initiator" || activityName == "Hub_Initiator_Exception"){
				 if (reqType == cashEvacuation && decision == "Submit"){
				 	var resp1 = executeServerEvent("checkDenoNgn","CUSTOM",getGridRowCount("table11")+"#"+getGridRowCount("table15"),true);
				
				 if(!(resp1==null || resp1=="")) {
				 	showMessage("",resp1,"error");
				 	return false;
				 }
				 var resp2 = executeServerEvent("checkDenoUsd","CUSTOM",getGridRowCount("table11")+"#"+getGridRowCount("table16"),true);

				
				if(!(resp2==null || resp2=="")) {
				 	showMessage("",resp2,"error");
				 	return false;
				 }
				 var resp3 = executeServerEvent("checkDenoGbp","CUSTOM",getGridRowCount("table11")+"#"+getGridRowCount("table17"),true);
			
				 if(!(resp3==null || resp3=="")) {
				 	showMessage("",resp3,"error");
				 	return false;
				 }

				 var resp4 = executeServerEvent("checkDenoEur","CUSTOM",getGridRowCount("table11")+"#"+getGridRowCount("table18"),true);
			
				 if(!(resp4==null || resp4=="")) {
				 	showMessage("",resp4,"error");
				 	return false;
				 }
				 var resp = executeServerEvent("checkDocument","CUSTOM","",true);
				 if(!(resp==null || resp=="")) {
					 showMessage("",resp,"error");
					 return false;
				 }
				 }
				 if (reqType == insuranceCover){
					if (insuranceTableCount < 1){
						showMessage("","Please enter insurance request details","error");
						return false;
					}
					
				var resp = executeServerEvent("checkTime","CUSTOM","",true);
				if(!(resp==null || resp=="")) {
					showMessage("",resp,"error");
					return false;
				}
				}

			}

			if(activityName=="Hub_Vault_Officer"){
				if (prevWs == "Hub_Verifier_Cash_Return" && reqType == cashRequest && decision == "Submit"){

				var retMsg=executeServerEvent("", "ONDONE" ,  getGridRowCount("table10")  ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
			}
			else if (reqType == cashRequest && decision == "Submit"){
					var count = getGridRowCount("table35");
					if (count < 2){
						showMessage("","Kindly Input 2 Logged By Staff","error");
						return false
					}

					else if (count > 2){
						showMessage("","Only 2 members of staffs are required","error");
						return false
					}
					 var resp = executeServerEvent("checkSol","CUSTOM",getGridRowCount("table35"),true);
					 if(!(resp==null || resp=="")) {
					 	showMessage("",resp,"error");
					 	return false;
					}

				var retMsg=executeServerEvent("", "ONDONE" ,  getGridRowCount("table1")  ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
				}
			else if(reqType == cashEvacuation){
				var retMsg=executeServerEvent("", "ONDONE" ,  getGridRowCount("table19")  ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
			}
			else if (reqType == cashRequestException && decision == "Submit"){
					var count = getGridRowCount("table35");
					if (count < 2){
						showMessage("","Kindly input 2 cash logged by staff","error");
						return false
					}

					else if (count > 2){
						showMessage("","Only 2 members of Staff are required","error");
						return false
					}
					
					var resp = executeServerEvent("checkSol","CUSTOM",getGridRowCount("table35"),true);
					if(!(resp==null || resp=="")) {
						showMessage("",resp,"error");
						return false;
				   }

				var retMsg=executeServerEvent("", "ONDONE" ,  getGridRowCount("table24")  ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
					}
				}
			
		}	
			else if(activityName=="Hub_Verifier"){
				var retMsg = executeServerEvent("", "ONDONE" ,getGridRowCount("table11") ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
			}
			else if (activityName == "Hub_Post_Exception") {
				if (reqType == cashRequest){
					var resp = executeServerEvent("","ONDONE",getGridRowCount("table10"),true);
					if(!(resp==null || resp=="")) {
						showMessage("",resp,"error");
						return false;
					}
				else if(reqType == cashEvacuation){
					var retMsg=executeServerEvent("", "ONDONE" ,  getGridRowCount("table19")  ,true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
			}
		}
			else if(activityName=="Hub_Maker"){
				if (reqType == cashRequest){
				var resp = executeServerEvent("checkSealNumber","CUSTOM",getGridRowCount("table1"),true);
				if(!(resp==null || resp=="")) {
					showMessage("",resp,"error");
					return false;
				}
				saveWorkItem();
				executeServerEvent("runMail","CUSTOM","",true);
				}
				else if (reqType == cashRequestException && decision == "Submit"){
				saveWorkItem();
				executeServerEvent("runMailSetup","CUSTOM","",true);
				}
			} 
			else if(activityName=="Central_Vault_Verifier"){
				if (reqType == cashRequest && decision == "Submit"){
						var count = getGridRowCount("table35");
						if (count < 2){
							showMessage("","Kindly Input 2 Logged By Staff","error");
							return false;
						}
	
						else if (count > 2){
							showMessage("","Only 2 members of Staff are required","error");
							return false;
						}
	
					 var resp = executeServerEvent("checkSol","CUSTOM",getGridRowCount("table35"),true);
					 if(!(resp==null || resp=="")) {
					 	showMessage("",resp,"error");
						return false;
					 }
				}
				if (cvFlag == Y){
					if (reqType == cashRequest && decision == "Submit"){
						var retMsg= executeServerEvent("", "ONDONE" , getGridRowCount("table27") ,true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}
					}
					else if (reqType == cashEvacuation && decision == "Submit"){
						var retMsg= executeServerEvent("", "ONDONE" , getGridRowCount("table26") ,true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}
					}
				}
				else if (reqType == cashRequest && decision == "Submit"){
				var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table10") ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
			} 
			else if (reqType == cashEvacuation && decision == "Submit"){
				var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table11") ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
			}
		} 
			else if (activityName == "CV_Foreign_Currency_Post"){
				if (cvFlag == Y){
					if (reqType == cashRequest){
						var retMsg= executeServerEvent("", "ONDONE" , getGridRowCount("table27") ,true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}
					}
					else if (reqType == cashEvacuation){
				   var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table26") ,true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
					}
				}

			else if (reqType == cashRequest){
				var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table10") ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
			}
			else if (reqType == cashEvacuation){
				var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table11") ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
			}
			}
			else if(activityName == "Central_Vault_Post_Exception"){
				if(cvFlag == Y){
					var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table26") ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
				}
				else {
				var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table11") ,true);
				if(!(retMsg==null || retMsg=="")) {
					showMessage("",retMsg,"error");
					return false;
				}
			}
			} 
			else if (activityName == "Central_Vault" || activityName == "Central_Vault_Exception"){
				if (cvFlag == Y){
					if (reqType == cashRequest){
					saveWorkItem();
					executeServerEvent("sendSpokeAllocationMail","CUSTOM","",true);
					}
				}
				else if (reqType == cashRequest){
					saveWorkItem();
					executeServerEvent("runMailSetup","CUSTOM","",true);
				}
			}
			else if(activityName=="Hub_HBS"){
					var spokeFlag = getValue("SPOKE_FLAG");
					if (spokeFlag == "Y"){
						if (reqType == cashRequest){
						var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table1"),true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}
					}
					else if (reqType == cashEvacuation){
						var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table19"),true);
						if(!(retMsg==null || retMsg=="")) {
							showMessage("",retMsg,"error");
							return false;
						}
					}
					else if (reqType == cashRequestException){
						var retMsg=executeServerEvent("", "ONDONE" ,  getGridRowCount("table24")  ,true);
						if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
						}
					}
				}
				else if (reqType == cashRequest){
					var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table10"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
				else if (reqType == cashEvacuation){
					var retMsg=executeServerEvent("", "ONDONE" , getGridRowCount("table11"),true);
					if(!(retMsg==null || retMsg=="")) {
						showMessage("",retMsg,"error");
						return false;
					}
				}
			}
				decisionHistory("table8");
				//executeServerEvent("","SENDMAIL","",true);

		}
 	} else if(op == "S"){

	}
	return true;
}

function checkSpCvCrAmount(control){
	resp = executeServerEvent(control.id,"ONCONTROLCHANGE","",true);
	if (!(resp == "" || resp == null))
		showMessage("",resp,"error");
}

function onLoadSpCvCr(){
	executeServerEvent("onLoadSpokeCvCrTable","ONLOAD","",true);
}

function onLoadSpCvCe(){
executeServerEvent("onLoadSpokeCvCeTable","ONLOAD","",true);
}

function moveAmount(){
	var reqType = getValue("REQ_TYPE");
	var cashRequest = "CashRequest";
	var cashEvacuation = "CashEvacuation";
		if (reqType == cashRequest){
			executeServerEvent("moveAmountCr","CUSTOM","",true);
		}
		else if (reqType == cashEvacuation){
			executeServerEvent("moveAmountCe","CUSTOM","",true);
		}
}

function decisionHistory2 (){
 executeServerEvent("","DECISIONHISTORY","",true);
}

function checkDecision(){
	var activityName = getWorkItemData("activityName");
	var reqType = getValue("REQ_TYPE");
	var prevWs = getValue("PREV_WS");
	var decision = getValue("DECISION");
	var cashRequest = "CashRequest";
	var cashEvacuation = "CashEvacuation";
	var cashRequestException = "CashRequestException";

	if (activityName == "Spoke_Initiator" || activityName == "Hub_Initiator"){
		executeServerEvent("checkDecision","CUSTOM","",true);
	}
	else if (activityName == "Spoke_Verifier" && (prevWs == "Spoke_Initiator" || prevWs == "Spoke_Initiator_Exception") && reqType == cashEvacuation){
		executeServerEvent("checkDecision","CUSTOM","",true);
	}
	else if (activityName == "Hub_Verifier" && (prevWs == "Hub_Initiator" || prevWs == "Hub_Initiator_Exception") && reqType == cashEvacuation){
		executeServerEvent("checkDecision","CUSTOM","",true);
	}
	else if (activityName == "Hub_Maker" && reqType == cashRequestException){
		executeServerEvent("checkDecision","CUSTOM","",true);
	}
	else if (activityName == "Central_Vault_Verifier" && reqType == cashRequest){
		executeServerEvent("checkDecision","CUSTOM","",true);
	}
}

function loadExCrTable(){
	executeServerEvent("QV_CR_EX_TXN_DTLS","ONLOAD","",true);	
}

function moveAmountInCrExTable(){
	var activityName = getWorkItemData("activityName");
	if (activityName == "Spoke_Initiator" || activityName == "Spoke_Initiator_Exception"){
		executeServerEvent("moveAmountInCrExTable","CUSTOM","",true);
	}
}

function onLoadSvHv(){
	executeServerEvent("QV_SPOKE_HUB_CE_TXN_DTLS","ONLOAD","",true);
}

function checkDeno(btn){
	var resp = executeServerEvent(btn.id,"CUSTOM",getGridRowCount("table15")+"#"+getGridRowCount("table16")+"#"+getGridRowCount("table17")+"#"+getGridRowCount("table18"),true);
	if (!(resp == null || resp == ""))
		showMessage("",resp,"confirm");
}

function onloadNgnDenoTable(){
	executeServerEvent("onloadNgnDenoTable","ONLOAD","",true);
}

function onloadUsdDenoTable(){
	executeServerEvent("onloadUsdDenoTable","ONLOAD","",true);
}

function onloadGbpDenoTable(){
	executeServerEvent("onloadGbpDenoTable","ONLOAD","",true);
}

function onloadEurDenoTable(){
	executeServerEvent("onloadEurDenoTable","ONLOAD","",true);
}

function searchGridPostHook(tableId){
    if(tableId=="table6")
	setCashReturnRowVisible();
}

function  setLoadFlag(){
	setValues({'LOAD_FLAG':'Y'},true);
}

function transferTable(){
	var activityName = getWorkItemData("activityName");
	var reqType = getValue("REQ_TYPE");
	var prevWs = getValue("PREV_WS");
	var cashRequest = "CashRequest";
	var cashEvacuation = "CashEvacuation";
	var cashRequestException = "CashRequestException";
	var cvFlag = getValue("CVFLAG");
	var loadFlag = getValue("LOAD_FLAG");
	var data = "Y";
	var empty = "";
	var Y = "Y";
	if (loadFlag == null || loadFlag == empty || loadFlag != data){
	if (cvFlag == Y){
		if (activityName == "Central_Vault" && (prevWs == "Spoke_Verifier" || prevWs == "Spoke_HBS" )){
			if (reqType == cashEvacuation){
			var resp = executeServerEvent("transferSpokeCvCeTable","CUSTOM","",true);
			var resp1 = resp.split("#");
			addDataToGrid("table26",
									[{"AMOUNT EVACUATING (NAIRA)": resp1[0],
									"AMOUNT EVACUATING (DOLLAR)": resp1[1],
									"AMOUNT EVACUATING (POUND)": resp1[2],
									"AMOUNT EVACUATING (EURO)": resp1[3]	
									}]);
			}
			else if (reqType == cashRequest){
			var resp = executeServerEvent("transferSpokeCvCrTable","CUSTOM","",true);
			var resp1 = resp.split("#");
			addDataToGrid("table27",
								[{
								  "AMOUNT REQUESTED (NGN)" : resp1[0],
								  "AMOUNT REQUESTED (USD)" : resp1[1],
								  "AMOUNT REQUESTED (GBP)" : resp1[2],
								  "AMOUNT REQUESTED (EUR)" : resp1[3]	
								}]);

			}
		}
		setLoadFlag();
	}
	else if (activityName == "Hub_Verifier" && (prevWs == "Spoke_Verifier" || prevWs == "Spoke_HBS")){
		if (reqType == cashEvacuation){
	var resp = executeServerEvent("transferSpokeTable","CUSTOM","",true);
	var resp1 = resp.split("#");
		addDataToGrid("table19",
								[{"AMOUNT EVACUATING (NAIRA)": resp1[0],
								  "AMOUNT EVACUATING (USD)": resp1[1],
								  "AMOUNT EVACUATING (GBP)": resp1[2],
								  "AMOUNT EVACUATING (EURO)": resp1[3]	
								}]);
		}
		setLoadFlag();
	} 
	else if (activityName == "Central_Vault" && (prevWs == "Hub_Verifier" || prevWs == "Hub_HBS" )){
		if (reqType == cashRequest){
			var resp = executeServerEvent("transferHubCrTable","CUSTOM","",true);
			var resp1 = resp.split("#");
			addDataToGrid("table10",
								[{
								  "Amount Requested NGN" : resp1[0],
								  "Amount Requested USD" : resp1[1],
								  "Amount Requested GBP" : resp1[2],
								  "Amount Requested EUR" : resp1[3]	
								}]);
	
		}	
	 else if (reqType == cashEvacuation){
		var resp = executeServerEvent("transferHubCeTable","CUSTOM","",true);
		var resp1 = resp.split("#");
		addDataToGrid("table11",
							[{"Amount Evacuated NGN": resp1[0],
							  "Amount Evacuated USD": resp1[1],
							  "Amount Evacuated GBP": resp1[2],
							  "Amount Evacuated EUR": resp1[3]	
							}]);
	}

	setLoadFlag();
}
	else if (activityName == "Hub_Maker" && reqType == cashRequestException && prevWs == "Spoke_Verifier"){
		
		var resp = executeServerEvent("transferSpokeCrExTable","CUSTOM","",true);
		var resp1 = resp.split("#");
		addDataToGrid("table24",
							[{
							  "Amount Requested NGN" : resp1[0],
							  "Amount Requested USD" : resp1[1],
							  "Amount Requested GBP" : resp1[2],
							  "Amount Requested EUR" : resp1[3]	
							}]);
	setLoadFlag();
	}
	
}
}

function checkRtnAmount(control){
	executeServerEvent(control.id, "ONCONTROLCHANGE" , "",true);
}

function onLoadRtnTable(){
	executeServerEvent("QV_CR_RTN_SPOKES","ONLOAD","",true);
}

function onloadTable(){
executeServerEvent("QV_CE_HUB_CV_TXN_DTLS","ONLOAD","",true);
}

function fetchDetails(control){
	var staffid = getValue(control.id).substring(0,3);
    var str="sn0";
    if(staffid.toUpperCase()===str.toUpperCase()){
       var resp = executeServerEvent("fetchStaffDetails","FETCHDETAIL",control.id,true);
        showMessage("",resp,"confirm");
    }
    else{
		var retMsg ="Invalid Staff ID entered. Please try again";
		setValue(control.id,"");
        showMessage("",retMsg,"error");
    } 
}

function checkAllocationAmount(control){
	var activityName = getWorkItemData("activityName");
	var reqType = getValue("REQ_TYPE");
	var prevWs = getValue("PREV_WS");
	var cashRequest = "CashRequest";
	var cashEvacuation = "CashEvacuation";
	var cashRequestException = "CashRequestException";
	if ((activityName == "Hub_Maker" && reqType == cashRequestException )|| (activityName == "Spoke_Cash_Return_Maker" && reqType == cashRequestException) ){
		var resp = executeServerEvent(control.id, "ONCONTROLCHANGE" , "" ,true);
		if(!(resp==null || resp==""))
		showMessage("",resp,"error");
	}
	else {
	var resp = executeServerEvent(control.id, "ONCONTROLCHANGE" , getGridRowCount('table10') ,true);
	if(!(resp==null || resp==""))
	showMessage("",resp,"error");
	}
}

function moveCurrencyInTableCeHubTable(){
	var activityName = getWorkItemData("activityName");
	if (activityName == "Hub_Initiator" || activityName == "Hub_Initiator_Exception"){
		executeServerEvent("moveCurrencyInTableCeHubTable","CUSTOM","",true);
	}
}

function checkLimit(){
var user = getWorkItemData("userName");
var count = getGridRowCount("table20");
if (count > 0){
var resp = executeServerEvent("","CHECKLIMIT",getGridRowCount("table20"),true);
showMessage("",resp,"confirm");
}
else {
	showMessage("","Unable to fetch Limit For Staff ID: "+user+" please try again","error");
	setStyle("fetchLimit","disable","false");
}
setValue("APPCODE","");
setValue("FIDATA","");
}

function webServicePostHook(controlId) {
	setStyle(controlId,"disable","true");
	  if (controlId == "fetchLimit")
	 	checkLimit();
}

//posting calls
function crPostSpokeToHub(btn){
//	var resp =  ValidateOTP();
//	if (resp == true){
	setStyle(btn.id,"disable","true");
	var resp1 = executeServerEvent(btn.id,"CLICK_POST_CR_HUB_SPOKE","",true);
	showMessage("",resp1,"confirm");
//	}
	}
	
function cePostSpokeToHub(btn){
//		var resp1 = ValidateOTP();
//		if (resp1 == true){
		setStyle(btn.id,"disable","true");
		var resp = executeServerEvent(btn.id,"CLICK_POST_CE_HUB_SPOKE","",true);
		showMessage ("",resp,"confirm");
//		}
	}
	
function crPostHubToSpoke(btn){
//		var resp = ValidateOTP();
//		if(resp == true){
		setStyle(btn.id,"disable","true");
		var resp1 = executeServerEvent(btn.id,"CLICK_POST_CR_HUB_SPOKE","",true);
		showMessage("",resp1,"confirm");
//	}
	}
	
function cePostHubToSpoke(btn){
//		var resp = ValidateOTP();
//		if(resp == true){
		setStyle(btn.id,"disable","true");
		var resp1 = executeServerEvent(btn.id,"CLICK_POST_CE_HUB_SPOKE","",true);
		showMessage ("",resp1,"confirm");
//		}	
	}
	
function crPostHubCv(btn){
//		var resp = ValidateOTP();
//		 if(resp == true){
		setStyle(btn.id,"disable","true");
		var resp1 = executeServerEvent(btn.id,"CLICK_POST_CR_HUB_CV","",true);
		showMessage("",resp1,"confirm");
//	}
	}
	
function crExPost(btn){
//		var resp = ValidateOTP();
//		if(resp == true){
		setStyle(btn.id,"disable","true");
		var resp1 =executeServerEvent(btn.id,"CLICK_POST_CR_SPOKE_HUB_EX","",true);
		showMessage("",resp1,"confirm");
//	}
	}
	
function cePostHubCv(btn){
//		var resp = ValidateOTP();
//		if(resp == true){
		setStyle(btn.id,"disable","true");
		var resp1 =executeServerEvent(btn.id,"CLICK_POST_CE_HUB_CV","",true);
		showMessage("",resp1,"confirm");
//	}
	}
	
function cePostSpokeCv(btn){
//		var resp = ValidateOTP();
//		if(resp == true){
		setStyle(btn.id,"disable","true");
		var resp1 = executeServerEvent(btn.id,"CLICK_POST_CE_SPOKE_CV","",true);
		showMessage("",resp1,"confirm");
//	}
	}
	
function crPostSpokeCv(btn){
//		var resp = ValidateOTP();
//		if(resp == true){
		setStyle(btn.id,"disable","true");
		var resp1 = executeServerEvent(btn.id,"CLICK_POST_CR_SPOKE_CV","",true);
		showMessage("",resp1,"confirm");
//	}
	}
	
	//end posting calls

function test2fa(){
ValidateOTP();
}

function cePostChangeSpokeCv(){
	executeServerEvent("","CE_SPOKECV_POST_CHANGE",getGridRowCount("table26"),true);

}

function crPostChangeSpokeCv(){
	executeServerEvent("","CR_SPOKECV_POST_CHANGE",getGridRowCount("table27"),true);

}

function crExPostChangeHubSpoke(){
	executeServerEvent("","CR_EX_POST_CHANGE",getGridRowCount("table24"),true);
}

function cePostChangeHubToSpoke(){
	executeServerEvent("","CE_POST_CHANGE",getGridRowCount("table19"),true);
}

function crPostChangeHubToSpoke(){
	executeServerEvent("","CR_POST_CHANGE",getGridRowCount("table1"),true);
}

function cePostChangeHubToCv(){
	executeServerEvent("","CE_POST_HUB_CV_CHANGE",getGridRowCount("table11"),true);
}

function crPostchangeHubToCv(){
	executeServerEvent("","CR_POST_HUB_CV_CHANGE",getGridRowCount("table10"),true);
}

function cePostChangeSpokeToHub(){
	executeServerEvent("","CE_POST_CHANGE",getGridRowCount("table19"),true);
}

function crPostChangeSpokeToHub(){
	executeServerEvent("","CR_POST_CHANGE",getGridRowCount("table6"),true);
}

function decisionHistory(table){
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
	var staff = getWorkItemData("userName");
	var entryDate = getValue('EntryDateTime');
    var entryDate2 = Date.parse(entryDate);
    var date2 = Date.parse(date);
	var TAT = (date2 - entryDate2);
	var seconds = Math.round((TAT/1000)%60);
    var TAT_Minutes = Math.round((TAT/(1000*60))%60);
	var TAT_Hours = Math.round((TAT/(1000*60*60)));
   
	TAT_Minutes = (TAT_Minutes < 10) ? "0" + TAT_Minutes : TAT_Minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

	addDataToGrid(table,
					[{
						"Previous Queue":getValue("CURR_WS"),
						"Logged Staff":staff,
						"Queue Start Date Time":getValue("EntryDateTime"),
						"Queue End Date Time" :date,
						"TAT" :TAT_Hours+"h "+TAT_Minutes+"m "+seconds+"s",
						"Decision":getValue("DECISION"),
						"Remarks" :getValue("REMARKS")
					}]);

}

function getUserName(btn){
executeServerEvent("getUserId","CUSTOM",btn.id,true);
var appcode = getValue("APPCODE");
var fidata = getValue("FIDATA");
if (!(appcode == "" && fidata == ""))
	showMessage("","Staff ID Fetched Successfully","confirm");
	else
	showMessage("","Staff ID not Fetched Successfully","confirm");
}

function setCashReturnRowVisible (){
	var activityName = getWorkItemData("activityName");
	if (activityName == "Spoke_Cash_Return_Maker" || activityName == "Spoke_Verifier" || activityName == "Spoke_HBS" ||activityName == "Spoke_Post_Exception"){
	var disableRow = executeServerEvent("setCashReturnRowVisible","CUSTOM",getGridRowCount("table6"),true);
	var disabledRows = disableRow.split("#");

		for(var i = 0; i < disabledRows.length; i++){
				setRowStyle("table6",disabledRows[i],"visible","false");
		}
	}
}

function exceptionChange(control){
executeServerEvent(control.id,"EXCEPTION","",true);

if (control.id == "HUB_CV_CE_POST_EXCEPTION"){
	setStyle("add_table11","visible","false");
}

else if (control.id == "EXCEPTION"){
	setStyle("add_table10","visible","false");
}
else if (control.id == "CR_EX_EXCEPTION"){
	setStyle("add_table24","visible","false");
}
 else if (control.id == "SPOKECV_CR_POST_EXCEPTION"){
	 setStyle("add_table27","visible","false");
 }
// if (control.id == "SPOKECV_POST_EXCEPTION")
// setStyle("add_table33","visible","false");

}

function moveSpokeCashEvacauationInTable(){
	executeServerEvent("moveSpokeCashEvacauationInTable","CUSTOM","",true);
}

function ciCrHubAddTxnGrid(){
	executeServerEvent("QV_CR_HUB_DTLS", "ONLOAD" , "" ,true);
}

function showLodgeByTable(btnId){
	executeServerEvent(btnId.id, "click" , "" ,true);
}

function testListView(){
	setStyle("table6_BRANCHNAME","visible","false");
}

function changeInTable(){
	var activityName = getWorkItemData("activityName");
	var reqType = getValue("REQ_TYPE");
	var cashRequest = "CashRequest";
	var cashEvacuation = "CashEvacuation";
	var cashRequestException = "CashRequestException";
	var prevWs = getValue("PREV_WS");
	var cvFlag = getValue("CVFLAG");
	var Y = "Y";

	if ((activityName.includes("Central") || activityName == "CV_Foreign_Currency_Post"  || activityName == "Hub_Vault_Officer" || activityName == "Hub_Verifier_Cash_Return" || activityName == "Hub_Post_Exception" || activityName == "Hub_HBS") && reqType == cashRequest){
		
		setColumnVisible("table10", 3, false,true);
		setColumnVisible("table10", 4, false,true);
		setColumnVisible("table10", 5, true,true);
		setColumnVisible("table10", 6, true,true);
		setColumnVisible("table10", 7, true,true);
		setColumnVisible("table10", 8, true,true);
		setColumnVisible("table10", 9, true,true);
		setColumnVisible("table10", 10, true,true);
		setColumnVisible("table10", 11, true,true);
		setColumnVisible("table10", 12, true,true);
		setStyle("add_table10","visible","false");
		
	}
	else if ((activityName == "Central_Vault" || activityName == "CV_Foreign_Currency_Post" || activityName == "Central_Vault_Verifier" || 
	activityName == "Central_Vault_Exception" || activityName == "Central_Vault_Post_Exception") && reqType == cashEvacuation ){
	
		setColumnVisible("table11", 0, false,true);
		setColumnVisible("table11", 1, false,true);
		setColumnVisible("table11", 2, true,true);
		setColumnVisible("table11", 3, true,true);
		setColumnVisible("table11", 4, true,true);
		setColumnVisible("table11", 5, true,true);
		setColumnVisible("table11", 6, false,false);
		setStyle("add_table11","visible","false");
			
	}
else if ((activityName == "Spoke_Cash_Return_Maker" && reqType == cashRequestException) || (activityName == "Spoke_Verifier" && prevWs == "Spoke_Cash_Return_Maker" && reqType == cashRequestException) || 
	(activityName == "Spoke_HBS" && reqType == cashRequestException) || (activityName == "Spoke_Post_Exception" && reqType == cashRequestException)){
		setColumnVisible("table24", 0, false,true);
		setColumnVisible("table24", 1, false,true);
		setColumnVisible("table24", 2, true,true);
		setColumnVisible("table24", 3, true,true);
		setColumnVisible("table24", 4, true,true);
		setColumnVisible("table24", 5, true,true);
		setColumnVisible("table24", 6, true,true);
		setColumnVisible("table24", 7, true,true);
		setColumnVisible("table24", 8, true,true);
		setColumnVisible("table24", 9, true,true);
	}

	else if ((activityName == "Spoke_Cash_Return_Maker" && reqType == cashRequest && cvFlag == Y) || (activityName == "Spoke_Verifier" && prevWs == "Spoke_Cash_Return_Maker" && reqType == cashRequest && cvFlag == Y) || 
	(activityName == "Spoke_HBS" && cvFlag == Y && reqType == cashRequest) || (activityName == "Spoke_Post_Exception" && cvFlag == Y && reqType == cashRequest)){
		setColumnVisible("table27", 0, false,true);
		setColumnVisible("table27", 1, false,true);
		setColumnVisible("table27", 2, true,true);
		setColumnVisible("table27", 3, true,true);
		setColumnVisible("table27", 4, true,true);
		setColumnVisible("table27", 5, true,true);
		setColumnVisible("table27", 6, true,true);
		setColumnVisible("table27", 7, true,true);
		setColumnVisible("table27", 8, true,true);
		setColumnVisible("table27", 9, true,true);
		setStyle("add_table27","visible","false");
	}



	if (activityName == "Spoke_Initiator_Exception")
	setStyle("add_table3","visible","true");
}

function clearTableCurrency(){
	executeServerEvent("clearTableCurrency","CUSTOM","",true);
}

function moveCurrencyInTable(){
	var activityName = getWorkItemData("activityName");
	if (activityName == "Hub_Initiator" || activityName == "Hub_Initiator_Exception"){
		executeServerEvent("moveCurrencyInTable","CUSTOM","",true);
	}
}

function denomination (){
	var resp = executeServerEvent("denominationNGN","CUSTOM","",true);
	if(!(resp == null || resp == ""))
		showMessage("",resp,"error");
}

function denominationUSD (){
    var resp = executeServerEvent("denominationUSD","CUSTOM","",true);
    if(!(resp == null || resp == ""))
		showMessage("",resp,"error");	
}

function denominationGBP (){
    var resp = executeServerEvent("denominationGBP","CUSTOM","",true);
    if(!(resp == null || resp == ""))
    showMessage("",resp,"error");			
}

function denominationEUR (){
    var resp = executeServerEvent("denominationEUR","CUSTOM","",true);
    if(!(resp == null || resp == ""))
    showMessage("",resp,"error");
}

function ciRVMOHubAddTxnGrid(){
	executeServerEvent("QV_HUB_RV_DTLS", "ONLOAD" , "" ,true);
}

function ciRVMOSpokeAddTxnGrid(){
	executeServerEvent("QV_RV_DTLS", "ONLOAD" , "" ,true);
}

function displayDenomination() {
	var activityName = getWorkItemData("activityName");
	var reqType = getValue("REQ_TYPE");
	var cashRequest = "CashRequest";
	if(activityName == "Hub_Initiator" || (activityName == "Hub_Maker" && reqType == cashRequest ) || activityName == "Spoke_Initiator"){

		var resp = executeServerEvent("denominationNGN","DENOMINATION","",true);
        var resp1 = resp.split("#");
		for(var i = 0; i < resp1.length; i++){
			addDataToGrid("table15",[{"DENOMINATION" : resp1[i]}]);
		}

		var resp2 = executeServerEvent("denominationUSD","DENOMINATION","",true);
		var resp3 = resp2.split("#");
		for(var i = 0; i < resp3.length; i++){
			addDataToGrid("table16",[{"DENOMINATION" : resp3[i]}]);
		}

		var resp4 = executeServerEvent("denominationGBP","DENOMINATION","",true);
		var resp5 = resp4.split("#");
		for(var i = 0; i < resp5.length; i++){
			addDataToGrid("table17",[{"DENOMINATION" : resp5[i]}]);
		}

		var resp6 = executeServerEvent("denominationEUR","DENOMINATION","",true);
		var resp7 = resp6.split("#");
		for(var i = 0; i < resp7.length; i++){
			addDataToGrid("table18",[{"DENOMINATION" : resp7[i]}]);
		}
	}		
}		

function displayDenominationTable (){
	executeServerEvent("DENO_TYPE", "ONCHANGE" , "" ,true);
}








//anil Code
function ciEnableReqDetailsForHub() {
	executeServerEvent("REQ_TYPE", "ONCHANGE" , "" ,true);	
}

function ciFetchPostCashRequestLimitSpoke(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	var retShowMsg=showMessage(btnId.id,retMsg,"error");
}

function ciFetchPostCashEvacuationLimitSpoke(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	var retShowMsg=showMessage(btnId.id,retMsg,"error");
}

function ciPostCashRequestSpoke(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	var retShowMsg=showMessage(btnId.id,retMsg,"error");
}

function ciPostCashRequestHub(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	var retShowMsg=showMessage(btnId.id,retMsg,"error");
}

function ciPostCashRequestCV(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	var retShowMsg=showMessage(btnId.id,retMsg,"error");
}

function ciPostCashEvacuationSpoke(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	var retShowMsg=showMessage(btnId.id,retMsg,"error");
}

function ciPostCashEvacuationHub(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	var retShowMsg=showMessage(btnId.id,retMsg,"error");
}

function ciPostCashEvacuationCV(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	var retShowMsg=showMessage(btnId.id,retMsg,"error");
}

function ciCashRequestHubModifyTxnGrid() {
}

function ciCashEvacuationHubModifyTxnGrid() {

}

//offshore
function ciCashRequestSpokeAddTxnGrid(){
	executeServerEvent("QV_CR_SPOKES_TXN_DTLS", "ONLOAD" , "" ,true);
}

function ciCashEvacuationSpokeAddTxnGrid(){
	executeServerEvent("QV_SPOKE_HUB_CE_TXN_DTLS", "ONLOAD" , "" ,true);
}

function addTxnGrid(control){
	executeServerEvent("Q_TXN_DTLS_GRID", "ONLOAD" , "" ,true);
}

function buttonClick(btnId) {
	var retMsg=executeServerEvent(btnId.id, "click" , "" ,true);
	showMessage(btnId.id,retMsg,"error");
}

function onLoadGrid(btnId) {
	executeServerEvent(btnId.id, "ONLOAD" , "" ,true);
}

function ciEnableReqDetailsForSpoke(){
	executeServerEvent("REQ_TYPE", "ONCHANGE" , "" ,true);
}

function onLoadHubGrid(){
	var reqType = getValue("REQ_TYPE");
	if(reqType=="CashRequest") {
		executeServerEvent("Q_Hub_Grid_CR", "ONLOAD" , getGridRowCount('table1') ,true);
	} else {
		executeServerEvent("Q_Hub_Grid_CE", "ONLOAD" , getGridRowCount('table4') ,true);
	}
}

function onLostFocusGrid(control){
	console.log("onLostFocusGrid:"+control.id);
	var resp ="";
	var reqType = getValue("REQ_TYPE");
	if(reqType=="CashRequest") {
		resp = executeServerEvent(control.id, "ONCONTROLCHANGE" , getGridRowCount('table1') ,true);
	} else {
		resp = executeServerEvent(control.id, "ONCONTROLCHANGE" , getGridRowCount('table4') ,true);
	}

	if(!(resp == null || resp ==""))
	showMessage("",resp,"error");
}

// Start of 2FA
function ValidateOTP() {
	var staff = getWorkItemData("userName");
	//var staff = 'TN041439';
    var serialNo = '';
    try {
        serialNo = getSerialNbr();
    } catch (e){
        
    }
	
	var serialNumberError = 'Unable to fetch User Serial No';
    if (serialNo == serialNumberError ) {
		showMessage ("",serialNumberError,"error");
		return false;
    }
    
    var OTP = prompt("Token Serial Number : " + serialNo + " \n\n Please enter OTP", "");
    
    if(OTP == null)
    {
        return false;
    }
    else if (OTP != "") 
    {
        var retVal = '';
                var uName = staff; //'SN029216';//'SN029216';// suername from form
                var openurl=window.location.href.toString().split(window.location.host)[0]+window.location.host;
                var url = "/TFA/Integration_fbn/ValidateToken.jsp";	
                var params = "user_name=" + uName +"&"+ "token_num=" + OTP;
                var responseXml = doPostAjax(openurl + url, params);
				var r1 = responseXml;
				if (r1 == 'SUCCESS'){
					showMessage("",r1,"confirm");
				 return true;
				}
				 else {
					showMessage("",r1,"error");
					console.log('inisde else to return false ');
						return false;  
                }
	}
	return false;
}

function doPostAjax(url, sParams) {
//window.open(url+"?"+params);
var retval = "-1";
var req = getACTObj();
req.onreadystatechange = processRequest;
req.open("POST", url, false);
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
req.send(sParams);

//alert(req.status);
function processRequest() {
if (req.readyState == 4) {
if (req.status == 200) {
    parseMessages();
} else {
    retval = '-1';
}
}
}
function parseMessages() {
retval = trim(req.responseText);
}
return retval;
}

function getACTObj() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest
}
var a = ["Microsoft.XMLHTTP", "MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP"];
for (var c = 0; c < a.length; c++) {
try {
return new ActiveXObject(a[c])
} catch (b) {}
}
return null;
}

function trim(str) {
return str.replace(/^\s+|\s+$/g, '');
}
            
function getSerialNbr() {
var staff = getWorkItemData("userName");
var retVal = '';
var uName = staff; //'SN029216';// 'SN029216';// username from form
var openurl=window.location.href.toString().split(window.location.host)[0]+window.location.host;
var url = "/TFA/Integration_fbn/fetchSerialNumber.jsp";	
var params = "user_name=" + uName;   
var responseXml = doPostAjax(openurl + url, params);
console.log('responseXML>1233>'+ responseXml);
alert('responseXml>>' + responseXml);
var r1 = responseXml.split('#');
if (r1[0] == 'TRUE') {
retVal = r1[1].split('~')[1];
} else {
retVal = 'Unable to fetch User Serial No';
}
return retVal;
}
///----------------End  2FA --------////////////////
