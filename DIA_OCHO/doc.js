const invitados = ["Ana", "Carlos", "Cecilia", "Daniel", "Diana", "Eduardo"];

function encontrarPareja(arr) {
    let inicio = 0;
    let siguiente = 1;
    let pareja = [];

    while (siguiente < arr.length) {
        if(invitados[inicio][0] == invitados[siguiente][0]){
            
            pareja.push(invitados[inicio]);
            pareja.push(invitados[siguiente]);

            return pareja;
        }

        inicio++;
        siguiente++;
    }

    return null; // Si no se encuentra ningún par
}

console.log(encontrarPareja(invitados));
// Resultado: ["Carlos", "Cecilia"]