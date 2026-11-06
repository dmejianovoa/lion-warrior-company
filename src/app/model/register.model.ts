// Datos que espera POST /api/auth/register (refleja RegisterRequest del backend)
export interface RegisterRequest {
  userName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
