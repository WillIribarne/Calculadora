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
    actualizaPantalla("ERROR: RAÍZ DE NUM NEGATIVO");
}

function actualizaPantalla(n){
    stringPantalla += n;
    pantalla.innerText = stringPantalla;
}

function resetPantalla(){
    pantalla.innerText = '';
    stringPantalla = '';
    stringNumero = '';
}

function insertaNumero(n){
    if ((n != 0 && stringNumero == '') || stringNumero != 0){
        stringNumero += n;
        actualizaPantalla(n);
    }
}

function muestraSumaRestaMultiplicacionDivisionEnPantalla(op){
    if (stringPantalla != '' && stringNumero != ''){
        actualizaPantalla(` ${op} `);
        terminosNumericos.push(stringNumero);
        operacionesTerminosNumericos.push(op);
        stringNumero = '';
    }
}

function ejecutaRaiz(){
    let num = 0;
    let res = 0;
    if (stringNumero < 0){
        error;
    } else {
        if (Number.isInteger(stringNumero)){
            num = parseInt(stringNumero);
        } else {
            num = parseFloat(stringNumero);
        }
        res = Math.sqrt(num);
        if (res % 1 !== 0){
            res = res.toFixed(6);
        }
        stringPantalla = (stringPantalla.slice(0, stringPantalla.length - stringNumero.length)); // Problema con el stringPantalla; raiz multiple sobreescribe todo el stringPantalla
        actualizaPantalla(res);
        stringNumero = res;
    }
}

function ejecutaPotenciaCuadrado(){

}
// const ejecutaPotenciaCuadrado = function(){}; es lo mismo que la de arriba

for (let i = 0; i < numeros.length; i++) {
    const numero = numeros[i];
    numero.onclick = function (){
        insertaNumero(numero.innerText);
    }
}

/*const diccionario = {
    '+': muestraSumaRestaMultiplicacionDivisionEnPantalla,
    '-': muestraSumaRestaMultiplicacionDivisionEnPantalla,
    '*': muestraSumaRestaMultiplicacionDivisionEnPantalla,
    '/': muestraSumaRestaMultiplicacionDivisionEnPantalla,
    'RAÍZ': ejecutaRaiz,
    'x2': ejecutaPotenciaCuadrado,
}
diccionario['+']; */

for (let i = 0; i < operaciones.length; i++) {
    const operacion = operaciones[i];
    operacion.onclick = function (){
        op = operacion.innerText;
        if (op == '+' || op == '-' || op == '/' || op == '*'){
            muestraSumaRestaMultiplicacionDivisionEnPantalla(op);
        } else if (op == 'RAÍZ'){
            ejecutaRaiz();
        } else {
            ejecutaPotenciaCuadrado();
        }
        
    }
}

borrarPantalla.onclick = resetPantalla;


estadoPantalla();