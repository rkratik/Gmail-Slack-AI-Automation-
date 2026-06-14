# API Documentation

Technical documentation for the Gmail-Slack AI Automation blueprint.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Blueprint Structure](#blueprint-structure)
3. [Data Flow](#data-flow)
4. [Module Documentation](#module-documentation)
5. [API References](#api-references)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Webhooks](#webhooks)

## Architecture Overview

The automation system uses Make.com to orchestrate three main services:

```
Google Forms
    ↓ (Watch Responses)
    ↓
Make.com Scenario
    ├─→ Google Forms API (Read responses)
    ├─→ AI Processing (Optional)
    └─→ Delivery Layer
        ├─→ Slack API (Send notifications)
        └─→ Gmail API (Send emails)
```

### Components

| Component | Purpose | API |
|-----------|---------|-----|
| Google Forms | Data source | Forms API v1 |
| Google Drive | File storage | Drive API v3 |
| Gmail | Email delivery | Gmail API v1 |
| Slack | Message delivery | Slack API v1 |
| Make.com | Orchestration | Webhooks, Modules |

## Blueprint Structure

### Root Configuration

```json
{
  "name": "Integration Google Forms",
  "flow": [
    // Module definitions
  ],
  "metadata": {
    // Blueprint metadata
  }
}
```

### Module Types

1. **Trigger Module**: `google-forms:watchResponses`
   - Watches for new form responses
   - Executes on form submission

2. **Processing Modules**: Data extraction and AI processing
   - Extracts answer data
   - Applies business logic
   - Formats data for output

3. **Action Modules**: Delivery mechanisms
   - Slack: Send messages
   - Gmail: Send emails
   - Database: Store responses

## Data Flow

### Complete Workflow

```
1. TRIGGER: New form response submitted
   ↓
2. WATCH: Make.com detects response within polling interval
   ↓
3. EXTRACT: Parse response data
   - Response ID
   - Respondent email
   - Timestamps
   - Answer values
   - Grade information (if quiz)
   ↓
4. TRANSFORM: Format data for notifications
   - Markdown formatting
   - Sanitize for Slack/Gmail
   - Include relevant metadata
   ↓
5. ENRICH (Optional): AI processing
   - Analyze sentiment
   - Extract key information
   - Generate summary
   ↓
6. DELIVER: Send notifications
   ├─→ Slack message to #channel
   └─→ Gmail to recipients
   ↓
7. LOG: Record in Make.com execution logs
   ↓
8. MONITOR: Check for errors
   ├─→ Retry on failure
   └─→ Alert on critical errors
```

## Module Documentation

### Module 1: Watch Google Forms Responses

**ID**: 1  
**Module**: `google-forms:watchResponses`  
**Version**: 2

#### Configuration

```json
{
  "parameters": {
    "limit": 1,
    "formId": "1AuIMJJsKhiJiMsnIhbKJnMzqtq1iPpSVCEM2m_MxmF4",
    "__IMTCONN__": 6550034
  }
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `formId` | string | Yes | Google Form ID from form URL |
| `limit` | integer | Yes | Number of responses to fetch per poll |
| `__IMTCONN__` | integer | Yes | Google connection ID |

#### Input Data

None - this is a trigger module.

#### Output Data

```json
{
  "responseId": "string",
  "createTime": "date",
  "lastSubmittedTime": "date",
  "respondentEmail": "string",
  "answers": {
    "questionId": "string",
    "grade": {
      "score": "number",
      "correct": "boolean",
      "feedback": {
        "text": "string",
        "material": []
      }
    }
  }
}
```

#### Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `responseId` | string | Unique response identifier |
| `createTime` | date | When response was created |
| `lastSubmittedTime` | date | Last submission timestamp |
| `respondentEmail` | string | Respondent's email address |
| `answers` | object | Array of question-answer pairs |
| `answers[].questionId` | string | Question identifier |
| `answers[].grade.score` | number | Numeric score (if quiz) |
| `answers[].grade.correct` | boolean | Correctness (if quiz) |
| `answers[].grade.feedback` | object | Feedback object |

#### Rate Limiting

- Polling interval: 1-60 minutes
- Recommended: 5-15 minutes for production
- API quota: 10,000 requests per day per form

### Module 2: Send Slack Message

**Module**: `slack:sendMessage`  
**Purpose**: Send notification to Slack channel

#### Configuration

```json
{
  "parameters": {
    "webhookUrl": "https://hooks.slack.com/services/...",
    "text": "{{formattedMessage}}"
  }
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | string | Yes | Slack incoming webhook URL |
| `text` | string | Yes | Message text (markdown) |
| `channel` | string | No | Override channel |
| `username` | string | No | Bot username |

#### Slack Message Format

```json
{
  "text": "New Form Response",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Response from:* {{respondentEmail}}\n*Time:* {{createdTime}}"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "{{answers}}"
      }
    }
  ]
}
```

#### Rate Limiting

- Per webhook: 1 message per second
- Daily: 10,000 messages (standard)

### Module 3: Send Gmail Email

**Module**: `gmail:sendEmail`  
**Purpose**: Send notification email

#### Configuration

```json
{
  "parameters": {
    "to": "recipient@example.com",
    "subject": "[Form Response] {{formTitle}}",
    "body": "{{emailBody}}",
    "cc": "",
    "bcc": ""
  }
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | string | Yes | Recipient email address |
| `subject` | string | Yes | Email subject |
| `body` | string | Yes | Email HTML/plain text |
| `cc` | string | No | CC recipients |
| `bcc` | string | No | BCC recipients |
| `attachments` | array | No | File attachments |

#### Rate Limiting

- Per account: 100 messages per second
- Daily: Limited by Gmail sending quota
- Bulk: 10,000 per day (per account)

## API References

### Google Forms API

**Documentation**: [Google Forms API Docs](https://developers.google.com/forms/api)

**Endpoints**:
```
POST https://forms.googleapis.com/v1/forms/{formId}/responses
GET https://forms.googleapis.com/v1/forms/{formId}/responses
```

**Authentication**: OAuth 2.0

**Rate Limits**:
- 10,000 requests per 100 seconds per user
- Bursts: 100 requests per 100 seconds

### Gmail API

**Documentation**: [Gmail API Docs](https://developers.google.com/gmail/api)

**Methods**:
```
gmail.users.messages.send
gmail.users.messages.list
gmail.users.messages.get
```

**Rate Limits**:
- 250 messages/user/second

### Slack API

**Documentation**: [Slack API Docs](https://api.slack.com)

**Methods**:
```
POST /services/webhook (Incoming Webhook)
chat.postMessage
files.upload
```

**Rate Limits**:
- Webhooks: 1/second per URL
- API: 60/minute (tier 1)

## Error Handling

### Error Types

#### 1. Connection Errors

```json
{
  "error": "CONNECTION_FAILED",
  "message": "Failed to connect to Google Forms API",
  "code": "ERR_CONN_001"
}
```

**Recovery**: Automatic retry after 1 minute

#### 2. Authentication Errors

```json
{
  "error": "AUTHENTICATION_FAILED",
  "message": "Invalid Google credentials",
  "code": "ERR_AUTH_001"
}
```

**Recovery**: Re-authenticate connection, rotate credentials

#### 3. Rate Limit Errors

```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "API rate limit exceeded",
  "retryAfter": 3600,
  "code": "ERR_LIMIT_001"
}
```

**Recovery**: Exponential backoff retry

#### 4. Data Validation Errors

```json
{
  "error": "INVALID_DATA",
  "message": "Response missing required fields",
  "code": "ERR_VAL_001"
}
```

**Recovery**: Manual review and correction

### Error Handling Strategy

1. **Automatic Retry**
   - Connection errors: Retry up to 5 times
   - Exponential backoff: 1s, 2s, 4s, 8s, 16s
   - Rate limits: Respect Retry-After header

2. **Notification**
   - Critical errors: Send to #automation-alerts
   - Log all errors in Make.com
   - Email error summary (daily)

3. **Monitoring**
   - Track error rate
   - Alert if > 5% failure rate
   - Weekly error report

## Rate Limiting

### Make.com Platform

```
Execution Limit:
- Free: 1,000 operations/month
- Pro: 10,000 operations/month
- Advanced: 100,000+ operations/month

Operation = 1 module execution
```

### API Rate Limits by Service

**Google Forms API**
- 10,000 requests/100 seconds/user
- Burst capacity: 100 requests

**Gmail API**
- 250 messages/second/user
- Daily limit: Based on account type

**Slack API**
- Incoming Webhooks: 1/second
- Rate tier 1: 60 requests/minute

### Rate Limit Management

1. **Monitoring**
   ```
   Monitor usage in Make.com dashboard:
   - Operations used this month
   - Execution history
   - Error rates
   ```

2. **Optimization**
   ```
   - Batch form responses
   - Increase polling interval
   - Archive old responses
   - Compress data
   ```

3. **Escalation**
   ```
   If approaching limits:
   - Upgrade Make.com plan
   - Request API quota increase
   - Implement caching/batching
   ```

## Webhooks

### Make.com Webhook Structure

**Incoming Webhook** (if using push instead of poll):

```
URL: https://hook.make.com/...
Method: POST
Content-Type: application/json

Body: {
  "formId": "form-id",
  "responseId": "response-id",
  "respondentEmail": "user@example.com",
  "answers": {...}
}
```

### Google Forms Push Notification

Currently uses polling. To implement push notifications:

1. Use Google Pub/Sub
2. Create Cloud Function
3. Route to Make.com webhook
4. Reduce latency from 5-15 min to < 1 second

## Data Models

### Response Object

```typescript
interface FormResponse {
  responseId: string;
  formId: string;
  createTime: ISO8601;
  lastSubmittedTime: ISO8601;
  respondentEmail?: string;
  answers: Answer[];
}

interface Answer {
  questionId: string;
  grade?: GradeInfo;
  textAnswers?: TextAnswer[];
  fileUploadAnswers?: FileAnswer[];
}

interface GradeInfo {
  score: number;
  correct: boolean;
  feedback: Feedback;
}

interface Feedback {
  text: string;
  material: Material[];
  textAnswers: TextAnswer[];
  fileUploadAnswers: FileAnswer[];
}
```

### Slack Notification Schema

```typescript
interface SlackNotification {
  text: string;
  blocks: Block[];
  channel?: string;
  username?: string;
  icon_emoji?: string;
}

interface Block {
  type: "section" | "header" | "divider" | "image";
  text?: TextBlock;
  image_url?: string;
}
```

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Maintainer**: rkratik
