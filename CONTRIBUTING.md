# Contributing to Éclat Events

Thank you for your interest in contributing! 🎉 We welcome bug reports, feature suggestions, and pull requests.

---

## 🐛 Reporting Issues

1. Check the [existing issues](../../issues) first to avoid duplicates.
2. Use the **Bug Report** template when filing a new issue.
3. Include:
   - Browser name & version
   - Operating system
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if applicable

---

## 💡 Suggesting Features

1. Open a **Feature Request** issue with the tag `enhancement`.
2. Describe the problem your feature solves.
3. Provide mockups or examples if possible.
4. Be specific about the expected behavior.

---

## 🎨 Code Style Guidelines

### HTML
- Use **semantic HTML5** elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- All images must include `alt` attributes.
- Indent with **2 spaces**.
- Keep accessibility in mind — use ARIA labels on icon-only buttons.

### CSS
- Follow a **BEM-inspired** naming convention: `.block__element--modifier`.
- Use **CSS custom properties** (`--variable-name`) for colors, spacing, and transitions.
- Mobile-first: write base styles for small screens, then use `@media (min-width: ...)` for larger breakpoints.
- Prefer `rem`/`em` over `px` for font sizes and spacing.

### JavaScript
- **Vanilla JS only** — no frameworks or libraries.
- Target **ES2020** syntax (arrow functions, `const`/`let`, template literals, optional chaining).
- Use `'use strict'` implicitly through ES modules where applicable.
- Prefer `addEventListener` over inline `on*` handlers.
- Comment non-obvious logic clearly.
- Avoid polluting the global namespace — wrap logic in IIFEs or modules as needed.

---

## 🔀 Pull Request Process

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes, following the code style guidelines above.
3. Test your changes using `tests/validation.html`.
4. Commit with a descriptive message using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add venue map integration
   fix: correct gallery filter on mobile
   docs: update README with new screenshots
   ```
5. Push your branch and open a **Pull Request** against `main`.
6. Fill out the PR template, referencing any related issues.
7. A maintainer will review within 48 hours.

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
