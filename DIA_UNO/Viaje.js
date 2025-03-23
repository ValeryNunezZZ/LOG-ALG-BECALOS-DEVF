class Viaje{

    destinos = [];

    constructor(destino, fecha, costoIda, costoRegreso, transporte){
        this.destino = destino;
        this.fecha = fecha;
        this.costoIda = costoIda;
        this.costoRegreso = costoRegreso;
        this.transporte = transporte;
    }

    registrarDestino(){

        let viaje;

        if(this.destino != "" || this.fecha != "" || this.fecha != ""){

            viaje = {
                destino: this.destino,
                fecha: this.fecha,
                transporte: this.transporte
            }

            this.destinos.push(viaje);

        }else{
            console.log("DATOS INVÁLIDOS :(");
        }
    }

    mostrarDestinos(){
        this.destinos.forEach(elemento=>{
            for(let clave in elemento){
                console.log(`${clave}: ${elemento[clave]}`);
            }
        });
    }

    eliminarDestino(){}

    calcularCosto(){

    }
}

let viaje = [];

let vUno = new Viaje("guatuli", "hoy", 300, 400, "combi");
let vDos = new Viaje("mexico", "hoy", 300, 400, "combi");

viaje.push(vUno);
viaje.push(vDos);

viaje.forEach(elemento => {
    elemento.registrarDestino();
    elemento.mostrarDestinos();
});