import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Producto } from '../../modules/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})

export class CrearProductoComponent implements OnInit{

  //creando variable para poder usar formgroup
  productoForm: FormGroup;
  titulo= 'Crear producto';
  id: string | null;
  //clase formbuilder que permite manejar los formularios
  //se configuran cada elemento y validaciones
  constructor(private fb:FormBuilder, private router:Router, private toastr: ToastrService, 
    private _productoService: ProductoService, private aRoute: ActivatedRoute){
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    //es un método para obtener los productos

    //se crea una constante para obtener todos los valores y guardarlos
    //en un json
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value

    }
    if (this.id !== null) {
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data=>{
        this.toastr.success('El producto fue actualizado con éxito.', 'Actualizado!');
        this.router.navigate(['/']);
      });
    } else {

  
      this._productoService.guardarProducto(PRODUCTO).subscribe(data=>{
        this.toastr.success('El producto fue registrado con éxito.', 'Registrado!');
        this.router.navigate(['/']);
      }, error=>{
        console.log(error);
        this.productoForm.reset();
      }
      )
    }

  }
  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    }
  }
}
