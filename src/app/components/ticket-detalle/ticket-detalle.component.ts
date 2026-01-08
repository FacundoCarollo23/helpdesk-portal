import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketservService } from '../../services/ticketserv.service';
import { Ticket, TicketStatus } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-detalle',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-detalle.component.html',
  styleUrl: './ticket-detalle.component.scss'
})
export class TicketDetalleComponent implements OnInit {
  ticket: Ticket | null = null;
  loading = false;
  error = '';
  commentForm!: FormGroup;
  submittingComment = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketservService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initCommentForm();
    this.loadTicket();
  }

  initCommentForm(): void {
    this.commentForm = this.fb.group({
      content: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    });
  }

  loadTicket(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');

    if (!ticketId) {
      this.error = 'ID de ticket inválido';
      return;
    }

    this.loading = true;
    this.error = '';

    this.ticketService.getTicketById(ticketId).subscribe({
      next: (ticket) => {
        if (ticket) {
          this.ticket = ticket;
        } else {
          this.error = 'Ticket no encontrado';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el ticket';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmitComment(): void {
    if (this.commentForm.invalid || !this.ticket) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.submittingComment = true;

    this.ticketService.addComment(this.ticket.id, this.commentForm.value).subscribe({
      next: () => {
        this.submittingComment = false;
        this.commentForm.reset();
        this.loadTicket();
      },
      error: (err) => {
        this.submittingComment = false;
        console.error('Error al añadir comentario:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getStatusClass(status: TicketStatus): string {
    const statusMap: Record<TicketStatus, string> = {
      [TicketStatus.OPEN]: 'status-open',
      [TicketStatus.IN_PROGRESS]: 'status-in-progress',
      [TicketStatus.RESOLVED]: 'status-resolved',
      [TicketStatus.CLOSED]: 'status-closed'
    };
    return statusMap[status] || '';
  }

  getPriorityClass(priority: string): string {
    const priorityMap: Record<string, string> = {
      'Crítica': 'priority-critical',
      'Alta': 'priority-high',
      'Media': 'priority-medium',
      'Baja': 'priority-low'
    };
    return priorityMap[priority] || '';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDateTime(date: Date): string {
    return `${this.formatDate(date)} a las ${this.formatTime(date)}`;
  }

  hasCommentError(): boolean {
    const field = this.commentForm.get('content');
    return !!(field && field.invalid && field.touched);
  }

  getCommentError(): string {
    const field = this.commentForm.get('content');

    if (!field || !field.errors || !field.touched) {
      return '';
    }

    if (field.errors['required']) {
      return 'El comentario es obligatorio';
    }

    if (field.errors['minlength']) {
      return 'Mínimo 10 caracteres';
    }

    return '';
  }
}
