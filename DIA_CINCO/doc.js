const gifts = ["Muñeca", "Carro de juguete", "Rompecabezas", "Lego", "Pelota"];

function findGift(gifts, giftName, index) {
    // Caso base: Si llegamos al final de la lista
    if (index === gifts.length) {
        return -1;
    }

    if(giftName === gifts[index].toLowerCase()){
        return index;
    }

    return findGift(gifts, giftName, ++index);

}

//eventos

document.querySelector(".buscar").addEventListener("click", ()=>{
    let lista = document.querySelector(".inputLista");
    let span = document.querySelector(".span");
    let div = document.querySelector(".res");

    let palabra = lista.value.trim().toLowerCase();

    div.classList.add("animate__tada");
    
    let res = findGift(gifts, palabra, 0);

    if(res >= 0){
        div.innerHTML = "";

        div.innerHTML = `
        <span class="span">🥳</span>
        <p>Regalo encontrado<br> en la posición ${res}</p>
        `;

    }else{
        div.innerHTML = "";

        div.innerHTML = `
        <span class="span">☹️</span>
        <p>Regalo encontrado<br> no encontrado</p>
        `;
    }
    lista.value = "";
})

document.querySelector(".inputLista").addEventListener("click", ()=>{
    let div = document.querySelector(".res");
    div.classList.remove("animate__tada");
})
