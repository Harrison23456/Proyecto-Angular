import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Producto } from '../modules/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  [x: string]: any;

  url="http://localhost:4000/productos/";
  
  constructor(private http: HttpClient) { }

  //crear método para devolver un observable
  //utilizado para hacer peticiones asíncronas
  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarProducto(id: string, producto: Producto): Observable<any>{
    return this.http.put(this.url + id, producto);
  }

  
}
