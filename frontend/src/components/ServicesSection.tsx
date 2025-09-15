import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  Car, 
  Wrench, 
  CreditCard, 
  Shield, 
  Users, 
  CalendarCheck 
} from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Venta de Vehículos",
    description: "Amplia gama de modelos KIA nuevos con las últimas tecnologías y garantía oficial."
  },
  {
    icon: Wrench,
    title: "Servicio Técnico",
    description: "Taller especializado con técnicos certificados y repuestos originales KIA."
  },
  {
    icon: CreditCard,
    title: "Financiación",
    description: "Opciones de financiación flexibles adaptadas a tus necesidades económicas."
  },
  {
    icon: Shield,
    title: "Garantía Extendida",
    description: "Protege tu inversión con nuestros planes de garantía extendida hasta 7 años."
  },
  {
    icon: Users,
    title: "Test Drive",
    description: "Prueba cualquier modelo de nuestra gama en un recorrido personalizado."
  },
  {
    icon: CalendarCheck,
    title: "Mantenimiento",
    description: "Programa de mantenimiento preventivo para mantener tu KIA en perfecto estado."
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En nuestro nuevo concesionario encontrarás todo lo que necesitas para tu experiencia KIA
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}