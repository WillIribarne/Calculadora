const pantalla = document.getElementById("pantalla");
const saludo = document.getElementById("saludo");
const resultado = document.getElementById("resultado");
const comaDecimal = document.getElementById("comaDecimal");
const borrarPantalla = document.getElementById("borrarPantalla");

const numeros = document.getElementsByClassName("numero");
const operaciones = document.getElementsByClassName("operacion");

let stringPantalla = '';
let stringNumero = '';
let terminosNumericos = [];
let operacionesTerminosNumericos = [];

function estadoPantalla(){
    if (pantalla.innerText == ''){
        console.log("pantalla vacía");
    } else {
        console.log("tiene cosas");
    }
}

function error(){
    resetPantalla;
    actualizaPantalla("ERROR");
}

function actualizaPantalla(n){
    stringPantalla += n;
    pantalla.innerText = stringPantalla;
}

function resetPantalla(){
    pantalla.innerText = '';
    stringPantalla = '';
    stringNumero = '';
    terminosNumericos = [];
    operacionesTerminosNumericos = [];
}

function hacerSaludo(){
    resetPantalla();
    actualizaPantalla("Hola! :D");
}

function borrarSaludoSiNuevoInput(){
    if (stringPantalla === "Hola! :D"){
        stringPantalla = '';
    }
}

function insertaNumero(n){
    borrarSaludoSiNuevoInput();
    if ((n != 0 && stringNumero == '') || stringNumero != 0){
        stringNumero += n;
        actualizaPantalla(n);
    }
}

function insertaDecimal(){
    stringNumero += '.';
    actualizaPantalla('.');
}

function agregaNumero(){
    parseaNumero();
    terminosNumericos.push(stringNumero);
}

function parseaNumero(){
    let i = 0;
    let esDecimal = false;
    while (!esDecimal && i < stringNumero.length){
        if (stringNumero[i] == '.'){
            esDecimal = true;
        }
        i++;
    }
    if (esDecimal){
        stringNumero = parseFloat(stringNumero);
    } else {
        stringNumero = parseInt(stringNumero);
    }
}

function agregaOperacion(op){
    operacionesTerminosNumericos.push(op);
}

function agregaNumYOp(op){
    agregaNumero();
    agregaOperacion(op);
}

function muestraSumaRestaMultiplicacionDivisionEnPantalla(op){
    if (stringPantalla != '' && stringNumero != ''){
        actualizaPantalla(` ${op} `);
        agregaNumYOp(op);
        limpiaBufferNumero();
    }
}

function limpiaBufferNumero(){
    stringNumero = '';
}

function ejecutaRaiz(){
    let num = 0;
    let res = 0;
    if (stringNumero < 0 || stringNumero === ''){
        error;
    } else {
        if (Number.isInteger(stringNumero)){
            num = parseInt(stringNumero);
        } else {
            num = parseFloat(stringNumero);
        }
        res = Math.sqrt(num);
        if (res % 1 !== 0){
            res = res.toFixed(2);
        }

        stringPantalla = (stringPantalla.slice(0, stringPantalla.length - String(stringNumero).length));
        stringNumero = res;
        actualizaPantalla(String(res));
    }
}

function ejecutaPotenciaCuadrado(){
    let num = 0;
    let res= 0;
    if (stringNumero === ''){
        error;
    } else {
        if (Number.isInteger(stringNumero)){
            num = parseInt(stringNumero);
        } else {
            num = parseFloat(stringNumero);
        }
        res = num ** 2;
        if (res % 1 !== 0){
            res = res.toFixed(2);
        }
        stringPantalla = (stringPantalla.slice(0, stringPantalla.length - String(stringNumero).length));
        stringNumero = res;
        actualizaPantalla(String(res));
    }
}
// const ejecutaPotenciaCuadrado = function(){}; es lo mismo que la de arriba

function hacerResultado(){
    if (typeof resultado !== 'undefined'){
        agregaNumero();
        simplificaTerminosMulYDiv();
        let resultado = terminosNumericos[0];
        for (let i = 0; i < operacionesTerminosNumericos.length; i++) {
            const op = operacionesTerminosNumericos[i];
            if (op == '+'){
             resultado += terminosNumericos[i+1];
            } else if (op == '-'){
                resultado -= terminosNumericos[i+1];
            }
        }
    resetPantalla();
    actualizaPantalla(resultado.toString());
    stringNumero = resultado;
    }
}

function simplificaTerminosMulYDiv(){
    let num = 0;
    let cont = 0;
    while (cont < operacionesTerminosNumericos.length){
        if (operacionesTerminosNumericos[cont] == '*' || operacionesTerminosNumericos[cont] == '/' ){
            if (operacionesTerminosNumericos[cont] == '*'){
                num = terminosNumericos[cont] * terminosNumericos[cont+1];
                terminosNumericos[cont] = num;
                terminosNumericos.splice(cont+1, 1);
                operacionesTerminosNumericos.splice(cont, 1);
            } else {
                num = terminosNumericos[cont] / terminosNumericos[cont+1];
                terminosNumericos[cont] = num;
                terminosNumericos.splice(cont+1, 1);
                operacionesTerminosNumericos.splice(cont, 1);
            }
        } else {
            cont++;
        }
    }
}

for (let i = 0; i < numeros.length; i++) {
    const numero = numeros[i];
    numero.onclick = function (){
        insertaNumero(numero.innerText);
    }
}

for (let i = 0; i < operaciones.length; i++) {
    const operacion = operaciones[i];
    operacion.onclick = function (){
        op = operacion.innerText;
        if (op == '+' || op == '-' || op == '/' || op == '*'){
            muestraSumaRestaMultiplicacionDivisionEnPantalla(op);
        } else if (op == '√'){
            ejecutaRaiz(op);
        } else {
            ejecutaPotenciaCuadrado(op);
        }
        
    }
}
comaDecimal.onclick = insertaDecimal;
borrarPantalla.onclick = resetPantalla;
resultado.onclick = hacerResultado;
saludo.onclick = hacerSaludo;