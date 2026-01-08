export enum TicketStatus {
  OPEN = 'Abierto',
  IN_PROGRESS = 'En progreso',
  RESOLVED = 'Resuelto',
  CLOSED = 'Cerrado'
}

export enum TicketPriority {
  LOW = 'Baja',
  MEDIUM = 'Media',
  HIGH = 'Alta',
  CRITICAL = 'Crítica'
}

export enum TicketCategory {
  IT_HARDWARE = 'IT/Hardware',
  IT_SOFTWARE = 'IT/Software',
  FACILITIES = 'Instalaciones',
  HR = 'RRHH',
  OTHER = 'Otros'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  ticketId: string;
  user: User;
  content: string;
  createdAt: Date;
}

export interface TimelineEvent {
  id: string;
  ticketId: string;
  type: 'created' | 'status_changed' | 'comment_added' | 'assigned' | 'priority_changed';
  description: string;
  user: User;
  timestamp: Date;
  metadata?: any;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdBy: User;
  assignedTo?: User;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  timeline: TimelineEvent[];
}

export interface CreateTicketDto {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
}

export interface CommentDto {
  content: string;
}

export interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  closedTickets: number;
}
