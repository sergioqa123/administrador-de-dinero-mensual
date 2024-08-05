const contadorPresupuesto = document.getElementById('contador-presupuesto');
const prespuestoMensualInput = document.getElementById('presupuesto');
const menuDesplegable = document.getElementById('menu-desplegable');
const agregarOpcion = document.getElementById('agregar-opcion');
const botonLimpiar = document.getElementById('limpiar');
const resultados = document.getElementById('resultados');
let esError = false;

// Quitar espacios y/o simbolos
// replace devuelve un string
function limpiarEntrada(entrada) {
    const regex = /[+-\s]/g;
    return entrada.replace(regex, '');
}

// Verificar campos válidos (cualquier digito con más de 1 cifra seguido de una "e" seguido de cualquier digito con más de 1 cifra, no case-sensitive (insensitive))
// match devuelve un string (boolean: true) o null (boolean: false);
function esEntradaValida(entrada) {
    const regex = /\d+e\d+/i;
    return entrada.match(regex);
}

function agregarEntrada(){
    const contenedorInputsObjetivo = document.querySelector(`#${menuDesplegable.value} .contenedor-inputs`);
    const numeroDeEntrada = contenedorInputsObjetivo.querySelectorAll('input[type="text"]').length + 1;
    // querySelectorAll devuelve un NodeList con los selectores indicados
    // Aunque NodeList no es un Array, es posible iterar sobre él
    let textoHTML;

    textoHTML = `
        <label class="titulo-label" for="nombre-de-${menuDesplegable.value}-${numeroDeEntrada}">Nombre #${numeroDeEntrada}</label>
        <input type="text" id="nombre-de-${menuDesplegable.value}-${numeroDeEntrada}" placeholder="Fuente">
        <label for="cantidad-de-${menuDesplegable.value}-${numeroDeEntrada}">Cantidad #${numeroDeEntrada}</label>
        <input type="number" min="0" id="cantidad-de-${menuDesplegable.value}-${numeroDeEntrada}" placeholder="Cantidad de dinero">
    `;

    contenedorInputsObjetivo.insertAdjacentHTML('beforeend', textoHTML);
}

function obtenerCantidades(list){ //recibe un array
    let cantidad = 0;

    for (item of list) {
        const valorActual = limpiarEntrada(item.value);
        const inputInvalido = esEntradaValida(valorActual);
        if(inputInvalido){
            alert(`Input no válido: ${inputInvalido[0]}`);
            esError = true;
            return null;
        } // No es necesario else debido al return;
        
        cantidad += Number(valorActual);
        // Es importante hacer una conversion porque los inputs se mandan como strings a JS
    }
    return cantidad;
}

function calcularPresupuesto(e) {
    e.preventDefault(); // Previene la acción por defecto del objeto Event en submit
    esError = false; // Esto por si obtenerCantidades lo cambió a true anteriormente

    const ingresosInput = document.querySelectorAll('#ingresos input[type=number]');
    const gastosInput = document.querySelectorAll('#gastos input[type=number]');

    const totalIngresos = obtenerCantidades(ingresosInput);
    const totalGastos = obtenerCantidades(gastosInput);
    const presupuestoMensual = obtenerCantidades([prespuestoMensualInput]); // Usamos la funcion para que retorne un Numero
    
    if(esError) { // Verificar si obtenerCantidades lo cambió a true
        return;
    }

    const presupuestoRestante = presupuestoMensual + totalIngresos - totalGastos;
    const superavitODeficit = presupuestoRestante < 0 ? 'Deficit' : 'Superavit';

    resultados.innerHTML = `
    <span class="${superavitODeficit.toLowerCase()}">${superavitODeficit} de ${Math.abs(presupuestoRestante)} <span>
    `
}

function limpiarFormulario(){
    const contenedorInputs = Array.from(document.querySelectorAll('.contenedor-inputs'));
    for (const contenedor of contenedorInputs){
        contenedor.innerHTML = '';
    }
    prespuestoMensualInput.value = '';
}

agregarOpcion.addEventListener('click', agregarEntrada);
botonLimpiar.addEventListener('click', limpiarFormulario);
contadorPresupuesto.addEventListener('submit', calcularPresupuesto);