import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketservService } from '../../services/ticketserv.service';
import { TicketCategory, TicketPriority } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss'
})
export class TicketFormComponent implements OnInit {
  ticketForm!: FormGroup;
  loading = false;
  error = '';
  submitted = false;

  categories = [
    { value: TicketCategory.IT_HARDWARE, label: 'IT/Hardware' },
    { value: TicketCategory.IT_SOFTWARE, label: 'IT/Software' },
    { value: TicketCategory.FACILITIES, label: 'Instalaciones' },
    { value: TicketCategory.HR, label: 'RRHH' },
    { value: TicketCategory.OTHER, label: 'Otros' }
  ];

  priorities = [
    { value: TicketPriority.LOW, label: 'Baja' },
    { value: TicketPriority.MEDIUM, label: 'Media' },
    { value: TicketPriority.HIGH, label: 'Alta' },
    { value: TicketPriority.CRITICAL, label: 'Crítica' }
  ];

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketservService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.ticketForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      category: ['', Validators.required],
      priority: [TicketPriority.MEDIUM, Validators.required],
      description: ['', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000)
      ]]
    });
  }

  get f() {
    return this.ticketForm.controls;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.ticketForm.get(fieldName);

    if (!field || !field.errors || !field.touched) {
      return '';
    }

    if (field.errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }

    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }

    return '';
  }

  hasError(fieldName: string): boolean {
    const field = this.ticketForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.ticketForm.invalid) {
      Object.keys(this.ticketForm.controls).forEach(key => {
        this.ticketForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.error = '';

    this.ticketService.createTicket(this.ticketForm.value).subscribe({
      next: (ticket) => {
        this.loading = false;
        this.router.navigate(['/ticket', ticket.id]);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al crear el ticket. Por favor, intenta nuevamente.';
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  getCharacterCount(fieldName: string): number {
    return this.ticketForm.get(fieldName)?.value?.length || 0;
  }
}
