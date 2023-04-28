//import * as physix from "/physics.js";

//PHYISCS
const Me = 9.109;
const MeBuffer = "10^-31";
const PI = 3.145;
const h = 6.62607;
const PlanckBuffer = "10^-34";
const epsilon = 8.85;
const epsilonBuffer = "x 10^-12";
const charge = 1.6;
const chargeBuffer = "x10^-19";

const radBuffer = " x10^-11";

function angFromVel(vel, rad){
    let ans = Me * vel * rad;
    return ans;
}

function angFromQuant(num){
    let ans = (num*h)/(2*PI);
    return ans;
}

function getRad(q, z){
    let ans = (q*q)*(h*h)*epsilon;
    ans = ans/((PI * Me * z)*(charge*charge));
    ans = ans + radBuffer;
    return ans;
}

function velFromAtom(atom, quant){
    let ans = (atom * charge * charge)/(2*PI*epsilon*h*quant);
    return ans + " x10^8 m/s"; 
}

function velFromRad(q, r){
    let ans = (q*h)/(2*PI*Me*r);
    return ans+" x10^-22";
}

//ELEMEMT SELECTORS
const angularBtn = document.querySelector("#angular-momentum-btn");
const radBtn = document.querySelector("#bohrs-rad-btn"); 
const velBtn = document.querySelector("#velocity-btn"); 

const angularDiv = document.getElementById("angular-momentum-wrapper");
const radDiv = document.getElementById("bohrs-rad-wrapper");
const velDiv = document.getElementById("velocity-wrapper");

const angForm1 = document.getElementById("angular-form-1-label");
const angForm2 = document.getElementById("angular-form-2-label");
const angForm1Rad = document.getElementById("angular-form-1");
const angForm2Rad = document.getElementById("angular-form-2");
const angSubBtn = document.getElementById("ang-submit-btn")
const angFieldDiv = document.getElementById("angular-momentum-field");

const BohrRadField = document.getElementById("bohrs-rad-field");
const BohrRadBtn = document.getElementById("bohr-calc");

const velForm1 = document.getElementById("velocity-form-1-label");
const velForm2 = document.getElementById("velocity-form-2-label");
const velForm1Rad = document.getElementById("velocity-form-1");
const velForm2Rad = document.getElementById("velocity-form-2");
const velSubBtn = document.getElementById("velocity-submit-btn")
const velFieldDiv = document.getElementById("velocity-field");

var breaker = document.createElement("br"); //For Formatting

//EVENT LISTENERS

//Angular Momentum
angForm1Rad.addEventListener("change", ()=>{
    angForm1.style.color = "salmon";
    angForm2.style.color = "white";    
});

angForm2Rad.addEventListener("change", ()=>{
    angForm2.style.color = "salmon";
    angForm1.style.color = "white";    
});

angSubBtn.onclick = function(){
    //block visibiility
    document.getElementById("angular-momentum-formula-selector").style.display = "none";
    angFieldDiv.style.display = "block";

        if(angForm1Rad.checked==true){
            angCalcForm(1);
            solved = true;
        }
        else if(angForm2Rad.checked==true){
            angCalcForm(2);
            solved = true;
        }
        else{
            const error = document.createElement("h1");
            error.textContent = "Field Missing";
            angFieldDiv.append(error);
            solved = true;
        }

}

velSubBtn.onclick = function(){
    //block visibiility
    document.getElementById("velocity-formula-selector").style.display = "none";
    velFieldDiv.style.display = "block";

        if(velForm1Rad.checked==true){
            velCalcForm(1);
            solved = true;
        }
        else if(velForm2Rad.checked==true){
            velCalcForm(2);
            solved = true;
        }
        else{
            const error = document.createElement("h1");
            error.textContent = "Field Missing";
            velFieldDiv.append(error);
            solved = true;
        }

}

//Velocity
velForm1Rad.addEventListener("change", ()=>{
    velForm1.style.color = "salmon";
    velForm2.style.color = "white";    
});

velForm2Rad.addEventListener("change", ()=>{
    velForm2.style.color = "salmon";
    velForm1.style.color = "white";    
});

let solved = false;

//FUNCTIONS
function showAngular(){
    if(solved==true){
        solved = false;
        location.reload();
    }
    else{
        angularDiv.style.display = "block";
        radDiv.style.display = "none";
        velDiv.style.display = "none";
    
        document.getElementById("angular-momentum-formula-selector").style.display = "block";
        document.getElementById("angular-momentum-field").style.display = "none";
    }

}

function showRadius(){
    angularDiv.style.display = "none";
    radDiv.style.display = "block";
    velDiv.style.display = "none";    

    BohrRadBtn.disabled = false;
}

function showVelocity(){
    if(solved==true){
        solved = false;
        location.reload();
    }
    else{
        angularDiv.style.display = "none";
        radDiv.style.display = "none";
        velDiv.style.display = "block";   
 
        document.getElementById("velocity-formula-selector").style.display = "block";
        document.getElementById("velocity-field").style.display = "none";
    }
 
}

function angCalcForm(choice){

    if(choice == 1){
        // Create a new text input element
        var velTextBox = document.createElement("input");
        velTextBox.type = "text";
        velTextBox.name = "velTextBox";

        // Create a new label element and set its "for" attribute to match the input element's "name"
        var velLabel = document.createElement("label");
        velLabel.innerHTML = "Velocity (in m/s) = ";
        velLabel.setAttribute("for", "velTextBox");

        angFieldDiv.appendChild(velLabel);
        angFieldDiv.appendChild(velTextBox);

        // Create a new text input element
        var radTextBox = document.createElement("input");
        radTextBox.type = "text";
        radTextBox.name = "radTextBox";

        // Create a new label element and set its "for" attribute to match the input element's "name"
        var radLabel = document.createElement("label");
        radLabel.innerHTML = "<br><br>Bohr's Radius (We recommend using the radius calculator if you don't know this value) = ";
        radLabel.setAttribute("for", "radTextBox");

        angFieldDiv.appendChild(radLabel);
        angFieldDiv.appendChild(radTextBox);        

        var angCalcBtn = document.createElement("button");
        angCalcBtn.textContent = "CALCULATE";
        angCalcBtn.setAttribute("type", "button");
        angCalcBtn.setAttribute("class", "form-submit-btn")
        angFieldDiv.appendChild(angCalcBtn);
        angCalcBtn.disabled = false;

        let vel = 0;
        let rad = 0;
        angCalcBtn.onclick = ()=>{
            vel = velTextBox.value;
            vel = Number(vel);
            rad = radTextBox.value;
            rad = Number(rad);

            let result = angFromVel(vel,rad);
            
            var resultLabel = document.createElement("label");
            resultLabel.innerHTML = "<br>Angular momentum = "+result+"x"+MeBuffer+" Kg.m2.s-1";
            angFieldDiv.append(resultLabel);

            solved = true;
            angCalcBtn.disabled = true;
        }

    }
    else{
        // Create a new text input element
        var quantTextBox = document.createElement("input");
        quantTextBox.type = "text";
        quantTextBox.name = "quantTextBox";

        // Create a new label element and set its "for" attribute to match the input element's "name"
        var quantLabel = document.createElement("label");
        quantLabel.innerHTML = "Principal Quantum Number:";
        quantLabel.setAttribute("for", "quantTextBox");

        angFieldDiv.appendChild(quantLabel);
        angFieldDiv.appendChild(quantTextBox);

        var angCalcBtn = document.createElement("button");
        angCalcBtn.textContent = "CALCULATE";
        angCalcBtn.setAttribute("type", "button");
        angCalcBtn.setAttribute("class", "form-submit-btn")
        angFieldDiv.appendChild(angCalcBtn);
        angCalcBtn.disabled = false;

        let quant = 0;

        angCalcBtn.onclick = ()=>{
            quant = quantTextBox.value;
            quant = Number(quant);

            let result = angFromQuant(quant);
            
            var resultLabel = document.createElement("label");
            resultLabel.innerHTML = "<br>Angular momentum = "+result+"x"+PlanckBuffer+" Kg.m2.s-1";
            angFieldDiv.append(resultLabel);

            solved = true;
            angCalcBtn.disabled = true;
        }        
    }
}

function calcRadForm(){
    var quantTextBox =  document.getElementById("quantum-number");
    var atomicTextBox = document.getElementById("atomic-number");

    let quant = quantTextBox.value; 
    let atomic = atomicTextBox.value;
   

    if(quant == "" || atomic == ""){
        const error = document.createElement("h1");
        error.textContent = "Field Missing";
        BohrRadField.append(error); 
        solved = true;      
    }
    else{
        quant = Number(quant);
        atomic = Number(atomic);
        let result = getRad(quant, atomic);

        var resultLabel = document.createElement("label");
        resultLabel.innerHTML = "<br>Bohr's Radius = "+result+"m";
        BohrRadField.append(resultLabel);
        solved = true;
        BohrRadBtn.disabled = true;        
    }
}


function velCalcForm(choice){
    if(choice==1){
        // Create a new text input element
        var quanTextBox = document.createElement("input");
        quanTextBox.type = "text";
        quanTextBox.name = "quanTextBox";

        // Create a new label element and set its "for" attribute to match the input element's "name"
        var quanLabel = document.createElement("label");
        quanLabel.innerHTML = "Principal Quantum Number = ";
        quanLabel.setAttribute("for", "quanTextBox");

        velFieldDiv.appendChild(quanLabel);
        velFieldDiv.appendChild(quanTextBox);

        // Create a new text input element
        var atomTextBox = document.createElement("input");
        atomTextBox.type = "text";
        atomTextBox.name = "atomTextBox";

        // Create a new label element and set its "for" attribute to match the input element's "name"
        var atomLabel = document.createElement("label");
        atomLabel.innerHTML = "<br><br>Atomic Number = ";
        atomLabel.setAttribute("for", "atomTextBox");

        velFieldDiv.appendChild(atomLabel);
        velFieldDiv.appendChild(atomTextBox);        

        var velCalcBtn = document.createElement("button");
        velCalcBtn.innerHTML = "CALCULATE";
        velCalcBtn.setAttribute("type", "button");
        velCalcBtn.setAttribute("class", "form-submit-btn")
        velFieldDiv.appendChild(breaker);
        velFieldDiv.appendChild(velCalcBtn);
        velCalcBtn.disabled = false;  
        
        let quan = 0;
        let atomic = 0;
        velCalcBtn.onclick = ()=>{
            atomic = atomTextBox.value;         
            quan = quanTextBox.value;


            if(quan == "" || atomic == ""){
                const error = document.createElement("h1");
                error.textContent = "Field Missing";
                velFieldDiv.append(error); 
                solved = true;      
            }
            else{
                atomic = Number(atomic);
                quan = Number(quan);
                let result = velFromAtom(atomic, quan);
            
                var resultLabel = document.createElement("label");
                resultLabel.innerHTML = "<br>Velocity of Electron = "+result;
                velFieldDiv.appendChild(breaker);
                velFieldDiv.append(resultLabel);
    
                solved = true;
                velCalcBtn.disabled = true;
            }

        }        
    }
    else if(choice==2){
        // Create a new text input element
        var quantTextBox = document.createElement("input");
        quantTextBox.type = "text";
        quantTextBox.name = "quantTextBox";

        // Create a new label element and set its "for" attribute to match the input element's "name"
        var quantLabel = document.createElement("label");
        quantLabel.innerHTML = "Principal Quantum Number:";
        quantLabel.setAttribute("for", "quantTextBox");

        velFieldDiv.appendChild(quantLabel);
        velFieldDiv.appendChild(quantTextBox);

        // Create a new text input element
        var radTextBox = document.createElement("input");
        radTextBox.type = "text";
        radTextBox.name = "radTextBox";

        // Create a new label element and set its "for" attribute to match the input element's "name"
        var radLabel = document.createElement("label");
        radLabel.innerHTML = "<br><br>Bohr's Radius (We recommend using the radius calculator if you don't know this value) = ";
        radLabel.setAttribute("for", "radTextBox");

        velFieldDiv.appendChild(radLabel);
        velFieldDiv.appendChild(radTextBox);        

        var velCalcBtn = document.createElement("button");
        velCalcBtn.textContent = "CALCULATE";
        velCalcBtn.setAttribute("type", "button");
        velCalcBtn.setAttribute("class", "form-submit-btn")
        velFieldDiv.appendChild(velCalcBtn);
        velCalcBtn.disabled = false;

        let quan = 0;
        let rad = 0;
        velCalcBtn.onclick = ()=>{
            rad = radTextBox.value;         
            quan = quantTextBox.value;


            if(quan == "" || rad == ""){
                const error = document.createElement("h1");
                error.textContent = "Field Missing";
                velFieldDiv.append(error); 
                solved = true;      
            }
            else{
                rad = Number(rad);
                quan = Number(quan);
                let result = velFromRad(quan, rad);
            
                var resultLabel = document.createElement("label");
                resultLabel.innerHTML = "<br>Velocity of Electron = "+result;
                velFieldDiv.appendChild(breaker);
                velFieldDiv.append(resultLabel);
    
                solved = true;
                velCalcBtn.disabled = true;
            }

        }    
    }
}