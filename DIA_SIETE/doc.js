
function encontrarElMaximo(lista){
    return dividir(lista)[lista.length-1];
}

function dividir(lista){
    if(lista.length <= 1){
        return lista;
    }

    let mid = Math.floor(lista.length/2);

    let izq = dividir(lista.slice(0, mid));
    let der = dividir(lista.slice(mid));

    return conquer(izq, der);
}

function conquer(izq, der){

    let i = 0, j = 0;
    
    let res = [];

    while(i < izq.length && j < der.length){

        if(izq[i] < der[j]){
            res.push(izq[i]);
            i++;
        }else{
            res.push(der[j]);
            j++;
        }

    }

    return res.concat(izq.slice(i)).concat(der.slice(j));

}

//eventos

document.querySelector(".buscar").addEventListener("click", ()=>{
    
    let lista = document.querySelector(".inputLista").value;
    let span = document.querySelector(".span");
    let div = document.querySelector(".res");

    let listaArreglo = lista.split(",").map(e=>e.trim()).map(Number);

    div.classList.add("animate__tada");
    
    let maxNum = encontrarElMaximo(listaArreglo);
    span.innerHTML = maxNum;
    lista = "";
})

document.querySelector(".inputLista").addEventListener("click", ()=>{
    let div = document.querySelector(".res");
    div.classList.remove("animate__tada");
})
