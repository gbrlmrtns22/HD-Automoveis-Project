# Security

## Data Protection

- Sensitive lead fields (name, email, WhatsApp) are encrypted server-side using `AES-256-GCM`.
- Encryption keys are stored in environment variables and rotated manually.

## RLS

- RLS is enabled on all tables.
- Public read access is granted to published vehicles only.
- Admin actions require authenticated users with `user_metadata.role = 'admin'`.

## Rate Limiting

- Upstash Redis rate limiting is applied to lead submissions and auth endpoints.

## CSP

- CSP headers are configured in middleware for secure defaults.

## Webhooks

- All webhook requests are verified using HMAC signatures and replay protection.
