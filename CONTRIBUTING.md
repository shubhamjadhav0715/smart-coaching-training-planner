# Contributing to AthleteIQ

First off, thank you for considering contributing to AthleteIQ! It's people like you that make AthleteIQ such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, MongoDB version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other applications**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the existing code style** and conventions
3. **Write clear, descriptive commit messages**
4. **Include comments in your code** where necessary
5. **Update documentation** if you're changing functionality
6. **Test your changes** thoroughly before submitting

#### Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update the README.md with details of changes if applicable
3. Increase version numbers in any examples files and the README.md
4. Your PR will be reviewed by maintainers who may request changes
5. Once approved, your PR will be merged

## Development Setup

1. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/athleteiq.git
   cd athleteiq
   ```

2. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

## Coding Standards

### JavaScript/React

- Use **ES6+ syntax**
- Follow **functional programming** principles where possible
- Use **meaningful variable and function names**
- Keep functions **small and focused**
- Add **JSDoc comments** for complex functions

### Code Formatting

- Use **2 spaces** for indentation
- Use **semicolons**
- Use **single quotes** for strings
- Maximum line length: **100 characters**

### Commit Messages

Follow the conventional commits specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: Add workout analytics dashboard
fix: Resolve login authentication issue
docs: Update API documentation for training plans
```

## Project Structure

```
athleteiq/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── services/    # API services
│       └── App.js       # Main component
```

## Testing

Before submitting a PR, ensure:

- All existing tests pass
- New features include appropriate tests
- Code coverage doesn't decrease

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Questions?

Feel free to open an issue with the `question` label or contact the maintainer at itsmeshubzz07@gmail.com

## Recognition

Contributors will be recognized in the project's README.md file.

Thank you for contributing to AthleteIQ! 🎉
