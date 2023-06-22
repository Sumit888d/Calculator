const keys=document.querySelectorAll('.key');
const display_input=document.querySelector('.display .input');
const display_output=document.querySelector('.display .output');

let input="";

for(let key of keys){
    const value = key.dataset.key; // storing the data-key in the DOM by dataset function for value.  

    key.addEventListener('click',()=>{
        if(value=="clear"){
            input="";
            display_input.innerHTML="";
            display_output.innerHTML="";
        } else if(value=="backspace"){
            input=input.slice(0,-1);//remove the last char from input.
            display_input.innerHTML=input;
        }
        else if (value=="="){
            let result=eval(PrepareInput(input));// eval method is called to evaluate the input.
            display_output.innerHTML=CleanOutput(result);
        }
        else if(value=="brackets"){
            if(input.indexOf("(")==-1 || 
            input.indexOf("(") != -1 && 
            input.indexOf(")")!=-1 && 
            input.lastIndexOf("(")< input.lastIndexOf(")")
            ){
                input+="("; 
            }
            else if(input.indexOf("(")!=-1 && 
            input.indexOf(")")==-1
            || input.indexOf("(")!=-1 && input.indexOf(")")!=-1 &&
            input.lastIndexOf("(")>input.lastIndexOf(")")
            ){
                input+=")";
            }
            display_input.innerHTML=CleanInput(input);
        } else{
            if(validateInput(value)){
            input+=value;
            display_input.innerHTML=CleanInput(input);
            }
        }
    })
}

function CleanInput(input){
    let input_array=input.split("");
    let input_array_length=input_array.length;
    for(let i=0;i<input_array_length;i++){
        if(input_array[i]=="*"){
         input_array[i]=`<span class="operator">x</span> `   ; // when operators are clicked then those symbol of operator is shown on the input.
        }
        else if(input_array[i]=="/"){
         input_array[i]=`<span class="operator">÷</span> `   ;
        }
        else if(input_array[i]=="+"){
         input_array[i]=`<span class="operator">+</span> `   ;
        }
        else if(input_array[i]=="-"){
         input_array[i]=`<span class="operator">-</span> `   ;
        }
        else if(input_array[i]=="("){
         input_array[i]=`<span class="brackets">(</span> `   ;
        }
        else if(input_array[i]==")"){
         input_array[i]=`<span class="brackets">)</span> `   ;
        }
        else if(input_array[i]=="%"){
         input_array[i]=`<span class="percent">%</span> `   ;
        }
    }
    return input_array.join("");
}

function CleanOutput(output){
    let output_string=output.toString();
    output_string=Number(output_string).toPrecision(5);// the answer only upto 5 numbers is stored.
    let decimal=output_string.split(".")[1];
    output_string=output_string.split(".")[0];
    let output_array =  output_string.split("");
    if(output_array.length>3){
        if(output=="Infinity"){
            return "Infinity";
        }
        for(let i=output_array.length-3;i>0;i-=3){
          output_array.splice(i,0,",");// inserts "," between string after 3 numbers.
        }
    }
    if(decimal){
        output_array.push(".");
        output_array.push(decimal);
    }
    return output_array.join("");
}

function validateInput(value){
    let last_input=input.slice(-1);
    let operators=["+","-","*","/"];
    if(value =="." && last_input=="."){
        return false; // helps to avoid two decimals at once eg:5..90
    }
    if(operators.includes(value)){
        if(operators.includes (last_input)){// helps to ignore 2 operators at once eg:3++5
            return false;
        }
        else {
            return true;
        }
    }
    return true;
}

function PrepareInput(input){
let input_array=input.split("");
for(let i=0;i<input_array.length;i++){ 
    if(input_array[i]=="%"){
        input_array[i]="/100";// for % we consider it as /100 ie divide by 100.
    }
}
return input_array.join("");
}
