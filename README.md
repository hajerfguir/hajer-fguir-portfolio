# Hajer Fguir Portfolio

Professional portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

Live: https://www.hajerfguir.com
Repository: https://github.com/hajerfguir/hajer-fguir-portfolio

## Overview

This project is a modern portfolio website for showcasing professional experience, projects, skills, education, and contact information. It uses a clean, responsive interface and includes secure server-side email handling through Resend.

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Resend
- GitHub Actions
- Vercel

## CI/CD flow

- Code is pushed to GitHub.
- GitHub Actions runs dependency installation, linting, and a production build.
- If checks pass, the app is deployed to Vercel.
- Deployment is blocked if CI fails.

## Local development

```bash
git clone https://github.com/hajerfguir/hajer-fguir-portfolio.git
cd hajer-fguir-portfolio
pnpm install
pnpm dev
```

Create a local environment file if needed:

```bash
touch .env.local
```

Required secret:

```env
RESEND_API_KEY=your_resend_api_key
```

Then open:

```text
http://localhost:3000
```

## Production setup

The app is deployed on Vercel and uses environment variables for sensitive values. The contact API keeps the Resend key server-side and does not expose it to the browser.

## Commands

```bash
pnpm install
pnpm run lint
pnpm run build
pnpm dev
```

## Notes

This project is designed to be simple, fast, and deployment-friendly, with CI/CD validating the app before production release.
