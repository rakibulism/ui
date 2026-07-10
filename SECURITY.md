# Security Policy

## Supported Versions

`rakibulism-ui` is pre-1.0 and evolves quickly — only the latest published
version on npm is supported. If you're on an older `0.x` release, please
upgrade before reporting an issue; it may already be fixed.

| Version | Supported          |
| ------- | ------------------ |
| Latest (`0.6.x`) | :white_check_mark: |
| Older `0.x` releases | :x: |

## Reporting a Vulnerability

Please **do not** open a public issue for security vulnerabilities.

Instead, use GitHub's private vulnerability reporting:

1. Go to the [Security tab](https://github.com/rakibulism/ui/security) of
   this repository.
2. Click **Report a vulnerability**, or use this direct link:
   [github.com/rakibulism/ui/security/advisories/new](https://github.com/rakibulism/ui/security/advisories/new).
3. Include as much detail as you can: affected version, a minimal
   reproduction, and the potential impact.

This creates a private draft security advisory visible only to maintainers,
so the issue can be discussed and fixed before any public disclosure.

## What to Expect

- We'll acknowledge your report as soon as we can.
- If confirmed, we'll work on a fix and coordinate a release + public
  advisory with you, crediting reporters who want credit.
- If it turns out not to be a vulnerability, we'll explain why and, if it's
  still a bug, ask you to file a normal issue instead.

## Scope

This library ships React components, CSS, and a Node-based scaffolding CLI
(`npx rakibulism-ui`). In scope: XSS or injection vectors in component
output, unsafe handling of user-controlled props, and anything in the CLI
that reads/writes files outside the intended project directory. Out of
scope: vulnerabilities in dependencies themselves (report those upstream,
e.g. to the [Base UI](https://github.com/mui/base-ui) or
[React](https://github.com/facebook/react) repositories) — though we'll
happily hear about them too if they specifically affect how this library
uses them.
