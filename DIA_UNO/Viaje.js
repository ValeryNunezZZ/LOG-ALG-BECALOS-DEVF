//FALTA AGREGAR EL TRANSPORTE, LO DE LAS TAREAS, MEJORAR LOS MODALES Y EL CSS

class Viaje{

    constructor(nombre, origen, destino, duracion, pais, id){
        this.nombre = nombre;
        this.origen = origen;
        this.destino = destino;
        this.duracion = duracion;
        this.pais = pais;
        this.tareas = [];
    }

    crearTarea(tarea) {
        this.tareas.push(tarea);
    }

    eliminarTarea(tarea){
        let i = this.tareas.indexOf(tarea);
        this.tareas.splice(i,1);
    }
}

let agregarViaje = document.querySelector(".agregarViaje");
let nombre = document.getElementById("nombre");
let origen = document.getElementById("origen");
let destino = document.getElementById("destino");
let pais = document.getElementById("pais");

let objetos = [];

function clearFields(){
    
    let campos = ['nombre', 'origen', 'destino', 'duracion', 'pais'];

    campos.forEach(campo => {
        document.getElementById(campo).value = "";
    });
}

function addViaje(){

    let listaViajes = document.getElementById('lista-viajes');


    let div = document.createElement('div');
    
    div.className = 'viaje-card';

    div.innerHTML = `
    <h3 id="test">${objetos[objetos.length-1].nombre}</h3>
    <p>Origen: ${objetos[objetos.length-1].origen}</p>
    <p>Destino: ${objetos[objetos.length-1].destino}, ${objetos[objetos.length-1].pais}</p>
    <p>Duración: ${objetos[objetos.length-1].duracion} días</p>
    <button onclick="eliminarViaje()" class="danger-button">Eliminar viaje</button>
    `;

    //agregando OPCIONES 

    let select = document.querySelector(".nombreViaje");
    let opciones;

    select.innerHTML = "";

    let numOp = 0;

    objetos.forEach(o => {
        let option = document.createElement('option');
        option.value = numOp;
        //alert(numOp);
        option.innerHTML = `${o.nombre}`;
        select.appendChild(option);
        numOp++;
    });


    div.onclick = eliminarDiv;

    listaViajes.appendChild(div); 
    

    //div.innerHTML
}

agregarViaje.addEventListener("click", ()=>{

    let campos = ['nombre', 'origen', 'destino', 'duracion', 'pais'];
    let datos = campos.map(i => document.getElementById(i).value);

    if(datos.some(elemento => !elemento)){
        //alert de llenado de datos.
        alert("ey");
    }else{

        let [nombre, origen, destino, duracion, pais] = datos;

        const v = new Viaje(nombre, origen, destino, duracion, pais);

        clearFields();
        objetos.push(v);
        addViaje();

    }
});

let viajeCard = document.querySelector(".viaje-card");

let eliminar = false;
let agregar = false;

function eliminarDiv(){
    if(eliminar){
        let p = 0;
        let posicionCorrecta;

        let nombreEliminar = prompt("Nombre: ")

        objetos.forEach(o=>{
            if(o.nombre == nombreEliminar){
                posicionCorrecta = p;
            }
            p++;
        })
        alert(`posicion : ${posicionCorrecta}`)
        let i = objetos.shift(posicionCorrecta,1);
        this.remove();
        eliminar = false;

        let select = document.querySelector(".nombreViaje");
    
        select.innerHTML = "";
        let numOp = 0;

        objetos.forEach(o => {
            let option = document.createElement('option');
            option.value = numOp;
            //alert(numOp);
            option.innerHTML = `${o.nombre}`;
            select.appendChild(option);
            numOp++;
        });

        objetos.forEach((o)=>{
            alert(o.nombre)
        })

        escribirTareas();
    }
}

function eliminarViaje(){
    eliminar = true;
}


let agregarTarea = document.querySelector(".agregarTarea");

agregarTarea.addEventListener("click", ()=>{
    let option = document.querySelector(".nombreViaje").value;
    let nombreTarea = document.getElementById("tarea").value;
    
    if(!nombreTarea || !option){
        alert("CAMPO INVÁLIDOS :(")
        return;
    }

    alert(objetos[option].nombre);
    objetos[option].crearTarea(nombreTarea);

    nombreTarea.value = "";
    
    escribirTareas();

})

function escribirTareas(){

    let option = document.querySelector(".nombreViaje").value;
    let listaTareas = document.getElementById('lista-tareas');
    
    listaTareas.innerHTML = "";

    objetos.forEach(Obj => {
        
        Obj.tareas.forEach(o => {
            let miniD = document.createElement('div');
    
            miniD.className = 'viaje-card';
    
            miniD.innerHTML = `
            <h4 id="test">Tareas de: ${Obj.nombre}</h4>
            <p>Nombre: ${o}</p>
            <button onclick="eliminarHomework()" class="danger-button">Eliminar Tarea</button>
            `;

            miniD.onclick = eliminarDivTarea;
    
            listaTareas.appendChild(miniD);
        });

    })
}


let et = false;



function eliminarHomework(){
    
    et = true;
    eliminarDivTarea();
    
}

function eliminarDivTarea(){
    if(et){
        
        let p = 0;
        let posicionCorrecta;

        let nombreEliminar = prompt("Nombre VIAJE: ")

        objetos.forEach(o=>{
            if(o.nombre == nombreEliminar){
                posicionCorrecta = p;
            }
            p++;
        })

        let nombreTareEliminar = prompt("Nombre TAREA: ")
        
        //let i = objetos.shift(posicionCorrecta,1);
        objetos[posicionCorrecta].tareas.forEach(o=>{
            if(o == nombreTareEliminar){
                posicionCorrecta = p;
            }
            p++;
        })
        //this.remove();

        objetos[posicionCorrecta].eliminarTarea(posicionCorrecta);

        eliminar = false;

        escribirTareas();
    }
}