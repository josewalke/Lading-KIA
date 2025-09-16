// Configuración centralizada del backend
// En producción, usar rutas relativas para aprovechar el proxy de Netlify
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'https://back-landing-kia.onrender.com');

// Endpoints del backend
export const API_ENDPOINTS = {
  APPOINTMENT: `${BACKEND_URL}/api/appointment`,
  APPOINTMENTS: `${BACKEND_URL}/api/appointments`,
  STATS: `${BACKEND_URL}/api/stats`,
  HEALTH: `${BACKEND_URL}/api/health`,
  CLIENTES_KIA: `${BACKEND_URL}/api/clientes-kia`,
  CLIENTES_SEVILLA: `${BACKEND_URL}/api/clientes-sevilla`,
  NUMEROS_MOVILES: `${BACKEND_URL}/api/numeros-moviles`,
  SMS_MESSAGE: `${BACKEND_URL}/api/sms-message`,
} as const;

// Función para construir URL de endpoint específico
export const getEndpoint = (endpoint: keyof typeof API_ENDPOINTS, id?: string | number) => {
  const baseUrl = API_ENDPOINTS[endpoint];
  if (id) {
    return `${baseUrl}/${id}`;
  }
  return baseUrl;
};

// Función para construir URL de endpoint con subpath
export const getEndpointWithSubpath = (endpoint: keyof typeof API_ENDPOINTS, subpath: string) => {
  return `${API_ENDPOINTS[endpoint]}/${subpath}`;
};
