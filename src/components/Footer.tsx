import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 text-white px-3 py-1 rounded-md">
                <span className="font-bold">KIA</span>
              </div>
              <span className="font-semibold">Carretera Amarilla</span>
            </div>
            <p className="text-sm opacity-80">
              Tu nuevo concesionario oficial KIA en el Polígono Carretera Amarilla. 
              Calidad, innovación y servicio excepcional.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer" />
              <Instagram className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer" />
              <Youtube className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer" />
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Servicios</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Venta de vehículos nuevos</li>
              <li>Servicio técnico oficial</li>
              <li>Recambios originales</li>
              <li>Financiación</li>
              <li>Seguros</li>
              <li>Garantía extendida</li>
            </ul>
          </div>
          
          {/* Models */}
          <div className="space-y-4">
            <h3 className="font-semibold">Modelos KIA</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Picanto</li>
              <li>Rio</li>
              <li>Ceed</li>
              <li>Xceed</li>
              <li>Sportage</li>
              <li>Sorento</li>
              <li>EV6 (Eléctrico)</li>
              <li>Niro Hybrid</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Polígono Carretera Amarilla</div>
                  <div className="opacity-80">Calle Principal, 123</div>
                  <div className="opacity-80">28001 Madrid</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>900 123 456</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@kiacarreteraamarilla.es</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
          <p>&copy; 2024 KIA Carretera Amarilla. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}