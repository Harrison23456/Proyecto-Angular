import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../modules/producto';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrl: './listar-producto.component.css'
})

export class ListarProductoComponent implements OnInit {

  listProductos: Producto[] =[];
  constructor(private _productoService: ProductoService,
    private toastR: ToastrService){}

  ngOnInit(): void {
    this.obtenerProductos();
    //throw new Error('Method not implemented.');
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data=>{
      //console.log(data);
    this.listProductos = data;
    }, error=>{
      console.log(error)
    })
  }


  eliminarProducto(id: any) {
      this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastR.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    });
  }

}