function formLoadMM() {
}

function customValidation(op){
     switch (op) {
        case 'S':
        break;
        case 'I':{}
		break;  
        case 'D':{}
		break;    
        default:
            break;
    }	
    return true;
}

function gSelectMarket (){
	executeServerEvent('onChangeMarket','onChange','',true);
}
