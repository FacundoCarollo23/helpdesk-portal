# Portal de Incidencias - APG Consultings

Portal web para la gestión de incidencias y tickets de soporte técnico desarrollado con Angular.

## Descripción

Aplicación web desarrollada como parte de una prueba técnica para el puesto de Angular Frontend Developer. El sistema permite gestionar incidencias de soporte técnico con funcionalidades de creación, visualización detallada, comentarios y filtrado de tickets.

## Características

### Dashboard Principal
- Visualización de todos los tickets del sistema
- Tarjetas estadísticas con totales por estado
- Sistema de filtrado por estado y categoría
- Interfaz responsive con diseño adaptativo
- Estados visuales para carga y errores

### Formulario de Nueva Incidencia
- Validación en tiempo real de campos
- Contadores de caracteres
- Campos requeridos con indicadores visuales
- Mensajes de error contextuales
- Categorías: IT/Hardware, IT/Software, Instalaciones, RRHH, Otros
- Niveles de prioridad: Baja, Media, Alta, Crítica

### Vista de Detalle de Ticket
- Información completa del ticket
- Timeline de eventos
- Sistema de comentarios
- Metadata detallada (creador, fecha, asignado, categoría)
- Badges visuales para estado y prioridad

## Stack Tecnológico

- Angular 19.2.19
- TypeScript (modo strict)
- SCSS con sistema de variables y mixins
- RxJS para programación reactiva
- Reactive Forms para validación
- LocalStorage para persistencia de datos
- Server-Side Rendering (SSR)

## Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior

## Instalación

```bash
npm install
```

## Ejecutar en Desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Build de Producción

```bash
npm run build
```

Los archivos compilados se generarán en el directorio `dist/`

## Ejecutar con SSR

```bash
npm run build
npm run serve:ssr:helpdesk-portal
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Componente principal del dashboard
│   │   ├── ticket-form/        # Formulario de nueva incidencia
│   │   └── ticket-detalle/     # Vista detallada de ticket
│   ├── models/
│   │   └── ticket.model.ts     # Interfaces y enums del dominio
│   ├── services/
│   │   └── ticketserv.service.ts  # Servicio de gestión de tickets
│   ├── data/
│   │   └── mock-data.ts        # Datos de ejemplo
│   └── styles/
│       ├── _variables.scss     # Variables globales de estilos
│       └── _mixins.scss        # Mixins reutilizables
└── styles.scss                 # Estilos globales
```

## Funcionalidades Implementadas

### Gestión de Tickets
- Listar todos los tickets con información resumida
- Crear nuevos tickets con validaciones
- Ver detalle completo de un ticket
- Añadir comentarios a tickets existentes
- Filtrar tickets por estado y categoría

### Sistema de Validación
- Título: 5-100 caracteres
- Descripción: 20-1000 caracteres
- Comentarios: mínimo 10 caracteres
- Categoría y prioridad obligatorias

### Persistencia de Datos
- Los tickets se guardan en localStorage del navegador
- Los datos persisten entre recargas de página
- Soporte para SSR sin errores de localStorage

### Diseño Responsive
- Mobile-first approach
- Breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide), 1920px (ultrawide)
- Grids adaptativos para diferentes resoluciones
- Espaciado optimizado para pantallas grandes (1920px+)

## Estados de Tickets

- **Abierto**: Ticket recién creado
- **En Progreso**: Ticket siendo trabajado
- **Resuelto**: Ticket solucionado
- **Cerrado**: Ticket cerrado definitivamente

## Prioridades

- **Baja**: Incidencias menores
- **Media**: Incidencias estándar (por defecto)
- **Alta**: Incidencias importantes
- **Crítica**: Incidencias urgentes

## Categorías

- IT/Hardware
- IT/Software
- Instalaciones
- RRHH
- Otros

## Características Técnicas

### Arquitectura
- Componentes standalone de Angular
- Programación reactiva con RxJS
- Formularios reactivos con validadores
- Inyección de dependencias
- Lazy loading de rutas

### Optimizaciones
- Simulación de delay en operaciones (300-800ms)
- Manejo de errores con catchError
- Loading states en todas las operaciones
- SSR compatible con verificación de plataforma

### Sistema de Estilos
- Variables SCSS para colores, espaciado y tipografía
- Mixins reutilizables para botones, formularios y layouts
- Sistema consistente de sombras y transiciones
- Paleta de colores semántica

## Navegación

- `/` - Dashboard principal
- `/new-ticket` - Formulario de nueva incidencia
- `/ticket/:id` - Detalle de ticket específico

## Datos de Ejemplo

El sistema incluye 6 tickets de ejemplo con diferentes estados, prioridades y categorías para demostración. Los datos se pueden limpiar eliminando la clave `helpdesk_tickets` del localStorage del navegador.

## Desarrollo

### Comandos Útiles

```bash
npm start              # Desarrollo
npm run build          # Build de producción
npm test              # Ejecutar tests
npm run lint          # Linter
```

### Limpiar LocalStorage

Para resetear los datos a los valores iniciales, ejecutar en la consola del navegador:

```javascript
localStorage.removeItem('helpdesk_tickets');
location.reload();
```

## Compatibilidad

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Autor

Desarrollado como prueba técnica para APG Consultings

## Licencia

Este proyecto es parte de una prueba técnica y no tiene licencia de uso comercial.
