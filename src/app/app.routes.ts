import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketDetalleComponent } from './components/ticket-detalle/ticket-detalle.component';

export const routes: Routes = [
{
    path: '',
    component: DashboardComponent,
    title: 'Dashboard - Helpdesk Portal'
  },
  {
    path: 'nuevo-ticket',
    component: TicketFormComponent,
    title: 'Nueva Incidencia - Helpdesk Portal'
  },
  {
    path: 'ticket/:id',
    component: TicketDetalleComponent,
    title: 'Detalle de Ticket - Helpdesk Portal'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }



];
