import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { API_ENDPOINTS } from '../config/backend';
import { saveAppointment } from '../services/smsService';

interface FormData {
  name: string;
  phone: string;
  email: string;
  appointmentTime: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    appointmentTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animaciones profesionales para el formulario
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Manejo especial para el campo de teléfono
    if (name === 'phone') {
      let formattedValue = value;
      
      // Remover todos los caracteres no numéricos excepto + al inicio
      formattedValue = formattedValue.replace(/[^\d+]/g, '');
      
      // Si empieza con +34, mantenerlo
      if (formattedValue.startsWith('+34')) {
        // Limitar a +34 + 9 dígitos máximo
        if (formattedValue.length > 12) {
          formattedValue = formattedValue.substring(0, 12);
        }
      }
      // Si empieza con 34, agregar +
      else if (formattedValue.startsWith('34')) {
        formattedValue = '+' + formattedValue;
        if (formattedValue.length > 12) {
          formattedValue = formattedValue.substring(0, 12);
        }
      }
      // Si empieza con 6, 7, 8, 9 (números españoles), agregar +34
      else if (/^[6789]/.test(formattedValue)) {
        formattedValue = '+34' + formattedValue;
        if (formattedValue.length > 12) {
          formattedValue = formattedValue.substring(0, 12);
        }
      }
      // Si empieza con + pero no es +34, mantener solo el +
      else if (formattedValue.startsWith('+') && !formattedValue.startsWith('+34')) {
        // Permitir otros códigos de país
        if (formattedValue.length > 15) {
          formattedValue = formattedValue.substring(0, 15);
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 [FRONTEND] Iniciando envío de formulario:', {
      timestamp: new Date().toISOString(),
      formData: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        appointmentTime: formData.appointmentTime,
        message: formData.message
      }
    });
    
    if (!formData.name || !formData.phone || !formData.appointmentTime) {
      console.warn('⚠️ [FRONTEND] Validación fallida: campos requeridos faltantes');
      toast.error("Por favor completa tu nombre, teléfono y horario preferido");
      return;
    }

    // Validar formato de teléfono
    const phoneRegex = /^(\+34|0034|34)?[6|7|8|9][0-9]{8}$/;
    const cleanPhone = formData.phone.replace(/\s/g, '');
    
    console.log('📞 [FRONTEND] Validando teléfono:', {
      original: formData.phone,
      cleaned: cleanPhone,
      isValid: phoneRegex.test(cleanPhone)
    });
    
    if (!phoneRegex.test(cleanPhone)) {
      console.error('❌ [FRONTEND] Teléfono inválido:', cleanPhone);
      toast.error("Por favor introduce un número de teléfono español válido (ej: 666123456)");
      return;
    }

    setIsSubmitting(true);
    console.log('🔄 [FRONTEND] Iniciando proceso de envío...');
    
    try {
      // Formatear número de teléfono para España
      let formattedPhone = cleanPhone;
      if (formattedPhone.startsWith('6') || formattedPhone.startsWith('7') || formattedPhone.startsWith('8') || formattedPhone.startsWith('9')) {
        formattedPhone = '+34' + formattedPhone;
      } else if (formattedPhone.startsWith('0034')) {
        formattedPhone = '+' + formattedPhone.substring(2);
      } else if (formattedPhone.startsWith('34')) {
        formattedPhone = '+' + formattedPhone;
      }

      console.log('📱 [FRONTEND] Teléfono formateado:', {
        original: formData.phone,
        cleaned: cleanPhone,
        formatted: formattedPhone
      });

      console.log('🚀 [FRONTEND] Enviando solicitud al backend:', {
        url: API_ENDPOINTS.APPOINTMENT,
        payload: {
          name: formData.name,
          phone: formattedPhone,
          email: formData.email,
          appointmentTime: formData.appointmentTime,
          message: formData.message
        }
      });

      // Guardar cita en el backend (solo BD, sin SMS)
      const appointmentResult = await saveAppointment(
        formattedPhone,
        formData.name,
        formData.appointmentTime,
        formData.message,
        formData.email
      );

      console.log('📨 [FRONTEND] Respuesta del backend:', appointmentResult);

      if (appointmentResult.success) {
        console.log('✅ [FRONTEND] Cita guardada exitosamente:', {
          appointmentId: appointmentResult.appointmentId,
          phone: appointmentResult.phone
        });
        
        toast.success("¡Cita reservada correctamente! ✅", {
          description: `Cita #${appointmentResult.appointmentId} guardada. Te contactaremos pronto.`,
          duration: 6000,
        });
        
        console.log('🔄 [FRONTEND] Reseteando formulario...');
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          appointmentTime: '',
          message: ''
        });
        
        console.log('✅ [FRONTEND] Formulario reseteado y proceso completado');
      } else {
        console.error('❌ [FRONTEND] Error en la solicitud:', appointmentResult.error);
        toast.error("Error al guardar la cita", {
          description: appointmentResult.error || "Inténtalo de nuevo o contacta directamente por teléfono",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('💥 [FRONTEND] Error crítico en el formulario:', {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      toast.error("Error al procesar la solicitud", {
        description: "Por favor inténtalo de nuevo o contacta directamente",
        duration: 5000,
      });
    }
    
    console.log('🏁 [FRONTEND] Finalizando proceso de envío');
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="shadow-lg border-red-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <CardHeader className="text-center bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center space-x-2 text-lg md:text-xl">
              <motion.div
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                <MessageSquare className="w-5 h-5" />
              </motion.div>
              <span>Reserva tu Cita</span>
            </CardTitle>
            <p className="text-sm opacity-90">
              Elige tu horario preferido para visitarnos
            </p>
          </CardHeader>
        </motion.div>
        
        <CardContent className="p-4 md:p-6">
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="name">Nombre completo *</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="text-base"
                  required
                />
              </motion.div>
            </motion.div>
            
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="phone">Teléfono móvil *</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="666123456"
                    className="text-base pr-20"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                    {formData.phone ? (
                      formData.phone.startsWith('+34') ? '✅' : '⚠️'
                    ) : (
                      '📱'
                    )}
                  </div>
                </div>
                {formData.phone && !formData.phone.startsWith('+34') && (
                  <p className="text-xs text-amber-600 mt-1">
                    💡 Se añadirá automáticamente +34 si es un número español
                  </p>
                )}
              </motion.div>
            </motion.div>
            
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="email">Email (opcional)</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="text-base"
                />
              </motion.div>
            </motion.div>
            
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="appointmentTime">¿Cuándo prefieres venir? *</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <select 
                  id="appointmentTime"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-md bg-background text-base"
                  required
                >
                  <option value="">Selecciona tu horario preferido</option>
                  <option value="morning">Por la mañana (9:00 - 13:00)</option>
                  <option value="afternoon">Por la tarde (14:00 - 18:00)</option>
                </select>
              </motion.div>
            </motion.div>
            
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="message">¿Qué te interesa ver? (opcional)</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="¿Qué modelo te gusta? ¿Test drive? ¿Financiación?..."
                  rows={3}
                  className="text-base"
                />
              </motion.div>
            </motion.div>
            
            <motion.div variants={scaleIn}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-base md:text-lg py-4 md:py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      Enviando solicitud...
                    </motion.div>
                  ) : (
                    <>
                      Reservar mi Cita
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send className="w-4 h-4 ml-2" />
                      </motion.div>
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-xs text-muted-foreground text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              100% gratuito • Sin compromiso • Confirmación por SMS
            </motion.p>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
