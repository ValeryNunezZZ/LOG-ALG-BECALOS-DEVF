let listaDeCompras = new Set();


//EVENTOS
document.querySelector(".agregar").addEventListener("click", ()=>{
    let entrada = document.querySelector(".entrada").value;

    if(!entrada){
        alert("No olvides ingresar algo :D");
        return;
    }

    listaDeCompras.add(entrada);
    mostrarLista();
});

document.querySelector(".eliminar").addEventListener("click", ()=>{
    let entrada = document.querySelector(".entrada").value;

    if(!entrada){
        alert("No olvides ingresar algo :D");
        return;
    }

    listaDeCompras.delete(entrada);
    mostrarLista();
});

function mostrarLista(){
    let elementosContainer = document.querySelector(".elementos_container");

    if(listaDeCompras.size == 0){
        elementosContainer.innerHTML = "<li class='sinElementos'>Sin elementos en la lista</li>";

        return;
    }

    let container;

    listaDeCompras.forEach(e => {
        container += `<li>${e}</li>`;
        console.log(e);
    });

    elementosContainer.innerHTML = container;
}

mostrarLista();