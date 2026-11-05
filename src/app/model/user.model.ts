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

// Datos que espera POST /api/auth/register (refleja RegisterRequest del backend)
export interface RegisterRequest {
  userName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

//Datos que espera POST /api/auth/login (refleja LoginRequest del backend)
export interface LoginRequest {
  email: string;
  password: string;
}

// Respuesta de los endpoints de autenticación (refleja AuthResponse del backend)
export interface AuthResponse {
  message: string;
  user: User;
}
