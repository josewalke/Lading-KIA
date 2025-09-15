import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface FormData {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    interest: '',
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Por favor completa al menos tu nombre y teléfono");
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío de SMS
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("¡SMS enviado correctamente! Te contactaremos pronto", {
      description: `Hemos enviado un SMS a ${formData.phone} con la información solicitada`,
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      interest: '',
      message: ''
    });
    
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
              <span>Solicita Información</span>
            </CardTitle>
            <p className="text-sm opacity-90">
              Te enviamos toda la información por SMS
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
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="666 123 456"
                  className="text-base"
                  required
                />
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
              <Label htmlFor="interest">¿Qué información necesitas? *</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <select 
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-md bg-background text-base"
                  required
                >
                  <option value="">Selecciona qué te interesa</option>
                  <option value="precios">Precios y modelos disponibles</option>
                  <option value="financiacion">Opciones de financiación</option>
                  <option value="testdrive">Agendar test drive</option>
                  <option value="intercambio">Intercambio de vehículo</option>
                  <option value="inauguracion">Ofertas de inauguración</option>
                  <option value="mantenimiento">Servicio técnico</option>
                </select>
              </motion.div>
            </motion.div>
            
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Label htmlFor="message">Cuéntanos más (opcional)</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="¿Qué modelo te gusta? ¿Tienes coche para intercambio?..."
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
                      Recibir información por SMS
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
              100% gratuito • Sin compromiso • Respuesta garantizada
            </motion.p>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
