import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import exampleImage from 'figma:asset/8093acad2ccf6921667e53e6943c218bd3e0998e.png';
import logoBlanco from '../assets/LogoBlanco.jpeg';
import logoRojo from '../assets/LogoRojo.jpeg';

export function HeroSection() {
  // Animaciones profesionales
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${exampleImage})`
      }}
    >
      
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-8 relative z-10">
          {/* Main Content Grid */}
          <motion.div 
            className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[80vh]"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-7 space-y-4 md:space-y-6"
              variants={fadeInLeft}
            >
              {/* Main Title */}
              <motion.div className="space-y-3 md:space-y-4">
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight text-left mt-[-20px] sm:mt-[-40px] lg:mt-[-100px] mr-[0px] mb-[40px] sm:mb-[60px] lg:mb-[75px] ml-[0px] drop-shadow-2xl"
                  style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                  Nuevo
                  <br />
                  Concesionario
                  <br />
                  <motion.span 
                    className="text-red-500"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                  >
                    KIA
                  </motion.span>
                </motion.h1>
                
                {/* Location */}
                <motion.div 
                  className="flex items-center space-x-2 md:space-x-3 text-lg sm:text-xl lg:text-2xl text-white drop-shadow-lg"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                >
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                  <span>Polígono Carretera Amarilla</span>
                </motion.div>
              </motion.div>
              
              {/* Description */}
              <motion.p 
                className="text-base sm:text-lg lg:text-xl text-white leading-relaxed max-w-xl drop-shadow-lg"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
              >
                Descubre la nueva era de la movilidad. Tecnología avanzada, 
                diseño innovador y la mejor atención al cliente.
              </motion.p>
            </motion.div>
          
            {/* Right Content - Stats & Features */}
            <motion.div 
              className="lg:col-span-5 space-y-6 md:space-y-8 mt-8 lg:mt-0"
              variants={fadeInRight}
            >
              {/* Stats Cards */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4"
                variants={staggerContainer}
              >
                <motion.div 
                  className="p-4 md:p-6 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 1.6 }}
                  >
                    20+
                  </motion.div>
                  <div className="text-sm sm:text-base text-white drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>Modelos Disponibles</div>
                </motion.div>
                
                <motion.div 
                  className="p-4 md:p-6 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 1.8 }}
                  >
                    5★
                  </motion.div>
                  <div className="text-sm sm:text-base text-white drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>Atención al Cliente</div>
                </motion.div>
                
                <motion.div 
                  className="p-4 md:p-6 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 2.0 }}
                  >
                    0%
                  </motion.div>
                  <div className="text-sm sm:text-base text-white drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>Financiación Especial</div>
                </motion.div>
              </motion.div>
              
              {/* Special Offer Banner */}
              <motion.div 
                className="bg-gradient-to-r from-red-600/90 to-red-700/90 rounded-xl p-4 md:p-6 border border-red-400/30"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 2.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="text-center space-y-2 md:space-y-3">
                  <motion.div 
                    className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.4 }}
                  >
                    ¡Oferta de Inauguración!
                  </motion.div>
                  <motion.div 
                    className="text-sm sm:text-base text-white drop-shadow-md"
                    style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.6 }}
                  >
                    Descuentos exclusivos hasta el 30%
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm text-white drop-shadow-sm"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.8 }}
                  >
                    * Válido hasta fin de mes
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
      </div>
      
      {/* Floating KIA Logo */}
      <motion.div 
        className="absolute top-4 right-4 md:top-6 md:right-6 bg-red-600 rounded-full p-3 md:p-4 shadow-lg"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 3.0 }}
        whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
      >
        <img 
          src={logoBlanco} 
          alt="KIA Logo" 
          className="w-12 h-12 md:w-16 md:h-16"
        />
      </motion.div>
      
      {/* Bottom Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 3.2 }}
      >
        <motion.div 
          className="flex flex-col items-center space-y-1 md:space-y-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs md:text-sm">Desliza para más información</span>
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 md:h-3 bg-white/60 rounded-full mt-1 md:mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}