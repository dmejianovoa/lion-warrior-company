import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceItemService } from '../../services/service-item.service';
import { ServiceItem } from '../../model/service-item.model';

@Component({
  selector: 'app-service',
  imports: [DecimalPipe],
  templateUrl: './service.html',
  styleUrl: './service.css',
})
export class Service implements OnInit {
  // Lista de servicios que llega de la API
  services: ServiceItem[] = [];

  // Imágenes de las tarjetas: se reparten por posición porque la API no trae imagen
  images = [
    'card1.jpg',
    'card6.jpg',
    'card7.jpg',
    'card2.jpg',
    'card3.jpg',
    'card5.jpg',
    'card9.jpg',
    'card8.jpg',
    'card4.jpg',
  ];

  // Estado de la carga: indicador mientras responde la API y mensaje si falla
  loading = true;
  loadError = '';

  // Inyeccion de dependencias: servicio de datos y refresco de vista
  constructor(
    private serviceItemService: ServiceItemService,
    private cdr: ChangeDetectorRef,
  ) {}

  // Al abrir la página se piden los servicios a la API
  ngOnInit() {
    this.serviceItemService.getServices().subscribe({
      next: (list: ServiceItem[]) => {
        this.services = list;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
