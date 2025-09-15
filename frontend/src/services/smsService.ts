// Servicio SMS con Twilio
import twilio from 'twilio';

// Configuración de Twilio desde variables de entorno
const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const messagingServiceSid = import.meta.env.VITE_TWILIO_MESSAGING_SERVICE_SID;

if (!accountSid || !authToken || !messagingServiceSid) {
  throw new Error('Variables de entorno de Twilio no configuradas. Ver archivo env-example.txt');
}

const client = twilio(accountSid, authToken);

export interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendSMS(to: string, message: string): Promise<SMSResult> {
  try {
    // Validar número de teléfono
    if (!to || !to.startsWith('+')) {
      return {
        success: false,
        error: 'Número de teléfono inválido. Debe incluir código de país (+34...)'
      };
    }

    // Enviar SMS
    const result = await client.messages.create({
      to: to,
      messagingServiceSid: messagingServiceSid,
      body: message
    });

    console.log('SMS enviado exitosamente:', result.sid);
    
    return {
      success: true,
      messageId: result.sid
    };
  } catch (error: any) {
    console.error('Error enviando SMS:', error);
    
    return {
      success: false,
      error: error.message || 'Error desconocido al enviar SMS'
    };
  }
}

// Función específica para confirmación de cita
export async function sendAppointmentConfirmation(
  phone: string, 
  name: string, 
  appointmentTime: string,
  message?: string
): Promise<SMSResult> {
  const timeText = appointmentTime === 'morning' ? 'la mañana (9:00-13:00)' : 'la tarde (14:00-18:00)';
  
  const smsMessage = `¡Hola ${name}! 🚗

✅ Hemos recibido tu solicitud de cita para ${timeText}.

📍 Ubicación: Polígono Carretera Amarilla
📅 Fecha: 19 de septiembre
⏰ Horario: ${timeText}

${message ? `📝 Notas: ${message}` : ''}

Te contactaremos pronto para confirmar la hora exacta.

¡Gracias por elegir KIA! 🎉`;

  return await sendSMS(phone, smsMessage);
}
