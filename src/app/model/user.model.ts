//Interfaz que representa la forma de un Usuario en frontend
export interface User {
  idUser?: number;
  userName: string;
  email: string;
  passwordHash?: string;
  userRole: 'admin' | 'barber' | 'client';
}
