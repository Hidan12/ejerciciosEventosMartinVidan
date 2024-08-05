const pesoColombiano = document.getElementById("pesoColombiano")
const dolar = document.getElementById("dolar")
const borrar = document.getElementById("borrar")

const funConversorColombia = ()=>{
    if (pesoColombiano.value > 0) {
        dolar.value = pesoColombiano.value / 4045
    }
}

const funConversorDolar = ()=>{
    if(dolar.value > 0){
        let operacion = dolar.value * 4045
        pesoColombiano.value = operacion
    }
}

pesoColombiano.addEventListener("keyup", funConversorColombia)
dolar.addEventListener("keyup", funConversorDolar)

borrar.addEventListener("click", ()=>{
    dolar.value = 1
    pesoColombiano.value = 4045
})
