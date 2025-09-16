import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, User, Phone, Mail, Clock, MessageSquare, Calendar } from 'lucide-react';
import { API_ENDPOINTS, getEndpointWithSubpath } from '../config/backend';
import authService from '../services/authService';

interface Appointment {
  id: number;
  name: string;
  phone: string;
  email: string;
  appointment_time: string;
  message: string;
  created_at: string;
  leido: number; // 0 = no leído, 1 = leído
}

interface Stats {
  totalAppointments: number;
  morningAppointments: number;
  afternoonAppointments: number;
  withEmail: number;
  withMessage: number;
  leidas: number;
  noLeidas: number;
}

const AdminLogin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        const isValid = await authService.verifyToken();
        if (isValid) {
          setIsAuthenticated(true);
          fetchData();
        } else {
          authService.logout();
          setIsAuthenticated(false);
        }
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async () => {
    if (!password.trim()) {
      toast.error('Por favor ingresa la contraseña');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.login(password);
      
      if (result.success) {
        setIsAuthenticated(true);
        toast.success('Acceso autorizado');
        fetchData();
      } else {
        toast.error(result.error || 'Contraseña incorrecta');
        setPassword('');
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setAppointments([]);
    setStats(null);
    setExpandedRows(new Set());
    toast.success('Sesión cerrada');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const authHeaders = authService.getAuthHeaders();
      
      // Fetch appointments
      const appointmentsResponse = await fetch(API_ENDPOINTS.APPOINTMENTS, {
        headers: authHeaders
      });
      const appointmentsData = await appointmentsResponse.json();
      
      if (appointmentsData.success) {
        // Ordenar del más viejo al más nuevo
        const sortedAppointments = appointmentsData.appointments.sort((a: Appointment, b: Appointment) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        setAppointments(sortedAppointments);
        console.log('🔍 [FRONTEND] Primeros 3 registros (ORDENADOS):', sortedAppointments.slice(0, 3).map(a => ({id: a.id, name: a.name, date: a.created_at})));
      } else {
        console.error('Error fetching appointments:', appointmentsData.error);
        toast.error('Error al cargar las citas');
      }

      // Fetch stats
      const statsResponse = await fetch(API_ENDPOINTS.STATS, {
        headers: authHeaders
      });
      const statsData = await statsResponse.json();
      
      if (statsData.success) {
        setStats(statsData.stats);
      } else {
        console.error('Error fetching stats:', statsData.error);
        toast.error('Error al cargar las estadísticas');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES');
  };

  const formatPhone = (phone: string) => {
    return phone.startsWith('+34') ? phone : `+34${phone}`;
  };

  const toggleRowExpansion = (appointmentId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(appointmentId)) {
      newExpandedRows.delete(appointmentId);
    } else {
      newExpandedRows.add(appointmentId);
    }
    setExpandedRows(newExpandedRows);
  };

  const toggleReadStatus = async (appointmentId: number, currentStatus: number) => {
    console.log('🔄 [FRONTEND] Cambiando estado de leído:', {
      appointmentId,
      currentStatus,
      newStatus: currentStatus === 1 ? 0 : 1
    });

    // Actualización optimista - cambiar el estado inmediatamente
    const newStatus = currentStatus === 1 ? 0 : 1;
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, leido: newStatus }
          : appointment
      )
    );

    try {
      console.log('📡 [FRONTEND] Enviando petición al backend:', {
        url: getEndpointWithSubpath('APPOINTMENTS', `${appointmentId}/leido`),
        method: 'PUT',
        body: { leido: newStatus === 1 }
      });

      const authHeaders = authService.getAuthHeaders();
      const response = await fetch(getEndpointWithSubpath('APPOINTMENTS', `${appointmentId}/leido`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({ leido: newStatus === 1 }),
      });

      console.log('📨 [FRONTEND] Respuesta del backend:', {
        status: response.status,
        ok: response.ok
      });

      const result = await response.json();
      console.log('📋 [FRONTEND] Datos de respuesta:', result);

      if (result.success) {
        console.log('✅ [FRONTEND] Estado actualizado exitosamente en backend');
        toast.success(result.message, {
          duration: 2000,
        });
      } else {
        console.error('❌ [FRONTEND] Error en la respuesta:', result.error);
        // Revertir el cambio si hay error
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.id === appointmentId
              ? { ...appointment, leido: currentStatus }
              : appointment
          )
        );
        toast.error('Error al actualizar el estado', {
          description: result.error,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('💥 [FRONTEND] Error crítico:', error);
      // Revertir el cambio si hay error
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === appointmentId
            ? { ...appointment, leido: currentStatus }
            : appointment
        )
      );
      toast.error('Error de conexión', {
        description: 'No se pudo actualizar el estado',
        duration: 3000,
      });
    }
  };

  // Función para filtrar citas según el estado de leído
  const getFilteredAppointments = () => {
    switch (readFilter) {
      case 'read':
        return appointments.filter(appointment => appointment.leido === 1);
      case 'unread':
        return appointments.filter(appointment => appointment.leido === 0);
      default:
        return appointments;
    }
  };

  // Función para obtener estadísticas filtradas
  const getFilteredStats = () => {
    const filteredAppointments = getFilteredAppointments();
    return {
      total: filteredAppointments.length,
      leidas: filteredAppointments.filter(a => a.leido === 1).length,
      noLeidas: filteredAppointments.filter(a => a.leido === 0).length,
      morning: filteredAppointments.filter(a => a.appointment_time === 'morning').length,
      afternoon: filteredAppointments.filter(a => a.appointment_time === 'afternoon').length,
      withEmail: filteredAppointments.filter(a => a.email && a.email !== '').length,
      withMessage: filteredAppointments.filter(a => a.message && a.message !== '').length
    };
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">
              🔐 Acceso Administrativo
            </CardTitle>
            <p className="text-gray-600">
              Acceso restringido - Solo personal autorizado
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Verificando...' : 'Acceder'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📊 Panel Administrativo KIA
              </h1>
              <p className="text-gray-600 mt-2">
                Resultados del formulario de ventas secretas
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Filtro de Estado de Lectura */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Label className="text-sm font-medium text-gray-700">Filtrar por estado:</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={readFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReadFilter('all')}
                    className={readFilter === 'all' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                  >
                    Todas ({appointments.length})
                  </Button>
                  <Button
                    variant={readFilter === 'read' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReadFilter('read')}
                    className={readFilter === 'read' ? 'bg-green-600 hover:bg-green-700 text-white' : 'text-green-600 border-green-300 hover:bg-green-50'}
                  >
                    👁️ Leídas ({appointments.filter(a => a.leido === 1).length})
                  </Button>
                  <Button
                    variant={readFilter === 'unread' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReadFilter('unread')}
                    className={readFilter === 'unread' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'text-orange-600 border-orange-300 hover:bg-orange-50'}
                  >
                    📋 Sin leer ({appointments.filter(a => a.leido === 0).length})
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Mostrando: {getFilteredAppointments().length} de {appointments.length} citas
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Citas</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredStats().total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">🌅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Citas Mañana</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredStats().morning}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-2xl">🌆</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Citas Tarde</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredStats().afternoon}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Con Email</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredStats().withEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Leídas</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredStats().leidas}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Sin Leer</p>
                    <p className="text-2xl font-bold text-gray-900">{getFilteredStats().noLeidas}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Registros de Citas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Cargando datos...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {getFilteredAppointments().map((appointment) => (
                  <div key={appointment.id} className="bg-white border rounded-lg overflow-hidden">
                    {/* Fila principal - Solo nombre */}
                    <div 
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => toggleRowExpansion(appointment.id)}
                        >
                          <User className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="font-medium text-lg">{appointment.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {/* Checkbox de estado de leído - separado del área clickeable */}
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={appointment.leido === 1}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleReadStatus(appointment.id, appointment.leido);
                            }}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                            title={appointment.leido === 1 ? "Marcado como leída - Click para desmarcar" : "Sin leer - Click para marcar como leída"}
                          />
                          <span className="ml-2 text-xs text-gray-500">
                            {appointment.leido === 1 ? "Leída" : "Sin leer"}
                          </span>
                        </div>
                        {/* Icono de dropdown */}
                        <div className="cursor-pointer" onClick={() => toggleRowExpansion(appointment.id)}>
                          {expandedRows.has(appointment.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dropdown con información detallada */}
                    {expandedRows.has(appointment.id) && (
                      <div className="border-t bg-gray-50 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Información de contacto */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              Información de Contacto
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-20">Nombre:</span>
                                <span className="text-gray-900">{appointment.name}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-20">Teléfono:</span>
                                <span className="text-gray-900 font-mono">{formatPhone(appointment.phone)}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-20">Email:</span>
                                <span className="text-gray-900">{appointment.email || 'No proporcionado'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Información de la cita */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              Detalles de la Cita
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-20">Horario:</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  appointment.appointment_time === 'morning' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {appointment.appointment_time === 'morning' ? '🌅 Mañana' : '🌆 Tarde'}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-20">Fecha:</span>
                                <span className="text-gray-900">{formatDate(appointment.created_at)}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-20">ID:</span>
                                <span className="text-gray-900 font-mono">#{appointment.id}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mensaje completo */}
                        {appointment.message && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Mensaje Completo
                            </h4>
                            <div className="bg-white p-3 rounded-lg border text-sm text-gray-700">
                              {appointment.message}
                            </div>
                          </div>
                        )}

                        {/* Estado de leído */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700 mr-2">Estado:</span>
                            <input
                              type="checkbox"
                              checked={appointment.leido === 1}
                              onChange={(e) => {
                                e.stopPropagation();
                                toggleReadStatus(appointment.id, appointment.leido);
                              }}
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                              title={appointment.leido === 1 ? "Marcado como leída - Click para desmarcar" : "Sin leer - Click para marcar como leída"}
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {appointment.leido === 1 ? "Leída" : "Sin leer"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {getFilteredAppointments().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {readFilter === 'all' 
                      ? 'No hay citas registradas'
                      : readFilter === 'read'
                      ? 'No hay citas leídas'
                      : 'No hay citas sin leer'
                    }
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
