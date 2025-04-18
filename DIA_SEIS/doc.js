function encontrarPalabra(lista){

    let maxWord = "";

    for(e of lista){
        if(e.length > maxWord.length) maxWord = e;
    }
    //console.log(maxWord);
    return maxWord;
}

//eventos

document.querySelector(".buscar").addEventListener("click", ()=>{
    
    let lista = document.querySelector(".inputLista");
    let span = document.querySelector(".span");
    let div = document.querySelector(".res");

    let listaArreglo = lista.value.split(" ");

    div.classList.add("animate__tada");
    
    let maxWord = encontrarPalabra(listaArreglo);
    span.innerHTML = maxWord;
    lista.value = "";
})

document.querySelector(".inputLista").addEventListener("click", ()=>{
    let div = document.querySelector(".res");
    div.classList.remove("animate__tada");
})

