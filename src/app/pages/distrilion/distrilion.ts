import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface CarritoItem extends Producto {
  cantidad: number;
}

@Component({
  selector: 'app-distrilion',
  imports: [CommonModule],
  templateUrl: './distrilion.html',
  styleUrl: './distrilion.css',
})
export class DistriLion implements OnInit {
  productos: Producto[] = [];

  // Imágenes del catálogo: se reparten por posición porque la API no trae imagen
  private imagenes = [
    'product1.jpeg',
    'product2.jpg',
    'product3.jpg',
    'product4.webp',
    'product5.jpeg',
  ];

  // Estado de la carga: indicador mientras responde la API y mensaje si falla
  loading = true;
  loadError = '';

  // Inyeccion de dependencias: producto de datos y refresco de vista
  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  // Al abrir la página se piden los productos a la API
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (list: Product[]) => {
        // Convierte cada producto de la API a la forma que usa el catálogo y el carrito
        this.productos = list.map((p, i) => ({
          id: p.idProduct,
          nombre: p.productName,
          descripcion: p.productDescription,
          precio: p.priceRetail,
          imagen: this.imagenes[i % this.imagenes.length],
        }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.loadError = 'No se pudo cargar los productos. Intentalo de nuevo.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  //Carrito de compras
  carrito: CarritoItem[] = [];

  agregarAlCarrito(producto: Producto) {
    const existente = this.carrito.find((item) => item.id === producto.id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.carritoAbierto = true;
  }
  aumentarCantidad(item: CarritoItem) {
    item.cantidad++;
  }

  disminuirCantidad(item: CarritoItem) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.eliminarDelCarrito(item);
    }
  }

  eliminarDelCarrito(item: CarritoItem) {
    this.carrito = this.carrito.filter((i) => i.id !== item.id);
  }

  toggleCarrito() {
    this.carritoAbierto = !this.carritoAbierto;
  }

  cerrarCarrito() {
    this.carritoAbierto = false;
  }

  carritoAbierto = false;

  get totalItems(): number {
    return this.carrito.reduce((sum, item) => sum + item.cantidad, 0);
  }

  get totalPrecio(): number {
    return this.carrito.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
  }

  formatoPrecio(precio: number): string {
    return precio.toLocaleString('es-CO');
  }

  // Función para arrastran el menu

  cartPosX = 20;
  cartPosY = window.innerHeight - 450;
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  iniciarArrastre(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.clientX - this.cartPosX;
    this.offsetY = event.clientY - this.cartPosY;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  moverCarrito(event: MouseEvent) {
    if (this.isDragging) {
      this.cartPosX = event.clientX - this.offsetX;
      this.cartPosY = event.clientY - this.offsetY;
    }
  }

  @HostListener('document:mouseup')
  soltarCarrito() {
    this.isDragging = false;
  }
}
