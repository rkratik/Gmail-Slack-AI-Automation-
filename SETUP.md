# Setup Guide

Complete guide to set up and configure the Gmail-Slack AI Automation integration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Google Setup](#google-setup)
3. [Slack Setup](#slack-setup)
4. [Make.com Configuration](#makecom-configuration)
5. [Environment Configuration](#environment-configuration)
6. [Deployment](#deployment)
7. [Security](#security)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

- Google Account with Google Forms
- Slack Workspace (admin access)
- Gmail Account
- Make.com Account
- Node.js 14+ (optional, for local development)
- Git for version control

## Google Setup

### Step 1: Enable Google Forms API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google Forms API
   - Gmail API
   - Google Drive API

### Step 2: Create OAuth 2.0 Credentials

1. Navigate to "Credentials" in Google Cloud Console
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Select "Web application"
4. Add authorized redirect URIs:
   - `https://www.make.com/oauth/callback/google`
5. Download the credentials JSON
6. Store securely - **never commit to git**

### Step 3: Set Up Google Form

1. Create or open your Google Form
2. Go to Form settings
3. Enable "Collect email addresses"
4. Note the Form ID from the URL:
   - URL: `https://docs.google.com/forms/d/{FORM_ID}/edit`
5. Add your questions with desired question types

### Step 4: Get Form ID

```
Form ID location in URL:
https://docs.google.com/forms/d/1AuIMJJsKhiJiMsnIhbKJnMzqtq1iPpSVCEM2m_MxmF4/edit
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                          This is your GOOGLE_FORM_ID
```

## Slack Setup

### Step 1: Create Slack App

1. Go to [Slack App Dashboard](https://api.slack.com/apps)
2. Click "Create New App"
3. Choose "From scratch"
4. Name: `Gmail-Slack Automation`
5. Select your workspace

### Step 2: Configure Bot Token Scopes

In "OAuth & Permissions":

1. Add these scopes under "Bot Token Scopes":
   - `chat:write` - Send messages
   - `channels:read` - Read channel info
   - `users:read` - Read user info
   - `files:write` - Upload files

### Step 3: Create Incoming Webhook

1. Go to "Incoming Webhooks"
2. Toggle "Activate Incoming Webhooks"
3. Click "Add New Webhook to Workspace"
4. Select target channel
5. Copy the Webhook URL

### Step 4: Install App to Workspace

1. Go to "Install App"
2. Click "Install to Workspace"
3. Authorize permissions
4. Copy the "Bot User OAuth Token" (starts with `xoxb-`)

### Step 5: Get Channel ID

1. Open target Slack channel
2. Click channel name at top
3. Scroll down to "Channel ID"
4. Copy the ID

## Make.com Configuration

### Step 1: Create Make.com Account

1. Sign up at [Make.com](https://www.make.com)
2. Create new scenario
3. Name: `Gmail-Slack Automation`

### Step 2: Import Blueprint

1. Go to "Templates" or create new scenario
2. Import the `Integration Google Forms.blueprint.json`:
   - Click "Import Blueprint"
   - Upload the JSON file
   - Review connections

### Step 3: Connect Google Forms

1. In the blueprint, locate the "Watch Responses" module
2. Click the Google Forms connection
3. Choose "Create a connection"
4. Authenticate with Google account
5. Grant permissions for Forms and Gmail access
6. Select your Form ID from dropdown

### Step 4: Connect Slack

1. Locate the Slack webhook module
2. Add new Slack connection
3. Provide webhook URL from [Slack Setup](#slack-setup)
4. Configure message format and channel

### Step 5: Connect Gmail

1. Locate Gmail modules
2. Add new Gmail connection
3. Authenticate with Gmail account
4. Grant permissions
5. Configure recipient email and subject

### Step 6: Enable Scheduling

1. Click "Schedule" in scenario settings
2. Set polling interval (e.g., every 15 minutes)
3. Enable scenario

## Environment Configuration

### Step 1: Create .env File

```bash
cp .env.example .env
```

### Step 2: Update Configuration Values

Edit `.env` with your credentials:

```bash
# From Google Setup
GOOGLE_FORM_ID=1AuIMJJsKhiJiMsnIhbKJnMzqtq1iPpSVCEM2m_MxmF4
GOOGLE_EMAIL=your-email@gmail.com

# From Slack Setup
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_CHANNEL_ID=C123456789

# From Gmail
GMAIL_EMAIL=your-email@gmail.com
GMAIL_RECIPIENT_EMAIL=notifications@example.com

# Other settings
ENVIRONMENT=development
LOG_LEVEL=info
```

### Step 3: Secure Your Credentials

- **Never commit `.env` file**
- Use `.env.example` for templates only
- Rotate credentials regularly
- Use strong, unique passwords

## Deployment

### Development Environment

1. Test with a copy of your Google Form
2. Use test Slack channel
3. Monitor logs for errors
4. Validate all connections work

### Staging Environment

1. Use staging Slack workspace
2. Test with real-world data samples
3. Verify performance under load
4. Check error handling

### Production Environment

1. **Before deployment:**
   - Complete all testing
   - Backup current configuration
   - Notify team of changes
   - Prepare rollback plan

2. **Deploy:**
   - Update production `.env`
   - Enable scenario in Make.com
   - Monitor first 24 hours
   - Check logs for errors

3. **Post-deployment:**
   - Document changes in CHANGELOG.md
   - Update team documentation
   - Set up monitoring alerts
   - Schedule regular reviews

## Security

### Best Practices

1. **Credentials Management**
   - Store all credentials in `.env`
   - Never hardcode API keys
   - Rotate keys every 90 days
   - Use strong, unique passwords

2. **Access Control**
   - Limit Google Form to authorized users
   - Restrict Slack channel access
   - Use OAuth 2.0, not basic auth
   - Enable 2FA on all accounts

3. **Data Protection**
   - Enable encryption in transit (TLS/SSL)
   - Backup form data regularly
   - Use minimum required permissions
   - Audit access logs monthly

4. **Monitoring**
   - Enable Make.com execution logs
   - Set up error notifications
   - Monitor for unusual activity
   - Review logs weekly

### Sensitive Data Handling

- Never log full email addresses
- Mask sensitive form responses
- Use PII handling carefully
- Comply with GDPR/CCPA if applicable

## Troubleshooting

### Common Issues

#### 1. Webhook Not Triggering

**Symptoms**: Form responses not creating notifications

**Solutions**:
- Verify Form ID in Make.com matches actual form
- Check Google connection is active
- Ensure polling interval is reasonable
- Review Make.com execution logs

#### 2. Slack Messages Not Appearing

**Symptoms**: Slack connection works but no messages

**Solutions**:
- Verify webhook URL is correct
- Check bot has channel write permissions
- Ensure channel ID/name is correct
- Test webhook URL with cURL

```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Test"}' \
  YOUR_WEBHOOK_URL
```

#### 3. Gmail Not Sending

**Symptoms**: Gmail connection fails or no emails sent

**Solutions**:
- Verify Gmail credentials are correct
- Check recipient email is valid
- Ensure Gmail API is enabled
- Review Make.com logs for errors

#### 4. Permission Denied Errors

**Symptoms**: "Insufficient permissions" in logs

**Solutions**:
- Re-authenticate Google connection
- Verify API scopes in Google Console
- Check Slack bot permissions
- Ensure Gmail account has send permission

#### 5. Performance Issues

**Symptoms**: Slow response times or timeouts

**Solutions**:
- Increase Make.com polling interval
- Reduce batch size
- Optimize AI processing
- Check form response volume

### Debug Mode

Enable debug logging:

```env
DEBUG=true
LOG_LEVEL=debug
```

Check logs:
- Make.com execution logs
- Slack API logs
- Gmail API logs
- Google Forms audit logs

### Contact Support

- **Make.com Support**: https://support.make.com
- **Slack Support**: https://slack.com/help
- **Google Support**: https://support.google.com
- **GitHub Issues**: [Create an issue](https://github.com/rkratik/Gmail-Slack-AI-Automation-/issues)

---

**Need Help?** See [README.md](README.md#troubleshooting) or [TEST.md](TEST.md) for additional guidance.
