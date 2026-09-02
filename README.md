# Hajer Fguir Portfolio

A modern personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS to present academic background, professional experience, certifications, skills, and contact information.

- Live portfolio: https://www.hajerfguir.com
- GitHub repository: https://github.com/hajerfguir/hajer-fguir-portfolio

## Overview

This portfolio is designed to showcase technical work, academic achievements, and professional interests in software engineering, cybersecurity, AI, and modern web development. The site includes a polished responsive layout, project highlights, educational background, and a contact form powered by a secure server-side API.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- Vercel
- Resend for email delivery
- ESLint for code quality checks

## Key Features

- Responsive portfolio layout for desktop and mobile devices
- Sections for education, projects, experience, skills, and certifications
- Dark-mode-inspired design and polished UI components
- Contact form with secure backend email handling
- CI-friendly setup for production deployment

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18+
- pnpm
- A Resend API key for the contact form

## Installation

```bash
git clone https://github.com/hajerfguir/hajer-fguir-portfolio.git
cd hajer-fguir-portfolio
pnpm install
```

## Environment Variables

Create a `.env.local` file in the project root and add:

```env
RESEND_API_KEY=your_resend_api_key
```

## Local Development

```bash
pnpm dev
```

Then open the local development URL shown in the terminal.

## Production Scripts

```bash
pnpm lint
pnpm build
pnpm start
```

## Deployment

This application is intended for deployment on Vercel. Environment variables are managed securely through the platform settings, and the contact API keeps sensitive credentials server-side instead of exposing them to the browser.

## Notes

The project combines modern frontend tooling with clean design and production-ready deployment practices, making it suitable for showcasing technical expertise and professional work in a polished portfolio format.
