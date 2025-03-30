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
        if(this.tareas.includes(tarea)){
            alert("ya existe la tarea");
        }else{
            this.tareas.push(tarea);
        }
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

    objetos.forEach(o => {
        let option = document.createElement('option');
        option.innerHTML = `${o.nombre}`;
        select.appendChild(option);
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
        let name = this;
        let i = objetos.shift(objetos.indexOf(this),1);
        this.remove();
        eliminar = false;

        let select = document.querySelector(".nombreViaje");
    
        select.innerHTML = "";
    
        objetos.forEach(o => {
            let option = document.createElement('option');
            option.value = o.nombre;
            option.innerHTML = `${o.nombre}`;
            select.appendChild(option);
        });
    
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

    let objetoSeleccionado = this;
    objetoSeleccionado.crearTarea(option);

    let select = document.querySelector(".nombreViaje");

    nombreTarea.value = "";
    escribirTareas(objetoSeleccionado);


})

function escribirTareas(objetoSeleccionado){

    let listaTareas = document.getElementById('lista-tareas');

    listaTareas.innerHTML = `<h3 id="test">Tareas de: ${objetoSeleccionado.nombre}</h3>`;
    
    objetoSeleccionado.tareas.forEach(o => {
        let miniD = document.createElement('div');

        miniD.className = 'viaje-card';

        miniD.innerHTML = `
        <p>Nombre: ${objetos[objetos.length-1].origen}</p>
        <button onclick="" class="danger-button">Eliminar Tarea</button>
        `;
        listaTareas.appendChild(option);
    });

}