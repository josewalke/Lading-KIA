import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation,
  Car
} from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Visítanos o Contáctanos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte a encontrar tu KIA perfecto. ¡Ven a conocer nuestras instalaciones!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span>Ubicación</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-semibold">Polígono Carretera Amarilla</p>
                <p className="text-muted-foreground">Calle Principal, 123</p>
                <p className="text-muted-foreground">28001 Madrid</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Navigation className="w-4 h-4 mr-2" />
                  Ver en Maps
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span>Horarios</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Lunes - Viernes</span>
                  <span>9:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados</span>
                  <span>10:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos</span>
                  <span>Cerrado</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>Contacto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>900 123 456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@kiacarreteraamarilla.es</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4" />
                  <span>Whatsapp: 666 789 123</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Solicita Información</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" placeholder="Tu teléfono" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interest">¿Qué te interesa?</Label>
                    <select className="w-full p-3 border border-border rounded-md bg-background">
                      <option>Selecciona una opción</option>
                      <option>Comprar un vehículo nuevo</option>
                      <option>Test drive</option>
                      <option>Servicio técnico</option>
                      <option>Financiación</option>
                      <option>Información general</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Cuéntanos qué necesitas..."
                      rows={4}
                    />
                  </div>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Enviar Consulta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}