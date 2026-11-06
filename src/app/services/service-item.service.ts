import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServiceItem } from '../model/service-item.model';

//@Injectable con providedIn: 'root' registro de servicios como singleton
//Disponible en toda la aplicacion
@Injectable({ providedIn: 'root' })
export class ServiceItemService {
  // URL base de usuarios (consultar, actualizar y eliminar)
  private apiUrl = `${environment.apiUrl}/api/services`;

  // Inyeccion de dependencias del HttpClient con constructor ya configurado
  constructor(private http: HttpClient) {}

  // Metodo para obtener todos los servicios
  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(this.apiUrl);
  }
}
