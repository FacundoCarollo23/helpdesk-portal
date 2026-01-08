import { User, Ticket, TicketCategory, TicketPriority, TicketStatus } from '../models/ticket.model';

export const MOCK_USER: User = {
  id: '1',
  name: 'Ana García',
  email: 'ana.garcia@techcorp.com',
  avatar: 'https://i.pravatar.cc/150?img=1'
};

export const MOCK_ADMIN: User = {
  id: '3',
  name: 'Miguel Sánchez',
  email: 'miguel.sanchez@techcorp.com',
  avatar: 'https://i.pravatar.cc/150?img=7'
};

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'El monitor de mi oficina no enciende',
    description: 'Desde esta mañana mi monitor Dell en la oficina 3B no enciende. He verificado que el cable está bien conectado y el botón de encendido no responde. Necesito el monitor para mi trabajo urgentemente.',
    category: TicketCategory.IT_HARDWARE,
    priority: TicketPriority.HIGH,
    status: TicketStatus.IN_PROGRESS,
    createdBy: MOCK_USER,
    assignedTo: MOCK_ADMIN,
    createdAt: new Date('2024-12-10T09:30:00'),
    updatedAt: new Date('2024-12-10T14:20:00'),
    comments: [
      {
        id: 'CMT-001',
        ticketId: 'TKT-001',
        user: MOCK_ADMIN,
        content: 'He revisado tu solicitud. Pasaré por tu oficina en 30 minutos para revisar el monitor.',
        createdAt: new Date('2024-12-10T10:15:00')
      },
      {
        id: 'CMT-002',
        ticketId: 'TKT-001',
        user: MOCK_ADMIN,
        content: 'Monitor revisado. El problema es la fuente de alimentación. Tramitaré el reemplazo.',
        createdAt: new Date('2024-12-10T11:00:00')
      }
    ],
    timeline: [
      {
        id: 'TL-001',
        ticketId: 'TKT-001',
        type: 'created',
        description: 'Ticket creado',
        user: MOCK_USER,
        timestamp: new Date('2024-12-10T09:30:00')
      },
      {
        id: 'TL-002',
        ticketId: 'TKT-001',
        type: 'assigned',
        description: 'Asignado a Miguel Sánchez',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-10T09:45:00')
      },
      {
        id: 'TL-003',
        ticketId: 'TKT-001',
        type: 'status_changed',
        description: 'Estado cambiado a En progreso',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-10T10:00:00')
      },
      {
        id: 'TL-004',
        ticketId: 'TKT-001',
        type: 'comment_added',
        description: 'Nuevo comentario añadido',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-10T10:15:00')
      },
      {
        id: 'TL-005',
        ticketId: 'TKT-001',
        type: 'comment_added',
        description: 'Nuevo comentario añadido',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-10T11:00:00')
      }
    ]
  },
  {
    id: 'TKT-002',
    title: 'No puedo acceder a la carpeta compartida del equipo',
    description: 'Necesito acceso a la carpeta compartida "Marketing_2024" en el servidor. Mi usuario es ana.garcia y he intentado acceder desde mi PC pero me da error de permisos.',
    category: TicketCategory.IT_SOFTWARE,
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.RESOLVED,
    createdBy: MOCK_USER,
    assignedTo: MOCK_ADMIN,
    createdAt: new Date('2024-12-08T11:20:00'),
    updatedAt: new Date('2024-12-09T09:30:00'),
    comments: [
      {
        id: 'CMT-003',
        ticketId: 'TKT-002',
        user: MOCK_ADMIN,
        content: 'He agregado los permisos necesarios. Por favor intenta acceder de nuevo y confirma si funciona.',
        createdAt: new Date('2024-12-09T09:00:00')
      },
      {
        id: 'CMT-004',
        ticketId: 'TKT-002',
        user: MOCK_USER,
        content: '¡Perfecto! Ya puedo acceder sin problemas. Muchas gracias.',
        createdAt: new Date('2024-12-09T09:30:00')
      }
    ],
    timeline: [
      {
        id: 'TL-006',
        ticketId: 'TKT-002',
        type: 'created',
        description: 'Ticket creado',
        user: MOCK_USER,
        timestamp: new Date('2024-12-08T11:20:00')
      },
      {
        id: 'TL-007',
        ticketId: 'TKT-002',
        type: 'status_changed',
        description: 'Estado cambiado a En progreso',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-08T14:30:00')
      },
      {
        id: 'TL-008',
        ticketId: 'TKT-002',
        type: 'comment_added',
        description: 'Nuevo comentario añadido',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-09T09:00:00')
      },
      {
        id: 'TL-009',
        ticketId: 'TKT-002',
        type: 'status_changed',
        description: 'Estado cambiado a Resuelto',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-09T09:30:00')
      }
    ]
  },
  {
    id: 'TKT-003',
    title: 'Aire acondicionado no funciona en sala de reuniones B',
    description: 'El aire acondicionado de la sala de reuniones B (planta 2) no enfría. La temperatura está en 28°C y tenemos una reunión importante mañana.',
    category: TicketCategory.FACILITIES,
    priority: TicketPriority.HIGH,
    status: TicketStatus.OPEN,
    createdBy: MOCK_USER,
    createdAt: new Date('2024-12-12T16:45:00'),
    updatedAt: new Date('2024-12-12T16:45:00'),
    comments: [],
    timeline: [
      {
        id: 'TL-012',
        ticketId: 'TKT-003',
        type: 'created',
        description: 'Ticket creado',
        user: MOCK_USER,
        timestamp: new Date('2024-12-12T16:45:00')
      }
    ]
  },
  {
    id: 'TKT-004',
    title: 'Solicitud de actualización de datos de nómina',
    description: 'Necesito actualizar mi cuenta bancaria en el sistema de nómina. He cambiado de banco recientemente y necesito que los próximos pagos se hagan a la nueva cuenta.',
    category: TicketCategory.HR,
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.OPEN,
    createdBy: MOCK_USER,
    createdAt: new Date('2024-12-11T10:00:00'),
    updatedAt: new Date('2024-12-11T10:00:00'),
    comments: [],
    timeline: [
      {
        id: 'TL-013',
        ticketId: 'TKT-004',
        type: 'created',
        description: 'Ticket creado',
        user: MOCK_USER,
        timestamp: new Date('2024-12-11T10:00:00')
      }
    ]
  },
  {
    id: 'TKT-005',
    title: 'Laptop muy lenta, necesita revisión',
    description: 'Mi laptop corporativa (Lenovo ThinkPad) está extremadamente lenta desde hace una semana. Tarda mucho en abrir programas y a veces se congela completamente.',
    category: TicketCategory.IT_HARDWARE,
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.CLOSED,
    createdBy: MOCK_USER,
    assignedTo: MOCK_ADMIN,
    createdAt: new Date('2024-12-05T09:00:00'),
    updatedAt: new Date('2024-12-06T17:00:00'),
    comments: [
      {
        id: 'CMT-005',
        ticketId: 'TKT-005',
        user: MOCK_ADMIN,
        content: 'He revisado tu equipo. Tenía varios programas ejecutándose en segundo plano y el disco estaba al 95%. He hecho limpieza y optimización. Debería funcionar mejor ahora.',
        createdAt: new Date('2024-12-06T14:00:00')
      }
    ],
    timeline: [
      {
        id: 'TL-014',
        ticketId: 'TKT-005',
        type: 'created',
        description: 'Ticket creado',
        user: MOCK_USER,
        timestamp: new Date('2024-12-05T09:00:00')
      },
      {
        id: 'TL-015',
        ticketId: 'TKT-005',
        type: 'status_changed',
        description: 'Estado cambiado a Resuelto',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-06T14:00:00')
      },
      {
        id: 'TL-016',
        ticketId: 'TKT-005',
        type: 'status_changed',
        description: 'Estado cambiado a Cerrado',
        user: MOCK_USER,
        timestamp: new Date('2024-12-06T17:00:00')
      }
    ]
  },
  {
    id: 'TKT-006',
    title: 'Error al enviar emails desde Outlook',
    description: 'Cuando intento enviar correos desde Outlook me sale el error "No se puede conectar al servidor SMTP". He verificado mi conexión a internet y está funcionando bien.',
    category: TicketCategory.IT_SOFTWARE,
    priority: TicketPriority.CRITICAL,
    status: TicketStatus.IN_PROGRESS,
    createdBy: MOCK_USER,
    assignedTo: MOCK_ADMIN,
    createdAt: new Date('2024-12-13T08:00:00'),
    updatedAt: new Date('2024-12-13T09:30:00'),
    comments: [
      {
        id: 'CMT-007',
        ticketId: 'TKT-006',
        user: MOCK_ADMIN,
        content: 'Estamos investigando el problema. Parece ser un issue general con el servidor de correo. Trabajando en la solución.',
        createdAt: new Date('2024-12-13T09:30:00')
      }
    ],
    timeline: [
      {
        id: 'TL-021',
        ticketId: 'TKT-006',
        type: 'created',
        description: 'Ticket creado',
        user: MOCK_USER,
        timestamp: new Date('2024-12-13T08:00:00')
      },
      {
        id: 'TL-022',
        ticketId: 'TKT-006',
        type: 'priority_changed',
        description: 'Prioridad cambiada a Crítica',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-13T08:15:00')
      },
      {
        id: 'TL-023',
        ticketId: 'TKT-006',
        type: 'status_changed',
        description: 'Estado cambiado a En progreso',
        user: MOCK_ADMIN,
        timestamp: new Date('2024-12-13T08:30:00')
      }
    ]
  }
];
