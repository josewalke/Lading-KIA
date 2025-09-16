import { useState, useEffect } from "react";
import { CompactLanding } from "./components/CompactLanding";

// Configuración de acceso secreto
const SECRET_ACCESS_KEY = "ventas-secretas-kia-2024";
const SECRET_PARAM = "access";

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Verificar acceso secreto
    const checkSecretAccess = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessKey = urlParams.get(SECRET_PARAM);
      
      // También verificar si está en el hash de la URL
      const hashAccessKey = window.location.hash.replace('#', '');
      
      if (accessKey === SECRET_ACCESS_KEY || hashAccessKey === SECRET_ACCESS_KEY) {
        console.log('🔓 [SECRET-ACCESS] Acceso autorizado a ventas secretas KIA');
        setHasAccess(true);
        
        // Limpiar la URL para ocultar el parámetro secreto
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      } else {
        console.log('🔒 [SECRET-ACCESS] Acceso denegado - URL secreta requerida');
        setHasAccess(false);
      }
      
      setIsChecking(false);
    };

    checkSecretAccess();
  }, []);

  // Mostrar loading mientras verifica
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Mostrar página de acceso denegado
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-6xl mb-4">🔒</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Acceso Restringido</h2>
            <p className="text-gray-300 text-lg mb-6">
              Esta página es exclusiva para clientes invitados a las ventas secretas KIA.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">¿Tienes una invitación?</h3>
            <p className="text-gray-300 text-sm mb-4">
              Si recibiste un SMS o email con un enlace especial, úsalo para acceder a esta página.
            </p>
            <div className="bg-gray-700 rounded p-3 text-left">
              <p className="text-gray-400 text-xs mb-1">Ejemplo de URL válida:</p>
              <code className="text-green-400 text-sm">
                https://kia-sevilla.com/?access=ventas-secretas-kia-2024
              </code>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes acceso? Contacta con nosotros en{" "}
              <a href="tel:+34954123456" className="text-blue-400 hover:text-blue-300">
                +34 954 123 456
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar la página principal si tiene acceso
  return (
    <div className="min-h-screen bg-background">
      <CompactLanding />
    </div>
  );
}