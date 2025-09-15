import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Award, Clock, MapPin } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                Sobre Nosotros
              </Badge>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Tu Nuevo Concesionario KIA en Carretera Amarilla
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nos enorgullece abrir las puertas de nuestro nuevo concesionario en el 
                Polígono Carretera Amarilla. Con instalaciones de última generación y un 
                equipo de profesionales altamente cualificados, estamos preparados para 
                ofrecerte la mejor experiencia KIA.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Instalaciones Modernas</h3>
                  <p className="text-muted-foreground">
                    Más de 2,000 m² de exposición y taller equipado con la última tecnología
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Equipo Especializado</h3>
                  <p className="text-muted-foreground">
                    Técnicos certificados por KIA con años de experiencia en la marca
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Ubicación Estratégica</h3>
                  <p className="text-muted-foreground">
                    Fácil acceso desde toda la zona metropolitana con amplio aparcamiento
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6">
              <CardContent className="space-y-2">
                <Award className="w-10 h-10 text-red-600 mx-auto" />
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Años de experiencia</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="space-y-2">
                <Clock className="w-10 h-10 text-red-600 mx-auto" />
                <div className="text-3xl font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Asistencia en carretera</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="space-y-2">
                <MapPin className="w-10 h-10 text-red-600 mx-auto" />
                <div className="text-3xl font-bold text-primary">5km</div>
                <div className="text-sm text-muted-foreground">Radio de recogida</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="space-y-2">
                <CheckCircle className="w-10 h-10 text-red-600 mx-auto" />
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Satisfacción cliente</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}