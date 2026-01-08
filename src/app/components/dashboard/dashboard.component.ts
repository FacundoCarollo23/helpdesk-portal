import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TicketservService } from '../../services/ticketserv.service';
import { Ticket, DashboardStats, TicketStatus, TicketCategory } from '../../models/ticket.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  stats: DashboardStats | null = null;
  loading = false;
  error = '';

  selectedStatus: string = 'all';
  selectedCategory: string = 'all';

  ticketStatuses = [
    { value: 'all', label: 'Todos' },
    { value: TicketStatus.OPEN, label: 'Abiertos' },
    { value: TicketStatus.IN_PROGRESS, label: 'En progreso' },
    { value: TicketStatus.RESOLVED, label: 'Resueltos' },
    { value: TicketStatus.CLOSED, label: 'Cerrados' }
  ];

  ticketCategories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: TicketCategory.IT_HARDWARE, label: 'IT/Hardware' },
    { value: TicketCategory.IT_SOFTWARE, label: 'IT/Software' },
    { value: TicketCategory.FACILITIES, label: 'Instalaciones' },
    { value: TicketCategory.HR, label: 'RRHH' },
    { value: TicketCategory.OTHER, label: 'Otros' }
  ];

  constructor(
    private ticketService: TicketservService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
    this.loadStats();
  }

  loadTickets(): void {
    this.loading = true;
    this.error = '';

    this.ticketService.getAllTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los tickets';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadStats(): void {
    this.ticketService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas:', err);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.tickets];

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(t => t.status === this.selectedStatus);
    }

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === this.selectedCategory);
    }

    this.filteredTickets = filtered;
  }

  onStatusFilterChange(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  onCategoryFilterChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  goToTicketDetail(ticketId: string): void {
    this.router.navigate(['/ticket', ticketId]);
  }

  goToNewTicket(): void {
    this.router.navigate(['/nuevo-ticket']);
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
      month: 'short',
      year: 'numeric'
    });
  }
}
