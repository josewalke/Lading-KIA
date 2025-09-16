// Servicio para guardar citas (sin SMS)
const BACKEND_URL = 'http://localhost:3001';

export interface AppointmentResult {
  success: boolean;
  appointmentId?: number;
  phone?: string;
  error?: string;
}

// Función para guardar cita sin SMS
export async function saveAppointment(
  phone: string, 
  name: string, 
  appointmentTime: string,
  message?: string,
  email?: string
): Promise<AppointmentResult> {
  console.log('🌐 [APPOINTMENT-SERVICE] Iniciando guardado de cita:', {
    timestamp: new Date().toISOString(),
    backendUrl: BACKEND_URL,
    payload: {
      name,
      phone,
      email: email || '',
      appointmentTime,
      message: message || ''
    }
  });

  try {
    console.log('📡 [APPOINTMENT-SERVICE] Realizando fetch al backend...');
    
    const response = await fetch(`${BACKEND_URL}/api/appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email: email || '',
        appointmentTime,
        message: message || ''
      })
    });

    console.log('📨 [APPOINTMENT-SERVICE] Respuesta HTTP recibida:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });

    const result = await response.json();
    console.log('📋 [APPOINTMENT-SERVICE] Datos de respuesta:', result);

    if (!response.ok) {
      console.error('❌ [APPOINTMENT-SERVICE] Error en respuesta del servidor:', {
        status: response.status,
        error: result.error
      });
      
      return {
        success: false,
        error: result.error || 'Error del servidor'
      };
    }

    console.log('✅ [APPOINTMENT-SERVICE] Cita guardada exitosamente:', {
      appointmentId: result.appointmentId,
      phone: result.phone
    });

    return {
      success: true,
      appointmentId: result.appointmentId,
      phone: result.phone
    };
  } catch (error: any) {
    console.error('💥 [APPOINTMENT-SERVICE] Error crítico en la comunicación:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: false,
      error: 'Error de conexión con el servidor'
    };
  }
}