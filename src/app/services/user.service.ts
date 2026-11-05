import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { RegisterRequest } from '../model/user.model';
import { AuthResponse } from '../model/user.model';
import { environment } from '../../environments/environment';

//@Injectable con providedIn: 'root' registro de servicios como singleton
//Disponible en toda la aplicacion
@Injectable({ providedIn: 'root' })
export class UserService {
  // URL base de usuarios (consultar, actualizar y eliminar)
  private apiUrl = `${environment.apiUrl}/api/users`;

  // URL base de autenticación (registro e inicio de sesión)
  private authUrl = `${environment.apiUrl}/api/auth`;

  // Inyeccion de dependencias del HttpClient con constructor ya configurado
  constructor(private http: HttpClient) {}

  // Metodo para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  //Metodo para buscar un usuario por su ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  //Metodo para crear un usuario
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, request);
  }

  //Metodo para actualizar un usuario
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  //Metodo para eliminar el usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
