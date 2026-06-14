# Frontend - Gmail-Slack AI Automation

React frontend for Gmail-Slack AI Automation system with Material-UI dashboard.

## Features

- ✅ React 18 with hooks
- ✅ Material-UI 5 components
- ✅ React Router v6 navigation
- ✅ Real-time WebSocket (Socket.IO)
- ✅ State management with Zustand
- ✅ React Query for API data fetching
- ✅ React Hook Form validation
- ✅ Chart.js analytics
- ✅ Responsive design
- ✅ Dark/Light theme support

## Quick Start

### Prerequisites

- Node.js 14+
- Backend API running on localhost:5000

### Installation

```bash
cd frontend
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your settings
```

### Development

```bash
npm start
```

App runs on `http://localhost:3000`

### Production Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorBoundary.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── dashboard/
│   │   │   └── DashboardPage.jsx
│   │   ├── responses/
│   │   │   ├── ResponsesPage.jsx
│   │   │   └── ResponseDetailPage.jsx
│   │   ├── forms/
│   │   │   ├── FormsPage.jsx
│   │   │   └── FormDetailPage.jsx
│   │   ├── templates/
│   │   │   └── TemplatesPage.jsx
│   │   ├── rules/
│   │   │   └── RulesPage.jsx
│   │   ├── analytics/
│   │   │   └── AnalyticsPage.jsx
│   │   ├── integrations/
│   │   │   └── IntegrationsPage.jsx
│   │   ├── settings/
│   │   │   └── SettingsPage.jsx
│   │   └── errors/
│   │       ├── NotFoundPage.jsx
│   │       └── UnauthorizedPage.jsx
│   ├── api/
│   │   ├── axios.js
│   │   ├── socket.js
│   │   ├── queryClient.js
│   │   ├── authApi.js
│   │   ├── formApi.js
│   │   ├── responseApi.js
│   │   ├── templateApi.js
│   │   ├── rulesApi.js
│   │   └── analyticsApi.js
│   ├── store/
│   │   ├── authStore.js
│   │   ├── formStore.js
│   │   ├── responseStore.js
│   │   └── uiStore.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useQuery.js
│   │   ├── useSocket.js
│   │   └── useForm.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── constants.js
│   │   └── helpers.js
│   └── styles/
│       ├── theme.js
│       └── globals.css
├── package.json
├── .env.example
└── README.md
```

## Key Pages

### Dashboard (`/`)
Overview of all activity, recent responses, quick stats

### Responses (`/responses`)
List and filter form responses, view details, analyze

### Forms (`/forms`)
Manage Google Forms configurations and integrations

### Templates (`/templates`)
Create and manage email/Slack message templates

### Rules (`/rules`)
Define custom routing and automation rules

### Analytics (`/analytics`)
View analytics, charts, performance metrics

### Integrations (`/integrations`)
Connect Slack, Gmail, and other services

### Settings (`/settings`)
User preferences, account management

## API Integration

### Axios Setup
```javascript
// Auto-attach JWT token to all requests
// Interceptors for error handling
// Retry logic for failed requests
```

### React Query
```javascript
// Data fetching with caching
// Automatic refetching
// Optimistic updates
```

### Socket.IO
```javascript
// Real-time notifications
// Live data updates
// User presence
```

## State Management

### Zustand Stores
- `authStore` - User authentication
- `formStore` - Form data and cache
- `responseStore` - Response data
- `uiStore` - UI state (theme, modal, etc)

## Components

### Reusable
- LoadingSpinner
- ErrorAlert
- ConfirmDialog
- FormField
- DataTable
- ChartCard

### Layouts
- Layout (main app layout)
- Sidebar (navigation)
- TopBar (header)

## Testing

```bash
# Run tests
npm test

# With coverage
npm test -- --coverage
```

## Build & Deploy

```bash
# Build for production
npm run build

# Output: build/
# Ready for deployment to any static hosting
```

## Environment Variables

```
REACT_APP_API_URL         - Backend API URL
REACT_APP_SOCKET_URL      - WebSocket server URL
REACT_APP_ENV             - Environment (development/production)
REACT_APP_GOOGLE_CLIENT_ID - Google OAuth client ID
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

- 📖 [README](../README.md)
- 🔧 [SETUP](../SETUP.md)
- 🚀 [DEPLOYMENT](../DEPLOYMENT.md)

---

**Version**: 1.0.0  
**Last Updated**: June 2024
