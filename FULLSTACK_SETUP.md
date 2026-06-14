// Full-Stack Application Setup Guide
# Full-Stack Gmail-Slack AI Automation

Complete production-ready application with React frontend + Node.js backend.

## Architecture

```
┌─────────────────┐
│  React Frontend │ (Port 3000)
│   Dashboard UI  │
└────────┬────────┘
         │
         │ REST API + WebSocket
         │
┌────────▼────────┐
│  Express API    │ (Port 5000)
│   Node.js       │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │          │          │          │
┌───▼──┐  ┌────▼────┐  ┌─▼────┐  ┌─▼────┐
│ Mongo│  │ Redis   │  │Google│  │Slack │
│  DB  │  │ Cache   │  │Forms │  │ API  │
└──────┘  └─────────┘  └──────┘  └──────┘
```

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose (for containerized setup)
- MongoDB Atlas or local MongoDB
- Google Cloud credentials
- Slack app credentials

### Option 1: Docker (Recommended)

```bash
# Setup environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Build and start all services
docker-compose up -d

# Access applications
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
# Redis: localhost:6379
```

### Option 2: Local Development

#### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
npm install
npm run dev
```

#### Frontend Setup (new terminal)
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

## Features Overview

### Dashboard
- **Overview** - Key metrics and statistics
- **Recent Activity** - Latest form responses
- **Quick Actions** - Common operations

### Responses Management
- View all form responses
- Filter and search
- AI-powered analysis
- Manual review and processing
- Export data

### Form Management
- Connect Google Forms
- Configure response handling
- Set up notifications
- Custom field mapping

### Templating
- Email templates with variables
- Slack message templates
- Template preview
- Version control

### Rules & Automation
- Create custom routing rules
- Conditional logic
- Bulk actions
- Rule testing

### Analytics
- Response trends
- Delivery statistics
- Error rates
- Performance metrics

### Integrations
- Slack workspace connection
- Gmail account setup
- Google Forms authentication
- API key management

### Settings
- User preferences
- Team management
- Security settings
- API configuration

## Data Flow

1. **Form Submission** → Google Forms
2. **Webhook Trigger** → Backend API
3. **Data Processing** → MongoDB storage, Redis cache
4. **Real-time Update** → Socket.IO to frontend
5. **AI Analysis** → OpenAI processing
6. **Notification** → Slack + Gmail delivery
7. **Analytics** → Dashboard display

## API Endpoints

### Authentication
```
POST /api/auth/register        - Create account
POST /api/auth/login           - Login
POST /api/auth/logout          - Logout
POST /api/auth/refresh         - Refresh token
GET  /api/auth/me              - Get current user
```

### Forms
```
GET    /api/forms              - List forms
POST   /api/forms              - Create form
GET    /api/forms/:id          - Get form
PUT    /api/forms/:id          - Update form
DELETE /api/forms/:id          - Delete form
POST   /api/forms/:id/sync     - Sync with Google
```

### Responses
```
GET    /api/responses          - List responses
GET    /api/responses/:id      - Get response
POST   /api/responses/:id/analyze - AI analyze
DELETE /api/responses/:id      - Delete response
POST   /api/responses/export   - Export CSV/JSON
```

### Templates
```
GET    /api/templates          - List templates
POST   /api/templates          - Create template
PUT    /api/templates/:id      - Update template
DELETE /api/templates/:id      - Delete template
POST   /api/templates/:id/preview - Preview
```

### Rules
```
GET    /api/rules              - List rules
POST   /api/rules              - Create rule
PUT    /api/rules/:id          - Update rule
DELETE /api/rules/:id          - Delete rule
POST   /api/rules/test         - Test rule
```

### Analytics
```
GET    /api/analytics/dashboard - Dashboard data
GET    /api/analytics/responses - Response stats
GET    /api/analytics/errors    - Error analytics
GET    /api/analytics/export    - Export data
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String ('admin', 'user'),
  integrations: {
    slack: { token, teamId, channels },
    gmail: { email, refreshToken },
    googleForms: { accessToken, refreshToken },
  },
  settings: Object,
  createdAt: Date,
  updatedAt: Date,
}
```

### Forms Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  googleFormId: String (unique),
  title: String,
  description: String,
  fields: Array,
  notifications: {
    slack: Boolean,
    email: Boolean,
    channels: [String],
  },
  rules: [ObjectId] (ref: Rule),
  templates: {
    slack: ObjectId (ref: Template),
    email: ObjectId (ref: Template),
  },
  status: String ('active', 'inactive'),
  createdAt: Date,
  updatedAt: Date,
}
```

### Responses Collection
```javascript
{
  _id: ObjectId,
  formId: ObjectId (ref: Form),
  googleResponseId: String,
  respondentEmail: String,
  data: Object,
  aiAnalysis: {
    sentiment: String,
    summary: String,
    keywords: [String],
    score: Number,
    processedAt: Date,
  },
  notifications: {
    slack: { sent: Boolean, messageId: String },
    email: { sent: Boolean, messageId: String },
  },
  status: String ('new', 'processed', 'archived'),
  createdAt: Date,
  updatedAt: Date,
}
```

## Real-Time Features

### Socket.IO Events

**Client → Server**
```javascript
socket.emit('join-user', userId)
socket.emit('leave-user', userId)
socket.emit('request-analysis', responseId)
```

**Server → Client**
```javascript
socket.emit('response:received', response)
socket.emit('response:analyzed', analysis)
socket.emit('notification:sent', notification)
socket.emit('error:occurred', error)
```

## Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcryptjs)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Helmet security headers
- ✅ Input validation
- ✅ OAuth 2.0 integration
- ✅ Secure cookie handling
- ✅ Audit logging

## Performance Optimization

- Redis caching for frequently accessed data
- Pagination for large datasets
- Query optimization with indexes
- Image compression
- Code splitting (React)
- Database connection pooling
- CDN for static assets

## Deployment

### Docker Deployment
```bash
docker-compose -f docker-compose.yml up -d
```

### Kubernetes Deployment
```bash
kubectl apply -f k8s/
```

### Cloud Platforms
- AWS (ECS, Elastic Beanstalk)
- Google Cloud (Cloud Run, App Engine)
- Azure (App Service, Container Instances)
- Heroku (with Procfile)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Monitoring & Logging

- Morgan for HTTP request logging
- Winston for application logging
- Sentry for error tracking
- Datadog for monitoring
- New Relic for APM

## Testing

### Backend
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test -- --coverage # With coverage
```

### Frontend
```bash
cd frontend
npm test                    # Run all tests
npm run test -- --coverage # With coverage
```

## Troubleshooting

### Connection Issues
- Check MongoDB URI in .env
- Verify Redis is running
- Ensure backend is accessible

### Authentication Errors
- Verify JWT_SECRET is set
- Check token expiration
- Review Google OAuth credentials

### API Errors
- Check backend logs: `docker logs gmail-slack-api`
- Verify API key credentials
- Review rate limiting

### WebSocket Issues
- Ensure Socket.IO is running
- Check CORS configuration
- Verify token authentication

## Support & Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [SETUP.md](./SETUP.md)
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [TEST.md](./TEST.md)

## License

MIT License - See [LICENSE](LICENSE) for details

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines

---

**Full-Stack Ready! 🚀**

Your Gmail-Slack AI Automation application is now ready for development and production deployment.

Start with: `docker-compose up -d` or follow local setup instructions above.
