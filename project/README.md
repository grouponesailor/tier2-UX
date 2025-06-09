# FileGuard - Help Desk System

A comprehensive enterprise file access management and help desk system built with Angular 17 and Material Design.

## Features

### Admin Zone
- **Dashboard**: System overview with statistics and alerts
- **User Management**: Manage user accounts, roles, and permissions
- **System Settings**: Configure security policies and system parameters
- **Analytics & Reports**: View system usage analytics and generate reports

### Help Desk Zone
- **Dashboard**: Help desk control center with urgent issues and activity
- **File Management**: Search and manage file access, unlock files, grant emergency access
- **File Recovery**: Restore previous file versions and recover deleted files
- **Support Tickets**: Manage and track file access support requests

## Technology Stack

- **Frontend**: Angular 17 with standalone components
- **UI Framework**: Angular Material Design
- **Styling**: SCSS with custom theming
- **Icons**: Material Icons
- **Date Handling**: date-fns library
- **Build Tool**: Angular CLI

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. **Open your browser** and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── models/           # Data models and interfaces
│   ├── services/         # Business logic and API services
│   ├── zones/
│   │   ├── admin-zone/   # Admin functionality
│   │   └── helpdesk-zone/ # Help desk functionality
│   ├── app.component.ts  # Main application component
│   └── app.routes.ts     # Application routing
├── styles.scss          # Global styles and theming
└── index.html           # Main HTML file
```

## Key Components

### Admin Zone Components
- `AdminDashboardComponent` - System overview and statistics
- `AdminUsersComponent` - User management interface
- `AdminSettingsComponent` - System configuration
- `AdminAnalyticsComponent` - Reports and analytics

### Help Desk Zone Components
- `HelpDeskDashboardComponent` - Help desk control center
- `FileManagementComponent` - File search and management
- `FileRecoveryComponent` - File recovery tools
- `SupportTicketsComponent` - Ticket management

### Shared Services
- `FileService` - File operations and search functionality

## Features Implemented

### File Management
- **Smart Search**: Search by file name, employee name, or ID
- **File Unlocking**: Release stuck file locks with audit trail
- **Emergency Access**: Grant temporary access bypassing normal approval
- **Real-time Status**: Live file lock status and user information

### User Interface
- **Dual Zone Design**: Separate admin and help desk interfaces
- **Material Design**: Modern, accessible UI components
- **Responsive Layout**: Works on desktop and mobile devices
- **Interactive Dialogs**: Modal dialogs for critical operations

### Security & Auditing
- **Role-based Access**: Different interfaces for different user roles
- **Audit Trail**: Track all file operations and access changes
- **Approval Workflows**: Configurable approval processes
- **Emergency Protocols**: Special handling for urgent access needs

## Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run lint` - Run linting

### Customization
The application uses CSS custom properties for theming:
- Admin Zone: Blue color scheme
- Help Desk Zone: Green color scheme

Modify `src/styles.scss` to customize the appearance.

## Mock Data
The application currently uses mock data for demonstration. In a production environment, replace the mock services with actual API calls to your backend systems.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
This project is for demonstration purposes.