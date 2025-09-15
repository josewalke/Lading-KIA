import { Button } from "./ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md">
                <span className="font-semibold">KIA</span>
              </div>
              <span className="text-lg">Carretera Amarilla</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Polígono Carretera Amarilla</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>900 123 456</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Lun-Sáb 9:00-20:00</span>
            </div>
          </div>
          
          <Button>
            Contáctanos
          </Button>
        </div>
      </div>
    </header>
  );
}