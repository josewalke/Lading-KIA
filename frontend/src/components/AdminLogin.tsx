import React, { useState, useEffect, useMemo } from 'react';
import { authService } from '../services/authService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Users,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import { API_ENDPOINTS, getEndpointWithSubpath } from '../config/backend';

interface Appointment {
  id: number;
  name: string;
  phone: string;
  email: string;
  appointment_time: string;
  message: string;
  created_at: string;
  leido: boolean; // Normalizado a boolean por el backend
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

export default function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalAppointments: 0,
    morningAppointments: 0,
    afternoonAppointments: 0,
    withEmail: 0,
    withMessage: 0,
    leidas: 0,
    noLeidas: 0,
  });
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  // Check authentication on mount
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

  // Fetch appointments and stats
  const fetchData = async () => {
    setLoading(true);
    try {
      const authHeaders = authService.getAuthHeaders();
      
      // Fetch appointments (backend ahora normaliza leido a boolean)
      const appointmentsResponse = await fetch(API_ENDPOINTS.APPOINTMENTS, {
        headers: authHeaders
      });
      
      if (!appointmentsResponse.ok) {
        throw new Error(`HTTP error! status: ${appointmentsResponse.status}`);
      }
      
      const appointmentsData = await appointmentsResponse.json();
      
      if (appointmentsData.success) {
        // Backend ya ordena por created_at ASC y normaliza leido a boolean
        const sortedAppointments = appointmentsData.appointments.sort((a: Appointment, b: Appointment) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        setAppointments(sortedAppointments);
      } else {
        console.error('Error fetching appointments:', appointmentsData.error);
        toast.error('Error al cargar las citas');
      }

      // Fetch stats (siempre usar endpoint de stats para datos precisos)
      const statsResponse = await fetch(API_ENDPOINTS.STATS, {
        headers: authHeaders
      });
      
      if (!statsResponse.ok) {
        throw new Error(`HTTP error! status: ${statsResponse.status}`);
      }
      
      const statsData = await statsResponse.json();
      
      if (statsData.success) {
        const stats = statsData.stats;
        setStats({
          totalAppointments: stats.totalAppointments,
          morningAppointments: stats.morningAppointments,
          afternoonAppointments: stats.afternoonAppointments,
          withEmail: stats.withEmail,
          withMessage: stats.withMessage,
          leidas: stats.leidas,
          noLeidas: stats.noLeidas,
        });
      } else {
        console.error('Error fetching stats:', statsData.error);
        toast.error('Error al cargar las estadísticas');
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar los datos', {
        description: error.message || 'Error de conexión'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const result = await authService.login(password);
      
      if (result.success) {
        setIsAuthenticated(true);
        toast.success('Acceso autorizado');
        fetchData();
    } else {
        setLoginError(result.error || 'Contraseña incorrecta');
        toast.error(result.error || 'Contraseña incorrecta');
        setPassword('');
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error('Error de conexión');
      setLoginError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setPassword('');
    setAppointments([]);
    setStats({
      totalAppointments: 0,
      morningAppointments: 0,
      afternoonAppointments: 0,
      withEmail: 0,
      withMessage: 0,
      leidas: 0,
      noLeidas: 0,
    });
    toast.success('Sesión cerrada');
  };

  // Toggle read status
  const toggleReadStatus = async (id: number, currentStatus: boolean) => {
    // Optimistic update
    const newStatus = !currentStatus;
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, leido: newStatus } : app
      )
    );

    // Update stats optimistically
    setStats(prev => ({
      ...prev,
      leidas: currentStatus ? prev.leidas - 1 : prev.leidas + 1,
      noLeidas: currentStatus ? prev.noLeidas + 1 : prev.noLeidas - 1,
    }));

    try {
      const authHeaders = authService.getAuthHeaders();
      const response = await fetch(getEndpointWithSubpath('APPOINTMENTS', `${id}/leido`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({ leido: newStatus }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message, { duration: 2000 });
        // Stats are already updated optimistically, no need to recalculate
      } else {
        // Revert on error
        setAppointments(prev =>
          prev.map(app =>
            app.id === id ? { ...app, leido: currentStatus } : app
          )
        );
        setStats(prev => ({
          ...prev,
          leidas: currentStatus ? prev.leidas + 1 : prev.leidas - 1,
          noLeidas: currentStatus ? prev.noLeidas - 1 : prev.noLeidas + 1,
        }));
        toast.error('Error al actualizar el estado', {
          description: result.error,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating read status:', error);
      // Revert on error
      setAppointments(prev =>
        prev.map(app =>
          app.id === id ? { ...app, leido: currentStatus } : app
        )
      );
        setStats(prev => ({
          ...prev,
          leidas: currentStatus ? prev.leidas + 1 : prev.leidas - 1,
          noLeidas: currentStatus ? prev.noLeidas - 1 : prev.noLeidas + 1,
        }));
      toast.error('Error de conexión', {
        description: 'No se pudo actualizar el estado',
        duration: 3000,
      });
    }
  };

  // Toggle expanded appointment
  const toggleExpanded = (id: number) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Filter appointments - leido ahora es siempre boolean
  const filteredAppointments = useMemo(() => {
    switch (readFilter) {
      case 'read':
        return appointments.filter(a => a.leido === true);
      case 'unread':
        return appointments.filter(a => a.leido === false || a.leido === null || a.leido === undefined);
      default:
        return appointments;
    }
  }, [appointments, readFilter]);

  // Calculate filtered stats - leido ahora es siempre boolean
  const filteredStats = useMemo(() => {
    const filtered = filteredAppointments;
    return {
      total: filtered.length,
      morning: filtered.filter(a => a.appointment_time === 'morning').length,
      afternoon: filtered.filter(a => a.appointment_time === 'afternoon').length,
      withEmail: filtered.filter(a => a.email && a.email !== '').length,
      leidas: filtered.filter(a => a.leido === true).length,
      noLeidas: filtered.filter(a => a.leido === false || a.leido === null || a.leido === undefined).length,
    };
  }, [filteredAppointments]);

  // Stat cards configuration - Always show total stats, not filtered
  const statCards = [
    {
      label: 'Total Citas',
      value: stats.totalAppointments,
      helper: 'registradas',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Mañana',
      value: stats.morningAppointments,
      helper: 'citas',
      icon: Sun,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Tarde',
      value: stats.afternoonAppointments,
      helper: 'citas',
      icon: Moon,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Con Email',
      value: stats.withEmail,
      helper: 'contactos',
      icon: Mail,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Leídas',
      value: stats.leidas,
      helper: 'procesadas',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Sin Leer',
      value: stats.noLeidas,
      helper: 'pendientes',
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-400 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="tracking-tight">
              🔐 Acceso Administrativo
            </CardTitle>
            <CardDescription>
              Ingresa tu contraseña para acceder al panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                  placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
              {loginError && (
                <p className="text-red-600 text-sm">{loginError}</p>
              )}
            <Button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  'Acceder'
                )}
            </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-white/90">Dashboard en tiempo real</span>
              </div>
              <h1 className="tracking-tight">Panel Administrativo KIA</h1>
              <p className="text-white/90">
                Gestiona y monitorea todas las solicitudes de citas de test drive
              </p>
              <div className="flex gap-6 mt-4">
                <div>
                  <div className="text-white/80">Citas Totales</div>
                  <div className="tracking-tight">{stats.totalAppointments}</div>
                </div>
                <div>
                  <div className="text-white/80">Pendientes</div>
                  <div className="tracking-tight">{stats.noLeidas}</div>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="secondary"
              className="bg-white text-red-600 hover:bg-white/90 self-start md:self-center"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Filter by Status */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Filtrar por estado</CardTitle>
            <CardDescription>
              Selecciona un estado para filtrar las citas mostradas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
                  <Button
                    variant={readFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setReadFilter('all')}
                className={readFilter === 'all' ? 'bg-red-600 hover:bg-red-700' : ''}
                  >
                Todas
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                  {stats.totalAppointments}
                </span>
                  </Button>
                  <Button
                    variant={readFilter === 'read' ? 'default' : 'outline'}
                    onClick={() => setReadFilter('read')}
                className={readFilter === 'read' ? 'bg-red-600 hover:bg-red-700' : ''}
                  >
                Leídas
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                  {stats.leidas}
                </span>
                  </Button>
                  <Button
                    variant={readFilter === 'unread' ? 'default' : 'outline'}
                    onClick={() => setReadFilter('unread')}
                className={readFilter === 'unread' ? 'bg-red-600 hover:bg-red-700' : ''}
                  >
                Sin leer
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                  {stats.noLeidas ?? 0}
                </span>
                  </Button>
            </div>
            <p className="text-gray-600">
              Mostrando: {filteredStats.total} de {stats.totalAppointments} citas
            </p>
          </CardContent>
        </Card>

        {/* Operational Summary - 6 Metrics */}
        <div className="overflow-x-auto">
          <div className="min-w-[1100px]">
            <div className="grid grid-cols-6 gap-3">
              {statCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Card
                    key={index}
                    className="h-[90px] px-4 py-3 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0 h-full flex items-center justify-between">
                      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                        <p className="text-xs text-gray-500 truncate">
                          {card.label}
                        </p>
                        <p className="tracking-tight text-xl font-semibold">
                          {card.value}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {card.helper}
                        </p>
                  </div>
                      <div className={`${card.bg} p-2 rounded-lg flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardContent>
            </Card>
                );
              })}
                </div>
          </div>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📋</span> Registro de citas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No hay citas para mostrar
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => {
                  const isExpanded = expandedIds.has(appointment.id);
                  const isRead = appointment.leido === true;
                  return (
                    <div
                      key={appointment.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
                    >
                      {/* Red Side Ribbon */}
                      <div className="flex">
                        <div className="w-1 bg-red-600 flex-shrink-0" />
                        <div className="flex-1 p-4">
                          {/* Compact View */}
                          <div className="flex flex-col gap-3">
                            {/* Top row: Name, Tag, Checkbox */}
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-gray-900">
                                {appointment.name}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-3 py-1 rounded-full ${
                                    appointment.appointment_time === 'morning'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-purple-100 text-purple-800'
                                  }`}
                                >
                                  {appointment.appointment_time === 'morning' ? '☀️ Mañana' : '🌙 Tarde'}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    id={`read-${appointment.id}`}
                                    checked={isRead}
                                    onCheckedChange={() =>
                                      toggleReadStatus(appointment.id, appointment.leido)
                                    }
                                  />
                                  <Label
                                    htmlFor={`read-${appointment.id}`}
                                    className="cursor-pointer text-gray-700"
                                  >
                                    Leída
                                  </Label>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0"
                                    onClick={() => toggleExpanded(appointment.id)}
                                  >
                                    {isExpanded ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                        </div>
                      </div>
                    </div>
                            {/* Bottom row: Date, Phone, Email */}
                            <div className="flex flex-wrap items-center gap-3 text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(appointment.created_at).toLocaleDateString('es-ES')}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                <span>{appointment.phone}</span>
                              </div>
                              {appointment.email && (
                                <div className="flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  <span>{appointment.email}</span>
                              </div>
                              )}
                            </div>
                          </div>

                          {/* Expanded View */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="grid md:grid-cols-2 gap-6">
                                {/* Contact Column */}
                                <div className="space-y-3">
                                  <h4 className="text-gray-900">Información de contacto</h4>
                                  <div className="space-y-2 text-gray-700">
                                    <div className="flex items-start gap-2">
                                      <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <div className="text-gray-500">Nombre</div>
                                        <div>{appointment.name}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <div className="text-gray-500">Teléfono</div>
                                        <div>{appointment.phone}</div>
                                      </div>
                                    </div>
                                    {appointment.email && (
                                      <div className="flex items-start gap-2">
                                        <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <div className="text-gray-500">Email</div>
                                          <div>{appointment.email}</div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Details Column */}
                          <div className="space-y-3">
                                  <h4 className="text-gray-900">Detalles de la cita</h4>
                                  <div className="space-y-2 text-gray-700">
                                    <div className="flex items-start gap-2">
                                      <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <div className="text-gray-500">Fecha de registro</div>
                                        <div>{new Date(appointment.created_at).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <div className="text-gray-500">Horario preferido</div>
                                        <div className="capitalize">{appointment.appointment_time === 'morning' ? 'Mañana' : 'Tarde'}</div>
                                      </div>
                              </div>
                                    <div className="flex items-start gap-2">
                                      <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <div className="text-gray-500">Registrada</div>
                                        <div>{new Date(appointment.created_at).toLocaleString('es-ES')}</div>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>

                              {/* Message Timeline */}
                        {appointment.message && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <h4 className="text-gray-900 mb-2">Mensaje del cliente</h4>
                                  <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-700">{appointment.message}</p>
                            </div>
                          </div>
                        )}

                              {/* Status Section */}
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      id={`read-expanded-${appointment.id}`}
                                      checked={isRead}
                                      onCheckedChange={() =>
                                        toggleReadStatus(appointment.id, appointment.leido)
                                      }
                                    />
                                    <Label
                                      htmlFor={`read-expanded-${appointment.id}`}
                                      className="cursor-pointer"
                                    >
                                      Marcar como {isRead ? 'no leída' : 'leída'}
                                    </Label>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full ${
                                      isRead
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                  >
                                    {isRead ? '✓ Procesada' : '⏳ Pendiente'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                      </div>
                  </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
