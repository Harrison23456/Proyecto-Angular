export class Producto {

    //se declaran las propiedades
    _id?: string;
    nombre: string;
    categoria: string;
    ubicacion: string;
    precio: number;

    //constructor de las propiedades 
    constructor(nombre: string, categoria: string, ubicacion: string, precio: number){
        this.nombre = nombre;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.precio = precio;
    }
}