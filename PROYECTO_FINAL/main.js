// Importamos recetas desde un archivo externo simulado
import { getRecipes } from "./services/recipes.js";

// Verificamos que los datos recibidos sean un arreglo
const recetas = Array.isArray(getRecipes()) ? getRecipes() : [];

// Referencias a elementos del DOM
const input = document.getElementById("ingredient-input");
const recipesContainer = document.getElementById("recipes");
const sortSelect = document.getElementById("sort");
const suggestionBtn = document.getElementById("suggestion-btn");

// Variables globales para autocompletado y análisis
let currentSuggestionIndex = -1;
let currentSuggestions = [];
let historialIngredientes = new Set;


// =============================================
// FUNCIÓN: Mostrar recetas en pantalla
// =============================================
function renderRecetas(lista) {
    recipesContainer.innerHTML = ""; // Limpiamos el contenedor

    lista.forEach((receta) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
        <img src="${receta.imagen}" alt="${receta.nombre}" />
        <h3>${receta.nombre}</h3>
        <p><strong>Tiempo:</strong> ${receta.tiempo} min</p>
        <p>${receta.pasos}</p>`;
        recipesContainer.appendChild(card);
    });
}


// =============================================
// FUNCIÓN: Filtrar recetas por ingrediente
// =============================================
function filtrarPorIngrediente(ingrediente) {
    const lower = ingrediente.toLowerCase();

    // TODO: Reemplazar .includes() con implementación manual de búsqueda de subcadenas (como KMP o recorrido carácter por carácter)


    /*
        return recetas.filter((receta) =>
        receta.ingredientes.some((ing) => ing.toLowerCase().includes(lower))
        );
    */

    let arregloDeIngredientes = [];

    recetas.forEach((receta) => {
        
        for(let i=0 ; i<receta.ingredientes.length ; i++){

            let ingredienteActual = receta.ingredientes[i].toLowerCase();
            let iteradorLower = 0;
            let posIngAct = 0;
            let posIngActAux = 0;
            let palabraLograda = "";

            while(posIngAct<ingredienteActual.length && iteradorLower<lower.length){
                
                if(ingredienteActual[posIngAct] != lower[iteradorLower]){
                    iteradorLower = 0;
                    posIngActAux++;
                    posIngAct = posIngActAux;
                    palabraLograda = "";
                }else{
                    palabraLograda += lower[iteradorLower];
                    iteradorLower++;
                    posIngAct++;
                }
            }

            if(palabraLograda == lower){
                arregloDeIngredientes.push(receta);
                break;
            }
        }
    });

    return arregloDeIngredientes;
}


// =============================================
// FUNCIÓN: Actualizar historial y análisis
// =============================================
function actualizarHistorial(ingrediente) {
    //primero verificar que el ingrediente exista
    recetas.forEach((receta)=>{
        if(receta.ingredientes.includes(ingrediente)){
            historialIngredientes.add(ingrediente);
        }
    })

    // Sliding Window: mantenemos máximo 20 ingredientes
    if (historialIngredientes.size > 20) {
        const primerElemento = historialIngredientes.values().next().value;
        historialIngredientes.delete(primerElemento);
    }

    // Mostrar en texto cuántos ingredientes únicos se han usado
    document.getElementById("analysis").textContent =
        `Usaste ${historialIngredientes.size} ingrediente${historialIngredientes.length > 1 ? 's' : ''} esta semana.`;

    actualizarSugerenciasRecientes();
}


// =============================================
// FUNCIÓN: Mostrar top ingredientes populares recientes (Sliding Window real)
// =============================================

// TODO: Sliding Window sobre últimas 5 búsquedas para encontrar ingredientes más frecuentes

function actualizarSugerenciasRecientes() {
    //Será una ventana de tamaño 3 (1 o 2 para un array menor a 3)

    let ventana;
    if(historialIngredientes.size == 1){
        ventana = Array.from(historialIngredientes).slice(-1);
    }else if(historialIngredientes.size == 2){
        ventana = Array.from(historialIngredientes).slice(-2);
    }else{
        ventana = Array.from(historialIngredientes).slice(-5);
    }

    let recentSuggestionsUl = document.getElementById("recent-suggestions");

    recentSuggestionsUl.innerHTML = ""; // Limpiamos el contenedor

    let conjuntoItems = "";

    for(let i=0 ; i<ventana.length ; i++){
        conjuntoItems += `
        <li>${ventana[i]}</li>
        `
    }

    recentSuggestionsUl.innerHTML = conjuntoItems;

    /*ventana.forEach((receta) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
        <img src="${receta.imagen}" alt="${receta.nombre}" />
        <h3>${receta.nombre}</h3>
        <p><strong>Tiempo:</strong> ${receta.tiempo} min</p>
        <p>${receta.pasos}</p>`;
        recipesContainer.appendChild(card);
    });*/
}

// =============================================
// FUNCIÓN: Mostrar sugerencias de autocompletado
// =============================================
function autocompletar(valor) {
    const autocompletarDiv = document.getElementById("autocomplete-list");
    autocompletarDiv.innerHTML = "";

    if (!valor) return;

    //PUSE INCLUDES EN LUGAR DE STARTWITH
    currentSuggestions = [...new Set(recetas.flatMap(r => r.ingredientes))]
        .filter((ing) => ing.toLowerCase().includes(valor.toLowerCase()))
        .slice(0, 5);

    currentSuggestionIndex = -1;

    currentSuggestions.forEach((sug) => {
        const item = document.createElement("div");
        item.textContent = sug;
        item.classList.add("autocomplete-item");
        item.onclick = () => {
            input.value = sug;
            input.focus();
        };
        autocompletarDiv.appendChild(item);
    });
}


// =============================================
// FUNCIÓN: Buscar recetas y mostrarlas
// =============================================
function buscarYRenderizar() {
    const valor = input.value.trim();
    if (!valor) return;

    const resultados = filtrarPorIngrediente(valor);
    actualizarHistorial(valor);
    renderRecetas(resultados);
}

/*
TIPO:
    cadena => 0
    numero => 1
*/
function mergeSort(lista, tipo){
    
    if(lista.length <= 1){
        return lista;
    }

    let mid = Math.floor(lista.length/2);

    let izq = mergeSort(lista.slice(0,mid));
    let der = mergeSort(lista.slice(mid));

    
    if(tipo == 0) return mergeCadena(izq, der);
    
    return mergeNumero(izq, der);
}

function mergeCadena(izq, der){
    
    let i=0, j=0;

    let res = [];

    while(i<izq.length && j<der.length){
        if(izq[i].nombre.localeCompare(der[j].nombre) < 0){
            res.push(izq[i]);
            i++;
        }else{
            res.push(der[j]);
            j++;
        }
    }

    return res.concat(izq.slice(i)).concat(der.slice(j));
}

function mergeNumero(izq, der){

    let i=0, j=0;

    let res = [];

    while(i<izq.length && j<der.length){
        if(izq[i].tiempo >= der[j].tiempo){
            res.push(der[j]);
            j++;
        }else{
            res.push(izq[i]);
            i++;
        }
    }

    return res.concat(izq.slice(i)).concat(der.slice(j));
}

// =============================================
// FUNCIÓN: Ordenar recetas por nombre o tiempo
// =============================================
function ordenarRecetas(tipo) {
    let ordenadas = [...recetas];
    //console.log(ordenadas)
    let arregloOrdenadas = [];

    if (tipo === "time") {
        // TODO: Reemplazar .sort() por una implementación manual de Merge Sort (crear función mergeSort())

        arregloOrdenadas = mergeSort(ordenadas, 1);
        console.log(arregloOrdenadas);
        //ordenadas.sort((a, b) => a.tiempo - b.tiempo);
    } else {
        // TODO: Reemplazar .sort() por una implementación manual de ordenamiento alfabético (merge sort)
        
        arregloOrdenadas = mergeSort(ordenadas, 0);
        console.log(arregloOrdenadas);

        //ordenadas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    renderRecetas(arregloOrdenadas);
}

/*function mergeSort(lista){
    
    if(lista.length <= 1){
        return lista;
    }

    let mid = Math.floor(lista.length/2);

    let izq = mergeSort(lista.slice(0,mid));
    //puede que esté mal
    let der = mergeSort(lista.slice(mid+1, lista.length));

    return merge(izq, der);
}

function merge(izq, der){
    let i=0, j=0;

    let res = [];

    while(i<izq.length && j<der.length){
        if(izq[i]>=der[j]){
            res.push(izq[i]);
            i++;
        }else{
            res.push(der[j]);
            j++;
        }
    }

    return res.concat(izq.slice(i)).concat(der.slice(j));
}
*/
// =============================================
// FUNCIÓN: Resaltar sugerencia seleccionada
// =============================================
function highlightSuggestion(items) {
    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentSuggestionIndex);
    });
}


// =============================================
// EVENTO: Cuando el usuario escribe en el input
// =============================================
input.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    autocompletar(value); // Solo muestra sugerencias

    if (!value) {
        renderRecetas(recetas); // Si está vacío, mostrar todas
    }
});


// =============================================
// EVENTO: Teclado para navegar sugerencias
// =============================================
input.addEventListener("keydown", (e) => {
    const items = document.querySelectorAll(".autocomplete-item");

    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentSuggestionIndex < items.length - 1) {
            currentSuggestionIndex++;
            highlightSuggestion(items);
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentSuggestionIndex > 0) {
            currentSuggestionIndex--;
            highlightSuggestion(items);
        }
    } else if (e.key === "Enter") {
        if (currentSuggestionIndex >= 0 && items[currentSuggestionIndex]) {
            input.value = items[currentSuggestionIndex].textContent;
            document.getElementById("autocomplete-list").innerHTML = "";
        }
        buscarYRenderizar(); // Ejecuta búsqueda
    }
});


// =============================================
// EVENTO: Cambiar tipo de ordenamiento
// =============================================
sortSelect.addEventListener("change", (e) => ordenarRecetas(e.target.value));


// =============================================
// EVENTO: Mostrar la receta más rápida
// =============================================
suggestionBtn.addEventListener("click", () => {
    // TODO: Reemplazar .reduce() con una implementación manual de Greedy para encontrar el menor tiempo
    const recetaMasRapida = recetas.reduce((a, b) => a.tiempo < b.tiempo ? a : b);
    renderRecetas([recetaMasRapida]);
});


// =============================================
// Render inicial de todas las recetas
// =============================================
renderRecetas(recetas);


