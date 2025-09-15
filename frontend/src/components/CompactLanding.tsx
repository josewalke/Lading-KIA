import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { BenefitsSection } from "./BenefitsSection";
import { ContactForm } from "./ContactForm";

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
    </motion.div>
  );
}