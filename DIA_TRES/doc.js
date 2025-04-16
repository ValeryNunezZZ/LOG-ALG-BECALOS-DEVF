//arreglo de objetos con al menos 5 productos, cada uno con las propiedades nombre, precio y categoría.


/*Eres el encargado de gestionar los datos de una tienda online. Tienes un listado de productos con información como nombre, precio y categoría. Tu tarea será filtrar los productos por precio, ordenarlos alfabéticamente y generar una lista con los nombres.

Instrucciones para resolver el problema:

Usa sort() para ordenar esos productos alfabéticamente por su nombre.
Usa map() para generar un nuevo arreglo que contenga solo los nombres de los productos.
Muestra los resultados de la aplicación de cada métiodo en consola.
(Oppcional) Incluye alguno de los métodos faltantes (reduce, some, every, includes, etc.) con algún caso de uso en este ejemplo, usa tu creatividad.
*/

const productos = [
    { nombre: "Camiseta", precio: 15, categoria: "Ropa" },
    { nombre: "Laptop", precio: 800, categoria: "Electrónica" },
    { nombre: "Libro", precio: 12, categoria: "Educación" },
    { nombre: "Zapatos", precio: 50, categoria: "Ropa" },
    { nombre: "Celular", precio: 600, categoria: "Electrónica" },
];

const mostrarListaOriginal = () => {
    let tablaOriginal = document.querySelector(".tablaOriginalBody");
    
    let tabla = "";
    let numElementos = 1;
    
    productos.forEach((item)=>{
        tabla += `
        <tr>
        <th scope="row">${numElementos}</th>
        <td>${item.nombre}</td>
        <td>${item.precio}</td>
        <td>${item.categoria}</td>
        </tr>
        `;
        
        numElementos++;
    })
    
    tablaOriginal.innerHTML = tabla;
}

let botones = document.querySelectorAll(".btn");

function mostrarDatos(elementosFiltrados){
    
    let headerResultante = document.querySelector(".headerResultante");

    headerResultante.innerHTML = `
    <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Categoría</th>
    </tr>
    `;

    let tabla = "";
    let numElementos = 1;

    elementosFiltrados.forEach((item)=>{
        tabla += `
        <tr>
        <th scope="row">${numElementos}</th>
        <td>${item.nombre}</td>
        <td>${item.precio}</td>
        <td>${item.categoria}</td>
        </tr>
        `;
        
        numElementos++;
    })

    return tabla;
}

//FILTRAR
botones[0].addEventListener("click",()=>{
    let tablaResultante = document.querySelector(".tablaResultanteBody");
    let elementosFiltrados = productos.filter(item => item.precio < 100);
    let res = mostrarDatos(elementosFiltrados, tablaResultante);

    tablaResultante.innerHTML = res;
})

//ORDENAR
botones[1].addEventListener("click",()=>{
    let tablaResultante = document.querySelector(".tablaResultanteBody");
    productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    let res = mostrarDatos(productos, tablaResultante);
    
    tablaResultante.innerHTML = res;
})

//MAPEAR
botones[2].addEventListener("click",()=>{

    let headerResultante = document.querySelector(".headerResultante");

    headerResultante.innerHTML = `
    <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
    </tr>
    `;

    let tablaResultante = document.querySelector(".tablaResultanteBody");
    let mapeado = productos.map(e => {
        return e.nombre;
    });

    let tabla = "";
    let numElementos = 1;

    mapeado.forEach((item)=>{
        tabla += `
        <tr>
        <th scope="row">${numElementos}</th>
        <td>${item}</td>
        </tr>
        `;
        
        numElementos++;
    })

    
    tablaResultante.innerHTML = tabla;
})

function ponerHeaders(){
    let headerResultante = document.querySelector(".headerResultante");
    let tablaResultante = document.querySelector(".tablaResultanteBody");

    tablaResultante.innerHTML = `
    <tr>
        <th scope="row">-</th>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
    `;

    headerResultante.innerHTML = `
    <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Categoría</th>
    </tr>
    `;
}

ponerHeaders();
mostrarListaOriginal();