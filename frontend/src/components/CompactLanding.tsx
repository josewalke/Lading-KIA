import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { BenefitsSection } from "./BenefitsSection";
import { ContactForm } from "./ContactForm";
import logoKiaBlanco from '../assets/logoKiaBlanco.png';

export function CompactLanding() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      
      {/* SMS Contact Form Section */}
      <motion.section 
        className="py-12 md:py-16 bg-gradient-to-br from-red-50 to-red-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <BenefitsSection />
              <div className="order-1 lg:order-2">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Footer con Logo KIA */}
      <motion.footer 
        className="bg-gray-900 py-8 md:py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Logo KIA Blanco en el footer */}
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <img 
                src={logoKiaBlanco} 
                alt="KIA Logo" 
                className="h-12 md:h-16 w-auto"
              />
            </motion.div>
            
            <motion.div 
              className="text-white/80 text-sm md:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              <p className="mb-2">Nuevo Concesionario KIA</p>
              <p className="text-white/60 text-xs md:text-sm">
                Polígono Carretera Amarilla • Tecnología avanzada • Diseño innovador
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}