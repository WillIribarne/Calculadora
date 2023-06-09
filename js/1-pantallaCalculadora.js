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

function error(motivo){
    resetPantalla();
    actualizaPantalla(motivo);
}

function pantallaMuestraErrorOSaludo(){
    return (stringPantalla == "Hola! :D" || stringPantalla.includes("ERROR"));
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

function borrarSiNuevoInput(){
    if (stringPantalla === "Hola! :D" || stringPantalla.includes("ERROR")){
        stringPantalla = '';
    }
}

function insertaNumero(n){
    borrarSiNuevoInput();
    if ((stringNumero !== '0' && n === 0) || n != 0){
        stringNumero += n;
        actualizaPantalla(n);
    }
}

function insertaDecimal(){
    if (!tieneDecimal(stringNumero.toString()) && stringNumero !== ''){
        stringNumero += '.';
        actualizaPantalla('.');
    }
}

function agregaNumero(){
    stringNumero = parseaNumero(stringNumero);
    terminosNumericos.push(stringNumero);
}

function parseaNumero(n){
    if (tieneDecimal(n.toString())){
        n = parseFloat(n);
    } else {
        n = parseInt(n);
    }
    return n;
}

function tieneDecimal(n){
    let i = 0;
    let esDecimal = false;
    while (!esDecimal && i < n.length){
        if (n[i] == '.'){
            esDecimal = true;
        }
        i++;
    }
    return esDecimal;
}

function agregaOperacion(op){
    operacionesTerminosNumericos.push(op);
}

function agregaNumYOp(op){
    agregaNumero();
    agregaOperacion(op);
}

function muestraSumaRestaMultiplicacionDivisionEnPantalla(op){
    if (stringPantalla != '' && (stringNumero != '' && stringNumero != '-') && !pantallaMuestraErrorOSaludo()){
        actualizaPantalla(` ${op} `);
        agregaNumYOp(op);
        limpiaBufferNumero();
    } else if (op === '-' && stringNumero === '' && !pantallaMuestraErrorOSaludo()){
        actualizaPantalla('-');
        stringNumero += '-';
    }
}

function limpiaBufferNumero(){
    stringNumero = '';
}

function ejecutaRaiz(){
    let num = 0;
    let res = 0;
    if (stringNumero < 0 || stringNumero === ''){
        error("ERROR: raíz de num negativo");
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
        error('');
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
    let resultado = terminosNumericos[0];
    if (typeof resultado !== 'undefined' && !pantallaMuestraErrorOSaludo()){
        agregaNumero();
        simplificaTerminosMulYDiv();
        resultado = terminosNumericos[0];
        if (pantallaMuestraErrorOSaludo()){
            return;
        }
        for (let i = 0; i < operacionesTerminosNumericos.length; i++) {
            const op = operacionesTerminosNumericos[i];
            if (op == '+'){
             resultado += terminosNumericos[i+1];
            } else if (op == '-'){
                resultado -= terminosNumericos[i+1];
            }
        }
    resultado = parseaNumero(resultado);
    resetPantalla();
    if (resultado.toString() == 'NaN'){
        error("ERROR: falta un término");
    } else {
        actualizaPantalla(resultado.toString());
    }
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
                if (terminosNumericos[cont+1] === 0){
                    resetPantalla();
                    error("ERROR: división por 0");
                    return;
                } else {
                    num = terminosNumericos[cont] / terminosNumericos[cont+1];
                    terminosNumericos[cont] = num;
                    terminosNumericos.splice(cont+1, 1);
                    operacionesTerminosNumericos.splice(cont, 1);
                }
            }
        } else {
            cont++;
        }
    }
}

for (let i = 0; i < numeros.length; i++) {
    const numero = numeros[i];
    numero.onclick = function (){
        insertaNumero(parseInt(numero.innerText));
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