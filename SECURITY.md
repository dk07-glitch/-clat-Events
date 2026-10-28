# Security Policy

## Supported Versions

As a static, single-page web application, Éclat Events does not have versioned server-side releases. The table below reflects the maintenance status of the project's published branches.

| Version / Branch | Supported          |
| ---------------- | ------------------ |
| `main`           | ✅ Yes             |
| Older tags       | ❌ No              |

---

## Reporting a Vulnerability

If you discover a security vulnerability, **please do not open a public GitHub issue**. Instead:

1. **Email** the maintainers at: `security@eclat-events.example.com`
2. Include:
   - A clear description of the vulnerability
   - Steps to reproduce it
   - The potential impact
   - (Optional) A suggested fix or patch
3. You will receive an acknowledgement within **48 hours**.
4. We aim to triage and resolve confirmed vulnerabilities within **7 days**.
5. We will credit responsible disclosures in the release notes (unless you prefer to remain anonymous).

---

## Security Considerations

### No Server-Side Code
Éclat Events is a **100% static, client-side** application. There is no backend, no database, and no server-side processing of any kind. The attack surface is therefore limited to the browser environment.

### No User Data Stored
- The inquiry form performs **client-side validation only**.
- **No form data is ever transmitted** to any server or third party.
- **No cookies** are set by this application.
- **No localStorage or sessionStorage** is written with personally identifiable information.

### Third-Party CDN Resources
This project loads external resources from trusted CDNs:

| Resource       | CDN                        | Notes                                  |
| -------------- | -------------------------- | -------------------------------------- |
| Google Fonts   | `fonts.googleapis.com`     | Font files only; no JS execution       |
| Font Awesome   | `cdnjs.cloudflare.com`     | CSS + font files; use `integrity` attr when pinning versions |

**Recommendation for production deployments:** Pin CDN resources using Subresource Integrity (SRI) hashes and add the `crossorigin="anonymous"` attribute, for example:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  integrity="sha512-..."
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

### Content Security Policy (CSP)
For production hosting (e.g., GitHub Pages, Netlify), we recommend adding a strict CSP header or `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src https://fonts.gstatic.com https://cdnjs.cloudflare.com; script-src 'self' 'unsafe-inline'; img-src 'self' data: https:;">
```

### XSS Considerations
- No user-supplied content is rendered back into the DOM via `innerHTML` with unsanitized data.
- All dynamic DOM manipulation uses `textContent` or creates elements programmatically.

---

## Acknowledgements

We follow the [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories) process for coordinated disclosure.
