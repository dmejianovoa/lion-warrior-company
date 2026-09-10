//Interfaz que representa la forma de un Usuario en frontend
export interface User {
  idUser?: number;
  userName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordHash?: string;
  userRole: 'admin' | 'barber' | 'client';
}
