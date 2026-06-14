# Gmail-Slack AI Automation

Automated integration that captures Google Form responses and processes them through AI to send intelligent notifications to Slack and Gmail.

## Features

- **Google Forms Trigger**: Automatically captures new form responses in real-time
- **AI Processing**: Leverages AI to analyze and process form data
- **Multi-Channel Delivery**: Sends notifications to both Slack and Gmail
- **Intelligent Routing**: Routes responses based on content and metadata
- **Grade Tracking**: Supports quiz grading with feedback and materials
- **File Handling**: Manages file uploads from form responses
- **Respondent Tracking**: Captures respondent email and submission metadata

## Prerequisites

Before getting started, ensure you have:

- Active Google Account with Google Forms
- Google API credentials set up
- Slack workspace with bot permissions
- Gmail account configured
- Make.com account (integration platform)
- Node.js 14+ (for local development/testing)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/rkratik/Gmail-Slack-AI-Automation-.git
   cd Gmail-Slack-AI-Automation-
   ```

2. **Setup Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Deploy Blueprint**
   - See [SETUP.md](SETUP.md) for detailed configuration steps

4. **Test Integration**
   - See [TEST.md](TEST.md) for testing procedures

## Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup and configuration guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment checklist
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Blueprint architecture and flow
- **[TEST.md](TEST.md)** - Testing procedures and validation
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## Security

- Never commit `.env` files or credentials
- Use environment variables for sensitive data
- Rotate API keys regularly
- Restrict Form IDs to authorized forms only
- Enable audit logging in Google Forms and Slack

See [SETUP.md](SETUP.md#security) for security best practices.

## Project Structure

```
├── Integration Google Forms.blueprint.json  # Main automation blueprint
├── .env.example                              # Environment template
├── README.md                                 # This file
├── SETUP.md                                  # Setup guide
├── DEPLOYMENT.md                             # Deployment guide
├── API_DOCUMENTATION.md                      # Technical documentation
├── TEST.md                                   # Testing guide
├── CONTRIBUTING.md                           # Contribution guidelines
├── LICENSE                                   # MIT License
└── CHANGELOG.md                              # Version history
```

## Workflow

1. **Form Submission** - User submits Google Form
2. **Trigger Detection** - Blueprint detects new response
3. **Data Extraction** - Extract form data including answers and metadata
4. **AI Processing** - Process response through AI
5. **Notification** - Send to Slack and/or Gmail based on rules
6. **Logging** - Track submission and response

## Troubleshooting

Common issues and solutions:

- **Webhook not triggering**: Verify Form ID and Google connection permissions
- **Missing responses**: Check Make.com execution logs
- **Slack not receiving messages**: Verify bot permissions and channel access
- **Gmail delivery issues**: Check email configuration and SMTP settings

See [SETUP.md](SETUP.md#troubleshooting) for more troubleshooting steps.

## Use Cases

- **Quiz Grading Automation** - Auto-grade quizzes and send feedback
- **Survey Response Analysis** - Process surveys with AI and route to teams
- **Lead Capture** - Capture form submissions and notify sales team
- **Feedback Collection** - Gather feedback and route to relevant departments
- **Registration Processing** - Automate registration workflows

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check [SETUP.md](SETUP.md#troubleshooting) for common solutions
- Review [TEST.md](TEST.md) for testing help

## Resources

- [Google Forms API Documentation](https://developers.google.com/forms/api)
- [Slack API Documentation](https://api.slack.com)
- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [Make.com Documentation](https://www.make.com/en/help)

## Important Notes

- Test thoroughly in a development environment before production
- Backup your Google Forms and configuration regularly
- Monitor Make.com logs for errors and failures
- Keep API credentials secure and rotate them periodically
- Review and update the blueprint quarterly

---

**Last Updated**: June 2024  
**Version**: 1.0.0  
**Maintainer**: rkratik
