import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { MessageSquare, Gift, Shield } from "lucide-react";

export function BenefitsSection() {
  // Animaciones profesionales simplificadas
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <motion.div 
      className="space-y-8 order-2 lg:order-1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header simplificado */}
      <motion.div 
        className="text-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Badge className="bg-red-100 text-red-800 mb-4 text-sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Solicita Información
          </Badge>
        </motion.div>
        
        <motion.h2 
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          ¿Listo para tu nuevo KIA?
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        >
          Completa el formulario y recibe información personalizada por SMS.
        </motion.p>
      </motion.div>

      {/* Beneficios simplificados */}
      <motion.div 
        className="space-y-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={fadeInUp}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <motion.div 
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
          >
            <Gift className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Ofertas Exclusivas</h3>
            <p className="text-gray-600">Descuentos hasta 30% de inauguración</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={fadeInUp}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <motion.div 
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
          >
            <Shield className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Sin Compromiso</h3>
            <p className="text-gray-600">100% gratuito, sin obligaciones</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Call to action simplificado */}
      <motion.div 
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <motion.div 
          className="text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <h3 className="text-xl font-bold mb-2">¡Es así de fácil!</h3>
          <p className="text-red-100">Rellena el formulario → Recibe SMS → Ven cuando quieras</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
