let notas = [
    {
        id: 1,
        titulo: "Compra de supermercado",
        texto: "Comprar leche, pan, y huevos.",
        realizado: false
    },
    {
        id: 2,
        titulo: "Hacer ejercicio",
        texto: "Correr 5 km en el parque.",
        realizado: true
    },
    {
        id: 3,
        titulo: "Leer libro",
        texto: "Leer 50 páginas del libro 'Cien Años de Soledad'.",
        realizado: false
    },
    {
        id: 4,
        titulo: "Llamar a mamá",
        texto: "Llamar a mamá para ponerse al día.",
        realizado: true
    }
];
let idGlobal = 4

const contenedorNotas = document.getElementById("notas")
const agregar = document.getElementById("agregarNota")
const contenedorPadre = document.getElementById("flotNota")
const buscadorInput = document.getElementById("buscador")
const tareaCheck = document.getElementById("tareaCheck")
let bandNota = false



const fiterSearch = (buscar, checked) => {
    let temp = []
    if (checked != undefined) {
        notas.forEach(nota => {
            if ((nota.titulo.includes(buscar) || nota.texto.includes(buscar)) && nota.realizado == checked) {
                temp.push(nota)
            }
        })    
    }else{
        notas.forEach(nota => {
            if (nota.titulo.includes(buscar) || nota.texto.includes(buscar)) {
                temp.push(nota)
            }
        })
    }
    
    return temp
}


const mostrarNota = (notas, htmlId) => {
    htmlId.innerHTML = ""
    if (notas.length > 0) {
        notas.forEach(nota => {            
            htmlId.innerHTML += `
                    <div class="card bg-warning m-1 col-5 col-sm-3 col-md-2 ">
                        <div class="card-header">
                            <input id=${nota.id} onClick="marcarRealizada(${nota.id})" type="checkbox" ${nota.realizado ? "checked" : ""}>
                            <label for=${nota.id}> <h5 for=${nota.id}>${nota.titulo}</h5></label>
                        </div>
                        <div class="card-body height-card d-flex flex-column align-items-center justify-content-between">
                          <p class="card-text ${nota.realizado ? "rayado": ""}">${nota.texto}</p>
                          <button onClick="borrarNota(${nota.id})" type="button" id="borrar" class="btn btn-danger">Borrar notas</button>
                        </div>
                    </div>
            `
            
        });
    } else {
        htmlId.innerHTML = `<p class="text-light text-center col-12"> NO HAY NOTAS PARA MOSTRAR</p>`
    }

}

const filters = () => {
    let temp = []
    
    buscadorInput.addEventListener("keyup", () => {
        if (buscadorInput.value.trim() != "") {
            if (!tareaCheck.checked) {
                temp = fiterSearch(buscadorInput.value, undefined)
            } else {
                temp = fiterSearch(buscadorInput.value, tareaCheck.checked)
            }
            mostrarNota(temp, contenedorNotas)
        }else{
            mostrarNota(notas, contenedorNotas)
        }
        
        
    })

    tareaCheck.addEventListener("change", () => {
        if (buscadorInput.value != "" || buscadorInput.value != "") {
            if(!tareaCheck.checked) {
                temp = fiterSearch(buscadorInput.value, undefined)
            } else{
                temp = fiterSearch(buscadorInput.value, tareaCheck.checked)
            }
            mostrarNota(temp, contenedorNotas)
        }else if(tareaCheck.checked){
            temp = fiterSearch(buscadorInput.value, tareaCheck.checked)
            mostrarNota(temp, contenedorNotas)
        }else if(!tareaCheck.checked){
            temp = fiterSearch(buscadorInput.value, undefined)
            mostrarNota(temp, contenedorNotas)
        }else{
            mostrarNota(notas, contenedorNotas)
        }
    })
    
    
}


//marca las tareas que ya se realizaron
const marcarRealizada = (id) => {
    //al usar find devuelve la direccion de memoria en donde esta el objeto
    const nota = notas.find(nota => nota.id === id)
    //al devolver la posicion de memoria me deja modificarlo directamente
    if (nota != undefined) nota.realizado = !nota.realizado

    main(notas, contenedorNotas)
}

//funcion para eliminar una nota
const borrarNota = (id) => {
    notas = notas.filter(nota => nota.id != id)
    main(notas, contenedorNotas)
}


//funcion para agregar notas
const buttonAdd = (notaError={}) => {
    if (!bandNota) {
        bandNota = true
        contenedorNotas.classList.add("change-opacity")  
        contenedorPadre.innerHTML = `
                <div class="d-flex justify-content-between align-items-center col-11">
                    <p class="m-0">Nota nueva</p>
                    <button type="button" id="closeFloat" class="btn bg-transparent text-danger">X</button>
                </div>
                <div class="form-floating mb-3 col-10">
                    <input type="text" class="form-control" id="titulo" placeholder="Titulo" value=${notaError.tituloValue ? notaError.tituloValue : "" }>
                    <label for="titulo" class="text-dark">Titulo</label>
                    <div><p class="text-danger" id="vacioTitulo">${notaError.titulo ? notaError.titulo: ""}</p></div>
                </div>
                <div class="form-floating col-10">
                    <textarea class="form-control alto-text" placeholder="" rows="30" id="texto">${notaError.textoValue ? notaError.textoValue : ""}</textarea>
                    <label for="texto" class="text-dark">Ingresar texto</label>
                    <div><p class="text-danger" id="vacioTexto">${notaError.texto ? notaError.texto: ""}</p></div>
                </div>
                <div class="p-2 d-flex justify-content-between align-items-center col-11">
                    <button type="button" id="agregar" class="btn btn-primary">Agregar nota</button>
                    <button type="button" id="delete" class="btn btn-danger">Borrar</button>
                </div>
        
        `
        const closeFl = document.getElementById("closeFloat")
        closeFl.addEventListener("click", () => {
            contenedorNotas.classList.remove("change-opacity")
            contenedorPadre.innerHTML = ""
            bandNota = false
        })
    } else {
        contenedorNotas.classList.remove("change-opacity")
        bandNota = false
        contenedorPadre.innerHTML = ""
    }

    //agregando notas
    const agregar = document.getElementById("agregar")
    //if ternario para que se ejecute agregar solo cuando la ventana flotante esta activa y no de error  
    agregar ? agregar.addEventListener("click", () => {
        let titulo = document.getElementById("titulo").value
        let texto = document.getElementById("texto").value
        
        if (texto.trim() != ""  && titulo.trim() != "") {
            agregarNota(titulo, texto)
            contenedorNotas.classList.remove("change-opacity")
            contenedorPadre.innerHTML = ""
            main(notas, contenedorNotas)
        }else{
            let error = {}
            
            titulo.trim() == "" ? error.titulo = `El titulo es obligatorio` : error.tituloValue = titulo
            texto.trim() == "" ? error.texto = `El texto es obligatorio `: error.textoValue = texto

            bandNota = false
            buttonAdd(error)
        }
    }) : ""

    //eliminar notas
    const borrar = document.getElementById("delete")
    borrar ? borrar.addEventListener("click", () => {
        document.getElementById("titulo").value = ""
        document.getElementById("texto").value = ""
    }) : ""

}
const agregarNota = (titulo, texto)=>{
    idGlobal += 1
    
    notas.push({
        id: idGlobal,
        titulo: titulo,
        texto: texto,
        realizado: false
    })
}


//funcion principal
function main(notas, contenedorNotas) {
    filters()
    mostrarNota(notas, contenedorNotas)
    agregar.addEventListener("click", buttonAdd)
}

main(notas, contenedorNotas)
