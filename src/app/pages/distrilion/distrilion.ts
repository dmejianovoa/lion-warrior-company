import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';


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

export class Distrilion {

  productos: Producto[] = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 10000, imagen: 'assets/images/producto1.jpg' },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 19000, imagen: 'assets/images/producto2.jpg' },
    { id: 3, nombre: 'Producto 3', descripcion: 'Descripción del producto 3', precio: 50000, imagen: 'assets/images/producto3.jpg' },
    { id: 4, nombre: 'Producto 4', descripcion: 'Descripción del producto 4', precio: 15000, imagen: 'assets/images/producto4.jpg' },
    { id: 5, nombre: 'Producto 5', descripcion: 'Descripción del producto 5', precio: 80000, imagen: 'assets/images/producto5.jpg' },
    { id: 6, nombre: 'Producto 6', descripcion: 'Descripción del producto 6', precio: 12000, imagen: 'assets/images/producto6.jpg' },
    { id: 7, nombre: 'Producto 7', descripcion: 'Descripción del producto 7', precio: 9000, imagen: 'assets/images/producto7.jpg' },
    { id: 8, nombre: 'Producto 8', descripcion: 'Descripción del producto 8', precio: 14000, imagen: 'assets/images/producto8.jpg' },
    { id: 9, nombre: 'Producto 9', descripcion: 'Descripción del producto 9', precio: 11000, imagen: 'assets/images/producto9.jpg' },
    { id: 10, nombre: 'Producto 10', descripcion: 'Descripción del producto 10', precio: 7000, imagen: 'assets/images/producto10.jpg' },
  ];

  carrito: CarritoItem[] = [];

  agregarAlCarrito(producto: Producto) {
    const existente = this.carrito.find(item => item.id === producto.id);
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
    this.carrito = this.carrito.filter(i => i.id !== item.id);
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
    return this.carrito.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
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
