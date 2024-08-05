const contadorPresupuesto = document.getElementById('contador-presupuesto');
const prespuestoMensual = document.getElementById('presupuesto');
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

    if (menuDesplegable.value === 'gastos'){
        textoHTML = `
        <label class="titulo-label" for="nombre-de-gasto-${numeroDeEntrada}">Nombre de gasto ${numeroDeEntrada}</label>
        <input type="text" id="nombre-de-gasto-${numeroDeEntrada}" placeholder="Fuente">
        <label for="cantidad-de-gasto-${numeroDeEntrada}">Cantidad de dinero ${numeroDeEntrada}</label>
        <input type="number" min="0" id="cantidad-de-gasto-${numeroDeEntrada}" placeholder="Cantidad de dinero">
        `;
    } else {
        textoHTML = `
        <label class="titulo-label" for="fuente-de-ingresos-${numeroDeEntrada}">Fuente de ingresos ${numeroDeEntrada}</label>
        <input type="text" id="fuente-de-ingresos-${numeroDeEntrada}" placeholder="Fuente">
        <label for="cantidad-de-ingreso-${numeroDeEntrada}">Cantidad de dinero ${numeroDeEntrada}</label>
        <input type="number" min="0" id="cantidad-de-ingreso-${numeroDeEntrada}" placeholder="Cantidad de dinero">
        `;
    }

    contenedorInputsObjetivo.insertAdjacentHTML('beforeend', textoHTML);
}

function obtenerCantidades(list){
    let cantidad = 0;

    for (item of list) {
        const valorActual = limpiarEntrada(item);
        const inputInvalido = esEntradaValida(valorActual);
        if(inputInvalido){
            alert(`Input no válido: ${inputInvalido[0]}`);
            esError = true;
            return null;
        } // No es necesario else debido al return;
        
        cantidad += Number(valorActual);
        // Los inputs se mandan como strings a JS, por ello es importante hacer una conversion
    }
    return cantidad;
}

function calcularPresupuesto() {
    
}

function limpiarFormulario(){
    const contenedorInputs = Array.from(document.querySelectorAll('.contenedor-inputs'));
    for (const contenedor of contenedorInputs){
        contenedor.innerHTML = '';
    }
    prespuestoMensual.value = '';
}

agregarOpcion.addEventListener('click', agregarEntrada);
botonLimpiar.addEventListener('click', limpiarFormulario);
contadorPresupuesto.addEventListener('submit', calcularPresupuesto);