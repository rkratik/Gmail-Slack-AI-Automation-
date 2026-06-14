# Contributing Guidelines

Thank you for your interest in contributing to the Gmail-Slack AI Automation project! This document provides guidelines for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Commit Guidelines](#commit-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Coding Standards](#coding-standards)
7. [Testing Requirements](#testing-requirements)
8. [Documentation Standards](#documentation-standards)

## Code of Conduct

### Our Commitment

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct:

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive criticism
- Report inappropriate behavior

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing opinions
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Personal attacks or insults
- Trolling or inflammatory comments
- Publishing others' private information
- Other unethical or unprofessional conduct

## Getting Started

### Prerequisites

- GitHub account
- Git knowledge (basic)
- Familiarity with the project
- Development environment setup (see SETUP.md)

### Setup Development Environment

1. **Fork the Repository**
   ```bash
   # Go to GitHub repo
   # Click "Fork" button
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Gmail-Slack-AI-Automation-.git
   cd Gmail-Slack-AI-Automation-
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/rkratik/Gmail-Slack-AI-Automation-.git
   git fetch upstream
   ```

4. **Create Development Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Install Dependencies**
   ```bash
   # If applicable
   npm install
   # or
   pip install -r requirements.txt
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:

```
feature/add-email-templating
fix/slack-message-formatting
docs/update-setup-guide
test/add-integration-tests
chore/update-dependencies
```

### Making Changes

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow project conventions
   - Update documentation
   - Add tests for new features

3. **Commit Regularly**
   ```bash
   git add .
   git commit -m "descriptive message"
   ```

4. **Keep Branch Updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature
   ```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

### Scope

Affected component:
- `blueprint`: Blueprint changes
- `slack`: Slack integration
- `gmail`: Gmail integration
- `forms`: Google Forms integration
- `docs`: Documentation
- `config`: Configuration files

### Subject

- Use imperative mood ("add feature" not "added feature")
- Don't capitalize first letter
- No period at the end
- Limit to 50 characters

### Body

- Explain what and why, not how
- Wrap at 72 characters
- Reference issues: "Fixes #123"

### Examples

```
feat(slack): add message formatting options

Add support for rich message formatting in Slack notifications.
Users can now customize message blocks and styling.

Fixes #45
```

```
fix(gmail): prevent duplicate email sends

Implement deduplication logic to prevent sending the same
notification email twice when responses are processed.

Relates to #123
```

## Pull Request Process

### Before Submitting

- [ ] Code follows project standards
- [ ] All tests pass locally
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] Branch is up-to-date with main

### Creating a Pull Request

1. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature
   ```

2. **Create PR on GitHub**
   - Go to original repository
   - Click "Compare & pull request"
   - Fill in PR template

3. **PR Description Template**

   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Documentation update

   ## Related Issues
   Closes #123

   ## Changes Made
   - Change 1
   - Change 2
   - Change 3

   ## Testing
   How to test these changes:
   1. Step 1
   2. Step 2

   ## Checklist
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

### PR Review Process

1. **Automated Checks**
   - Tests must pass
   - Code review from maintainers

2. **Feedback**
   - Address review comments
   - Push new commits
   - Respond to all comments

3. **Approval & Merge**
   - Requires 2 approvals
   - Passes all checks
   - Can be merged by maintainers

## Coding Standards

### Blueprint JSON

- Use 4-space indentation
- Keep modules focused
- Add metadata/comments
- Validate against schema

### Documentation

- Use clear, concise language
- Include examples where helpful
- Update table of contents
- Keep links working

### Environment Variables

- Use `.env.example` for templates
- Never commit `.env` files
- Document all variables
- Use clear naming conventions

### Error Handling

- Provide meaningful error messages
- Log errors appropriately
- Handle edge cases
- Test error scenarios

## Testing Requirements

### New Features

- [ ] Unit tests written
- [ ] Integration tests added
- [ ] Error cases tested
- [ ] Performance tested

### Bug Fixes

- [ ] Test added for bug
- [ ] Existing tests still pass
- [ ] No regressions
- [ ] Edge cases covered

### Documentation

- [ ] README updated if needed
- [ ] SETUP.md reflects changes
- [ ] Examples provided
- [ ] Troubleshooting added

### Test Execution

```bash
# Run all tests
npm run test

# Run specific test
npm run test:unit

# Run with coverage
npm run test:coverage

# Integration tests
npm run test:integration
```

## Documentation Standards

### README Updates

When adding features:
- Add to features list
- Update quick start if needed
- Add to troubleshooting if applicable

### New Documentation Files

- Use clear structure with headings
- Include table of contents
- Add examples
- Link to related docs

### Comment Guidelines

```json
// Use comments sparingly
// Explain WHY, not WHAT (code shows what)
"formId": "1AuIMJJsKhiJiMsnIhbKJnMzqtq1iPpSVCEM2m_MxmF4",  // Target form for automation
```

### Documentation Checklist

- [ ] Heading hierarchy correct
- [ ] Links working
- [ ] Code examples valid
- [ ] Formatting consistent
- [ ] Proofreading done

## Common Contributions

### Adding a New Integration

1. Create feature branch
2. Implement new module
3. Add configuration section
4. Write integration tests
5. Update documentation
6. Submit PR

### Fixing a Bug

1. Confirm bug with test
2. Create fix
3. Verify fix with test
4. Check for regressions
5. Document fix in CHANGELOG.md
6. Submit PR

### Improving Documentation

1. Identify gap or issue
2. Research and clarify
3. Update documentation
4. Submit PR for review

## Questions?

- Check [README.md](README.md)
- Review [SETUP.md](SETUP.md)
- Check GitHub issues
- Ask in PR comments
- Start a discussion

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md (coming soon)
- Acknowledged in release notes
- Thanked in README.md

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing!** 🎉

Your contributions help make this project better for everyone.

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
