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

function muestraSumaEnPantalla(){

}

function muestraRestaEnPantalla(){

}

function muestraMultiplicacionEnPantalla(){

}

function muestraDivisionEnPantalla(){

}

function ejecutaRaiz(){

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

const diccionario = {
    '+': muestraSumaEnPantalla,
    '-': muestraRestaEnPantalla,
    '*': muestraMultiplicacionEnPantalla,
    '/': muestraDivisionEnPantalla,
    'RAÍZ': ejecutaRaiz,
    'x2': ejecutaPotenciaCuadrado,
}
diccionario['+'];
for (let i = 0; i < operaciones.length; i++) {
    const operacion = operaciones[i];
    operacion.onclick = diccionario[operacion.innerText]
}

borrarPantalla.onclick = resetPantalla;

estadoPantalla();