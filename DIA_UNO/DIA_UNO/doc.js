class Viaje{
    constructor(nombre, origen){
        this.nombre = nombre;
        this.origen = origen;

        this.listaTareas = [];
    }
    
    crearTarea(tarea){
        if(!tarea){
            alert("OH NO!! CAMPOS VACÍOS D:");
            return;
        }

        this.listaTareas.push(tarea);
    }

    eliminarTarea(tarea){

    }
    
}


let viajes = [];

document.querySelector(".agregarViaje").addEventListener("click", ()=>{
    let nomViaje = document.querySelector(".nomViaje");
    let nomOrigen = document.querySelector(".origen");
    
    let [nombre, origen] = [nomViaje.value, nomOrigen.value];
    
    if([nombre, origen].some(elemento => !elemento)){
        alert("OH NO!! CAMPOS VACÍOS D:");
        return;
    }

    let viaje = new Viaje(nombre, origen);
    nomViaje.value = "";
    nomOrigen.value = "";
    
    viajes.push(viaje);
    
    cargarViajes();
    
});

function cargarViajes(){

    let viajesContainer = document.querySelector(".viajes_container");
    viajesContainer.innerHTML = "";

    viajes.forEach((objeto, indice) => {
        
        let div = document.createElement('div');
        div.className = 'viaje-card';

        //EXTRAER TAREAS

        const elementosTareas = objeto.listaTareas.map((tarea, indexTarea) =>
            `<li>${tarea} <button onclick="eliminarTarea(${indice}, ${indexTarea})">Eliminar</button></li>`
        ).join('');


        //


        div.innerHTML = `
            <h3 id="test">${objeto.nombre}</h3>
            <p>Origen: ${objeto.origen}</p>

            <ul class="listaTareas">${elementosTareas}</ul>

            <div >
                <input type="text" class="campoTarea">
                <button class="boton" onclick="anadirTarea(${indice})">Agregar Tarea</button>
            </div>

            <button class="boton" onclick="eliminarViaje(${indice})">Eliminar Viaje</button>
        `;

        viajesContainer.appendChild(div);

    });
}

function eliminarViaje(indice){
    viajes.splice(indice, 1);
    cargarViajes();
}

function anadirTarea(indice){
    let campoTarea = document.querySelectorAll(".campoTarea");
    
    if(!campoTarea[indice].value){
        alert("OH NO!! CAMPO VACÍO D:");
        return;
    }

    viajes[indice].crearTarea(campoTarea[indice].value);

    cargarViajes();
}