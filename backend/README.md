# Backend - Gmail-Slack AI Automation

Complete Node.js/Express backend API for Gmail-Slack AI Automation system.

## Features

- ✅ RESTful API with Express
- ✅ MongoDB database with Mongoose
- ✅ JWT Authentication
- ✅ Real-time notifications with Socket.IO
- ✅ Google Forms integration
- ✅ Gmail API integration
- ✅ Slack API integration
- ✅ OpenAI AI analysis
- ✅ Redis caching
- ✅ Rate limiting
- ✅ Error handling
- ✅ Audit logging

## Quick Start

### Prerequisites

- Node.js 14+
- MongoDB Atlas account
- Google Cloud credentials
- Slack app credentials
- OpenAI API key

### Installation

```bash
cd backend
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your credentials
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Production

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Forms
- `GET /api/forms` - List forms
- `POST /api/forms` - Create form configuration
- `GET /api/forms/:id` - Get form details
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form
- `POST /api/forms/:id/sync` - Sync with Google Form

### Responses
- `GET /api/responses` - List responses
- `GET /api/responses/:id` - Get response details
- `POST /api/responses/:id/analyze` - AI analyze response
- `DELETE /api/responses/:id` - Delete response
- `POST /api/responses/export` - Export responses

### Templates
- `GET /api/templates` - List email/message templates
- `POST /api/templates` - Create template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template
- `POST /api/templates/:id/preview` - Preview template

### Rules
- `GET /api/rules` - List routing rules
- `POST /api/rules` - Create rule
- `PUT /api/rules/:id` - Update rule
- `DELETE /api/rules/:id` - Delete rule
- `POST /api/rules/test` - Test rule

### Analytics
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/responses` - Response statistics
- `GET /api/analytics/errors` - Error analytics
- `GET /api/analytics/performance` - Performance metrics
- `GET /api/analytics/export` - Export analytics

### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update settings
- `GET /api/settings/integrations` - Integration status
- `POST /api/settings/integrations/:provider/connect` - Connect integration

### Slack
- `POST /api/slack/events` - Slack event webhook
- `POST /api/slack/commands` - Slack slash commands

## Project Structure

```
backend/
├── server.js                 # Express server
├── package.json
├── .env.example
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Error handling
│   └── logger.js            # Request logging
├── routes/
│   ├── auth.js              # Auth endpoints
│   ├── forms.js             # Form endpoints
│   ├── responses.js         # Response endpoints
│   ├── templates.js         # Template endpoints
│   ├── rules.js             # Routing rules
│   ├── analytics.js         # Analytics endpoints
│   ├── slack.js             # Slack webhooks
│   └── settings.js          # Settings endpoints
├── controllers/
│   ├── authController.js
│   ├── formController.js
│   ├── responseController.js
│   ├── templateController.js
│   ├── analyticsController.js
│   └── slackController.js
├── models/
│   ├── User.js              # User schema
│   ├── Form.js              # Form configuration
│   ├── Response.js          # Form responses
│   ├── Template.js          # Email/message templates
│   ├── Rule.js              # Routing rules
│   ├── Integration.js       # Slack/Gmail settings
│   └── AuditLog.js          # Audit logging
├── services/
│   ├── googleFormsService.js   # Google Forms API
│   ├── gmailService.js         # Gmail API
│   ├── slackService.js         # Slack API
│   ├── aiService.js            # OpenAI integration
│   ├── emailService.js         # Email sending
│   ├── cacheService.js         # Redis caching
│   └── webhookService.js       # Webhook handling
├── utils/
│   ├── validators.js        # Input validation
│   ├── helpers.js           # Utility functions
│   ├── errors.js            # Custom errors
│   └── constants.js         # Constants
├── scripts/
│   ├── seedDatabase.js      # Database seeding
│   └── migration.js         # Data migrations
└── tests/
    ├── auth.test.js
    ├── forms.test.js
    └── integration.test.js
```

## Database Models

### User
```javascript
{
  email: String,
  name: String,
  password: String (hashed),
  googleId: String,
  role: String (admin/user),
  integrations: {
    slack: { token, teamId, channels },
    gmail: { email, refreshToken },
  },
  settings: Object,
  createdAt: Date,
  updatedAt: Date,
}
```

### Form
```javascript
{
  user: ObjectId (ref: User),
  googleFormId: String,
  title: String,
  description: String,
  fields: Array,
  notifications: {
    slack: Boolean,
    email: Boolean,
    channels: [String],
  },
  rules: [ObjectId] (ref: Rule),
  status: String (active/inactive),
  createdAt: Date,
  updatedAt: Date,
}
```

### Response
```javascript
{
  form: ObjectId (ref: Form),
  googleResponseId: String,
  respondentEmail: String,
  data: Object,
  aiAnalysis: {
    sentiment: String,
    summary: String,
    keywords: [String],
    score: Number,
  },
  status: String (new/processed/archived),
  notificationsSent: {
    slack: Boolean,
    email: Boolean,
  },
  createdAt: Date,
  updatedAt: Date,
}
```

## Key Services

### Google Forms Service
- Authenticate and connect to Google Forms
- Fetch form details
- Listen for new responses
- Parse form data

### Gmail Service
- Send emails using Gmail API
- Use templates
- Handle attachments
- Track delivery

### Slack Service
- Send messages to channels
- Upload files
- Handle slash commands
- Process events

### AI Service
- Analyze response sentiment
- Extract keywords
- Generate summaries
- Smart routing suggestions

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for production deployment guide.

## Troubleshooting

### MongoDB connection fails
- Check MONGODB_URI in .env
- Verify IP whitelist in MongoDB Atlas

### Google API errors
- Verify credentials in .env
- Check API is enabled in Google Cloud Console
- Ensure redirect URIs match

### Slack integration issues
- Verify SLACK_BOT_TOKEN is valid
- Check bot permissions
- Confirm signing secret matches

## Support

- 📖 [README](../README.md)
- 🔧 [SETUP](../SETUP.md)
- 🚀 [DEPLOYMENT](../DEPLOYMENT.md)
- 🧪 [TESTING](../TEST.md)

---

**Version**: 1.0.0  
**Last Updated**: June 2024
