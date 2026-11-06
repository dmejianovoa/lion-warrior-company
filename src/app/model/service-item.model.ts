// Servicio de la barbería (refleja ServiceItemResponse del backend)
export interface ServiceItem {
  idService: number;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  durationMin: number;
}
