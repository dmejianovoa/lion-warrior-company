import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../model/product.model';

//@Injectable con providedIn: 'root' registro de productos como singleton
//Disponible en toda la aplicacion
@Injectable({ providedIn: 'root' })
export class ProductService {
  // URL base de productos (consultar, actualizar y eliminar)
  private apiUrl = `${environment.apiUrl}/api/products`;

  // Inyeccion de dependencias del HttpClient con constructor ya configurado
  constructor(private http: HttpClient) {}

  // Metodo para obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
