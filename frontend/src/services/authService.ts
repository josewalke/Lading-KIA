import { API_ENDPOINTS } from '../config/backend';

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    username: string;
    role: string;
  };
  expiresIn?: string;
  error?: string;
}

export interface User {
  username: string;
  role: string;
  loginTime: string;
}

class AuthService {
  private token: string | null = null;
  private user: User | null = null;

  constructor() {
    // Cargar token del localStorage al inicializar
    this.token = localStorage.getItem('admin_token');
    this.loadUserFromToken();
  }

  // Login con contraseña
  async login(password: string): Promise<AuthResponse> {
    try {
      console.log('🔐 [AUTH] Iniciando login...');
      
      const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data: AuthResponse = await response.json();
      
      if (data.success && data.token) {
        console.log('✅ [AUTH] Login exitoso');
        this.token = data.token;
        this.user = data.user as User;
        
        // Guardar en localStorage
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        
        return data;
      } else {
        console.log('❌ [AUTH] Login fallido:', data.error);
        return data;
      }
    } catch (error) {
      console.error('💥 [AUTH] Error crítico en login:', error);
      return {
        success: false,
        error: 'Error de conexión con el servidor'
      };
    }
  }

  // Verificar token
  async verifyToken(): Promise<boolean> {
    if (!this.token) {
      return false;
    }

    try {
      console.log('🔍 [AUTH] Verificando token...');
      
      const response = await fetch(API_ENDPOINTS.AUTH_VERIFY, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ [AUTH] Token válido');
        this.user = data.user;
        return true;
      } else {
        console.log('❌ [AUTH] Token inválido');
        this.logout();
        return false;
      }
    } catch (error) {
      console.error('💥 [AUTH] Error verificando token:', error);
      this.logout();
      return false;
    }
  }

  // Logout
  logout(): void {
    console.log('🚪 [AUTH] Cerrando sesión');
    this.token = null;
    this.user = null;
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  // Obtener token
  getToken(): string | null {
    return this.token;
  }

  // Obtener usuario
  getUser(): User | null {
    return this.user;
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return this.token !== null && this.user !== null;
  }

  // Cargar usuario desde token almacenado
  private loadUserFromToken(): void {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.logout();
      }
    }
  }

  // Obtener headers de autorización
  getAuthHeaders(): Record<string, string> {
    if (!this.token) {
      return {};
    }
    
    return {
      'Authorization': `Bearer ${this.token}`,
    };
  }
}

// Instancia singleton
export const authService = new AuthService();
export default authService;
