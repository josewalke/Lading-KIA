import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import exampleImage from 'figma:asset/8093acad2ccf6921667e53e6943c218bd3e0998e.png';
import logoKiaBlanco from '../assets/logoKiaBlanco.png';
import logoKiaRojo from '../assets/LogoKiaRojo.png';

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
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight text-left mt-[-20px] sm:mt-[-40px] lg:mt-[-100px] mr-[0px] mb-[40px] sm:mb-[60px] lg:mb-[75px] ml-[0px]"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                  Nuevo
                  <br />
                  Concesionario
                  <br />
                  <motion.img 
                    src={logoKiaRojo}
                    alt="KIA"
                    className="inline-block h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                  />
                </motion.h1>
                
                {/* Location */}
                <motion.div 
                  className="flex items-center space-x-2 md:space-x-3 text-lg sm:text-xl lg:text-2xl text-white"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
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
                className="text-base sm:text-lg lg:text-xl text-white leading-relaxed max-w-xl"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
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
              className="lg:col-span-5 space-y-8 md:space-y-12 mt-8 lg:mt-0"
              variants={fadeInRight}
            >
              {/* Stats Cards */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6"
                variants={staggerContainer}
              >
                <motion.div 
                  className="p-6 md:p-8 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 1.6 }}
                  >
                    20+
                  </motion.div>
                  <div className="text-lg sm:text-xl text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Modelos Disponibles</div>
                </motion.div>
                
                <motion.div 
                  className="p-6 md:p-8 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 1.8 }}
                  >
                    5★
                  </motion.div>
                  <div className="text-lg sm:text-xl text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Atención al Cliente</div>
                </motion.div>
              </motion.div>
              
              {/* Special Offer Banner */}
              <motion.div 
                className="bg-gradient-to-r from-red-600/90 to-red-700/90 rounded-xl p-6 md:p-8 border border-red-400/30"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 2.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="text-center space-y-3 md:space-y-4">
                  <motion.div 
                    className="text-2xl sm:text-3xl font-bold text-white"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.4 }}
                  >
                    ¡Venta Secreta!
                  </motion.div>
                  <motion.div 
                    className="text-base sm:text-lg text-white"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.6 }}
                  >
                    Disponible desde el 19 de septiembre
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
          src={logoKiaBlanco} 
          alt="KIA Logo" 
          className="w-12 h-12 md:w-16 md:h-16"
        />
      </motion.div>
      
      {/* Bottom Scroll Indicator */}
      <motion.div 
        className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 3.2 }}
      >
        <motion.div 
          className="flex flex-col items-center space-y-3 md:space-y-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span 
            className="text-base md:text-lg font-semibold text-white px-4 py-2 rounded-full bg-red-600/90 backdrop-blur-sm border border-red-400/30 shadow-lg"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}
          >
            Desliza para más información
          </span>
          <div className="w-8 h-12 md:w-9 md:h-14 border-3 border-white rounded-full flex justify-center bg-red-600/20 backdrop-blur-sm shadow-lg">
            <motion.div 
              className="w-2 h-4 md:h-5 bg-white rounded-full mt-2 md:mt-2.5"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}