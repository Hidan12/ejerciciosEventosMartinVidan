const calcular = document.getElementById("calcular")
const estaura = document.getElementById("altura")
const peso = document.getElementById("peso")
const resultado = document.getElementById("resultado")
const borrar = document.getElementById("borrar")

const funcionResultado = ()=> {
    const operacion = peso.value / ((estaura.value / 100) ** 2)
    resultado.placeholder = operacion.toFixed(2)
}

const funcionBorrar = ()=>{
    estaura.value = 0
    peso.value = 0
    resultado.placeholder = 0
}

calcular.addEventListener("click", funcionResultado)
borrar.addEventListener("click", funcionBorrar)