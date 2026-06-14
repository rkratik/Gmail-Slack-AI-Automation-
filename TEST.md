# Testing Guide

Comprehensive testing procedures for the Gmail-Slack AI Automation project.

## Table of Contents

1. [Test Environment Setup](#test-environment-setup)
2. [Unit Testing](#unit-testing)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Performance Testing](#performance-testing)
6. [Security Testing](#security-testing)
7. [Regression Testing](#regression-testing)

## Test Environment Setup

### Prerequisites

- Access to test Google Form
- Test Slack workspace or channel
- Test Gmail account
- Make.com test scenario
- Test data samples

### Create Test Form

1. Create a copy of your production Google Form
2. Name it `[TEST] Form Name`
3. Mark clearly as test
4. Keep same question structure as production

### Setup Test Channel

1. Create test Slack channel: `#automation-test`
2. Add team members who need to monitor tests
3. Create test email inbox (Gmail filter)

## Unit Testing

### Connection Testing

#### Test 1: Google Forms Connection
```
Objective: Verify Google Forms API connection
Steps:
1. Go to Make.com scenario
2. Click "Google Forms: Watch Responses" module
3. Click "Test" button
4. Should display "OK" status

Expected Result: Green checkmark, connection successful
```

#### Test 2: Slack Connection
```
Objective: Verify Slack webhook connectivity
Steps:
1. Click "Slack: Send Message" module
2. Click "Test" button
3. Check #automation-test channel for test message

Expected Result: Test message appears in Slack channel
```

#### Test 3: Gmail Connection
```
Objective: Verify Gmail API connection
Steps:
1. Click "Gmail: Send Email" module
2. Click "Test" button
3. Check test email inbox

Expected Result: Test email received successfully
```

## Integration Testing

### Scenario 1: Basic Response Processing

**Objective**: Verify complete flow from form to notifications

**Test Data**:
```
Name: Test User
Email: test@example.com
Question 1: Test Response
Question 2: Another test
```

**Steps**:
1. Submit test form response
2. Wait 2-5 minutes for webhook trigger
3. Check Make.com execution log
4. Verify Slack notification received
5. Verify Gmail notification received

**Validation**:
- [ ] Form response captured
- [ ] Make.com scenario executed
- [ ] Slack message formatted correctly
- [ ] Gmail email received
- [ ] All data transferred accurately
- [ ] No data loss or corruption

### Scenario 2: Multiple Responses

**Objective**: Verify batch processing

**Test Data**:
- Submit 5 different test responses
- Each with unique data
- Within 5-minute window

**Steps**:
1. Submit multiple test responses quickly
2. Monitor Make.com execution
3. Check Slack for multiple notifications
4. Verify Gmail received all emails

**Validation**:
- [ ] All 5 responses processed
- [ ] Correct order maintained
- [ ] No duplicate notifications
- [ ] Performance acceptable

### Scenario 3: Special Characters & Unicode

**Objective**: Verify data encoding

**Test Data**:
```
Name: Tëst Üsér
Response: Test with émojis 😀🎉
Special chars: @#$%^&*()
```

**Steps**:
1. Submit form with special characters
2. Monitor processing
3. Check Slack and Gmail

**Validation**:
- [ ] Special characters preserved
- [ ] Emoji rendered correctly
- [ ] No encoding errors
- [ ] Message readable

### Scenario 4: Large Data Handling

**Objective**: Verify system handles large responses

**Test Data**:
- Long text response (>1000 characters)
- Multiple file uploads
- Complex nested answers

**Steps**:
1. Submit response with large data
2. Monitor execution time
3. Verify all data transmitted

**Validation**:
- [ ] Large data processed
- [ ] No truncation
- [ ] Execution time reasonable
- [ ] Memory usage acceptable

## End-to-End Testing

### Complete User Workflow

```
1. User fills out Google Form
   ↓
2. Form submission captured
   ↓
3. Make.com webhook triggered
   ↓
4. Data extracted and validated
   ↓
5. AI processing (if enabled)
   ↓
6. Slack notification sent
   ↓
7. Gmail notification sent
   ↓
8. Logging completed
```

### Test Execution

**Pre-test Checks**:
- [ ] Test form created
- [ ] Make.com scenario running
- [ ] Slack channel accessible
- [ ] Gmail account ready
- [ ] All connections verified

**Test Steps**:
1. Clear recent logs
2. Submit identifiable test response
3. Wait for all notifications
4. Document execution time
5. Verify all outputs

**Post-test Checks**:
- [ ] Form response stored
- [ ] Slack notification received
- [ ] Gmail notification received
- [ ] Execution logs recorded
- [ ] No errors occurred

## Performance Testing

### Response Time Testing

**Objective**: Measure end-to-end execution time

**Test Setup**:
- Clear logs
- Ensure normal system load
- Use same network as production

**Test Procedure**:
1. Note submission time (Google Forms timestamp)
2. Submit test response
3. Note when Slack notification appears
4. Note when Gmail notification arrives
5. Review Make.com execution logs
6. Calculate total time

**Performance Benchmarks**:
```
Expected Performance:
- Form capture to Make.com: < 1 minute
- Make.com processing: < 2 minutes
- Slack notification: < 3 minutes total
- Gmail notification: < 3 minutes total
```

### Load Testing

**Objective**: Test system under high volume

**Test Scenario**:
- Submit 50 test responses over 10 minutes
- Monitor execution times
- Watch for failures or timeouts

**Validation**:
- [ ] All responses processed
- [ ] No missed or duplicate responses
- [ ] Performance degradation < 50%
- [ ] No API errors

### Rate Limit Testing

**Objective**: Verify API rate limits respected

**Test Procedure**:
1. Submit responses rapidly (every 10 seconds)
2. Submit 100+ responses
3. Monitor for rate limit errors
4. Check Make.com error handling

**Validation**:
- [ ] Rate limits respected
- [ ] Graceful degradation
- [ ] Error messages clear
- [ ] Retry logic working

## Security Testing

### Credential Security

**Objective**: Verify credentials not exposed

**Test Procedure**:
1. Check all logs - no API keys visible
2. Review error messages - no credentials leaked
3. Check Make.com execution history
4. Verify .env file not in git

**Validation**:
- [ ] No credentials in logs
- [ ] Error messages generic
- [ ] API keys rotated
- [ ] .env in .gitignore

### Input Validation

**Objective**: Verify malicious input handled safely

**Test Data**:
```
SQL Injection: ' OR '1'='1
XSS Attack: <script>alert('test')</script>
Command Injection: ; rm -rf /
Null Input: (empty response)
```

**Steps**:
1. Submit each test payload
2. Monitor for errors or unexpected behavior
3. Check system stability
4. Review security logs

**Validation**:
- [ ] Input sanitized
- [ ] No injections possible
- [ ] System remains stable
- [ ] Errors logged safely

### Permission Testing

**Objective**: Verify least privilege access

**Test Procedure**:
1. Review Slack bot permissions - minimal required
2. Check Gmail permissions - only send/read
3. Verify Google Forms read-only access
4. Document all permissions

**Validation**:
- [ ] Minimum permissions granted
- [ ] No unnecessary access
- [ ] Regular permission audit

### Data Privacy

**Objective**: Verify PII handled correctly

**Test Procedure**:
1. Submit response with email address
2. Monitor data in Make.com logs
3. Check Slack message - PII masked?
4. Review Gmail content
5. Check retention policies

**Validation**:
- [ ] PII not logged unnecessarily
- [ ] Secure transmission (HTTPS/TLS)
- [ ] Compliance with GDPR/CCPA
- [ ] Data retention policies enforced

## Regression Testing

### After Updates

When deploying updates, verify:

**Existing Functionality**:
- [ ] Basic response processing works
- [ ] Slack notifications sending
- [ ] Gmail notifications sending
- [ ] Data accuracy maintained
- [ ] Performance unchanged

**New Features**:
- [ ] New feature works as specified
- [ ] Integration with existing features
- [ ] No side effects introduced
- [ ] Performance acceptable

**Previous Issues**:
- [ ] Fixed issues remain fixed
- [ ] No new similar issues
- [ ] Error handling improved

### Test Checklist

```
Pre-deployment Regression Tests:
- [ ] Submit simple form response
- [ ] Submit complex response
- [ ] Check Slack notification
- [ ] Check Gmail notification
- [ ] Review execution logs
- [ ] Verify performance metrics
- [ ] Test error scenarios
- [ ] Validate data integrity
```

## Automated Testing (Future)

### Recommended Tools

- **API Testing**: Postman, REST Assured
- **Webhook Testing**: webhook.site
- **Performance**: Apache JMeter, LoadRunner
- **Monitoring**: Datadog, New Relic

### CI/CD Integration

```yaml
# Future: GitHub Actions workflow
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate blueprint
        run: npm run validate
      - name: Test connections
        run: npm run test:connections
      - name: Performance test
        run: npm run test:performance
```

## Test Report Template

### Test Execution Summary

```
Test Date: YYYY-MM-DD
Tester: [Name]
Environment: [Dev/Staging/Prod]
Build Version: X.X.X

Tests Executed: 20
Tests Passed: 18
Tests Failed: 2
Tests Skipped: 0

Overall Status: PASS/FAIL
```

### Issues Found

```
Issue #1:
- Type: [Critical/High/Medium/Low]
- Description: [Issue description]
- Steps to Reproduce: [Steps]
- Expected Result: [Expected]
- Actual Result: [Actual]
- Status: [Open/Fixed/Closed]
```

## Quick Reference

### Test Commands

```bash
# Validate blueprint structure
# npm run validate

# Test all connections
# npm run test:connections

# Run performance tests
# npm run test:performance

# Run security tests
# npm run test:security

# Generate test report
# npm run test:report
```

### Contact Testing Team

- **QA Lead**: [Contact]
- **DevOps**: [Contact]
- **Security**: [Contact]

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Maintainer**: rkratik
