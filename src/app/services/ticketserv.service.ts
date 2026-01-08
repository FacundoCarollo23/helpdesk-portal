import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { Ticket, CreateTicketDto, CommentDto, DashboardStats, TicketStatus, Comment, TimelineEvent } from '../models/ticket.model';
import { MOCK_TICKETS, MOCK_USER } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class TicketservService {
  private tickets: Ticket[] = [];
  private readonly STORAGE_KEY = 'helpdesk_tickets';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadTickets();
  }

  private loadTickets(): void {
    if (!this.isBrowser) {
      this.tickets = JSON.parse(JSON.stringify(MOCK_TICKETS), this.dateReviver);
      return;
    }

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.tickets = JSON.parse(stored, this.dateReviver);
    } else {
      this.tickets = JSON.parse(JSON.stringify(MOCK_TICKETS), this.dateReviver);
      this.saveTickets();
    }
  }

  private saveTickets(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tickets));
    }
  }

  private dateReviver(key: string, value: any): any {
    const dateFields = ['createdAt', 'updatedAt', 'timestamp'];
    if (dateFields.includes(key) && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  }

  private simulateDelay(): number {
    return Math.floor(Math.random() * (800 - 300 + 1)) + 300;
  }

  getAllTickets(): Observable<Ticket[]> {
    return of([...this.tickets]).pipe(
      delay(this.simulateDelay()),
      catchError(error => {
        console.error('Error al obtener tickets:', error);
        return throwError(() => new Error('No se pudieron cargar los tickets'));
      })
    );
  }

  getTicketById(id: string): Observable<Ticket | undefined> {
    const ticket = this.tickets.find(t => t.id === id);
    return of(ticket ? { ...ticket } : undefined).pipe(
      delay(this.simulateDelay()),
      catchError(error => {
        console.error('Error al obtener ticket:', error);
        return throwError(() => new Error('No se pudo cargar el ticket'));
      })
    );
  }

  createTicket(dto: CreateTicketDto): Observable<Ticket> {
    const newId = `TKT-${String(this.tickets.length + 1).padStart(3, '0')}`;
    const now = new Date();

    const newTicket: Ticket = {
      id: newId,
      title: dto.title,
      description: dto.description,
      category: dto.category,
      priority: dto.priority,
      status: TicketStatus.OPEN,
      createdBy: MOCK_USER,
      createdAt: now,
      updatedAt: now,
      comments: [],
      timeline: [
        {
          id: `TL-${Date.now()}`,
          ticketId: newId,
          type: 'created',
          description: 'Ticket creado',
          user: MOCK_USER,
          timestamp: now
        }
      ]
    };

    this.tickets.unshift(newTicket);
    this.saveTickets();

    return of({ ...newTicket }).pipe(
      delay(this.simulateDelay()),
      catchError(error => {
        console.error('Error al crear ticket:', error);
        return throwError(() => new Error('No se pudo crear el ticket'));
      })
    );
  }

  addComment(ticketId: string, dto: CommentDto): Observable<Comment> {
    const ticket = this.tickets.find(t => t.id === ticketId);

    if (!ticket) {
      return throwError(() => new Error('Ticket no encontrado'));
    }

    const newComment: Comment = {
      id: `CMT-${Date.now()}`,
      ticketId: ticketId,
      user: MOCK_USER,
      content: dto.content,
      createdAt: new Date()
    };

    const timelineEvent: TimelineEvent = {
      id: `TL-${Date.now()}`,
      ticketId: ticketId,
      type: 'comment_added',
      description: 'Nuevo comentario añadido',
      user: MOCK_USER,
      timestamp: new Date()
    };

    ticket.comments.push(newComment);
    ticket.timeline.push(timelineEvent);
    ticket.updatedAt = new Date();

    this.saveTickets();

    return of({ ...newComment }).pipe(
      delay(this.simulateDelay()),
      catchError(error => {
        console.error('Error al añadir comentario:', error);
        return throwError(() => new Error('No se pudo añadir el comentario'));
      })
    );
  }

  getDashboardStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalTickets: this.tickets.length,
      openTickets: this.tickets.filter(t => t.status === TicketStatus.OPEN).length,
      inProgressTickets: this.tickets.filter(t => t.status === TicketStatus.IN_PROGRESS).length,
      resolvedTickets: this.tickets.filter(t => t.status === TicketStatus.RESOLVED).length,
      closedTickets: this.tickets.filter(t => t.status === TicketStatus.CLOSED).length
    };

    return of(stats).pipe(
      delay(this.simulateDelay()),
      catchError(error => {
        console.error('Error al obtener estadísticas:', error);
        return throwError(() => new Error('No se pudieron cargar las estadísticas'));
      })
    );
  }

  filterTickets(status?: TicketStatus, category?: string): Observable<Ticket[]> {
    let filtered = [...this.tickets];

    if (status) {
      filtered = filtered.filter(t => t.status === status);
    }

    if (category) {
      filtered = filtered.filter(t => t.category === category);
    }

    return of(filtered).pipe(
      delay(this.simulateDelay()),
      catchError(error => {
        console.error('Error al filtrar tickets:', error);
        return throwError(() => new Error('No se pudieron filtrar los tickets'));
      })
    );
  }
}
