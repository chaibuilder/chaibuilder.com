<p align="center">
  <img src="https://avatars.githubusercontent.com/u/152845344?s=200&v=4" alt="ChaiBuilder" width="180" />
</p>

# Chaibuilder Next + Supabase Starter

Opinionated starter kit for building ChaiBuilder apps with Next.js (App Router) and Supabase. Follow the steps below to get a local environment running against your Supabase project.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clone the repository](#1-clone-the-repository)
3. [Install dependencies](#2-install-dependencies)
4. [Provision Supabase](#3-provision-supabase)
5. [Configure environment variables](#4-configure-environment-variables)
6. [Create the initial admin user](#5-create-the-initial-admin-user)
7. [Bootstrap the ChaiBuilder app](#6-bootstrap-the-chaibuilder-app)
8. [Run the local dev server](#7-run-the-local-dev-server)
9. [Additional scripts](#additional-scripts)

---

## Prerequisites

- **Node.js 21+** (recommend via [nvm](https://github.com/nvm-sh/nvm)).
- **pnpm** ≥ 10 or **npm** ≥ 10.
- **Git** with SSH access to GitHub.
- A **Supabase** account with project creation permissions.

> ℹ️ This README references Supabase credentials that are currently live. Treat them as secrets—avoid committing them elsewhere and rotate them if you believe they may have leaked.

---

## 1. Clone the repository

```bash
git clone git@github.com:chaibuilder/chaibuilder-next-supabase-starter.git
cd chaibuilder-next-supabase-starter
```

---

## 2. Install dependencies

Install with your preferred package manager:

```bash
# pnpm (recommended)
pnpm install

# or npm
npm install
```

## 3. Provision Supabase

1. Log in to the [Supabase dashboard](https://supabase.com/dashboard/projects) and create a **new project**.
2. Choose the organization, project name, and region that best match your team.
3. Wait for the database to finish provisioning before continuing.

### Supabase credentials for this starter

| Variable                        | Value                                 |
| ------------------------------- | ------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://your-project-id.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key`                       |
| `SUPABASE_SERVICE_KEY`          | `your-service-key`                    |
| `CHAIBUILDER_DATABASE_URL`      | `your-db-url`                         |

> 🔐 **Security tip:** Store the keys in your environment files only. Never commit them to version control. Replace `[YOUR-PASSWORD]` with the database password shown when you created the project (or reset it from **Project settings → Database** if you no longer have it).

---

## 4. Configure environment variables

Copy the example file (if present) or create new ones as needed:

```bash
cp .env.example .env.local  # create the .env file in root directory
```

Populate `.env.local` (for Next.js runtime) and `.env` (for CLI tooling) with the Supabase credentials:

```dotenv
# .env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
CHAIBUILDER_DATABASE_URL=
```

---

## 5. Create the initial admin user

1. Navigate to **Authentication → Users** inside the Supabase dashboard.
2. Add a new user that will act as your **admin**. Use an email address you control and set a strong password.
3. Copy the newly created user's **UUID** (visible in the user details sidebar). You will need this value when running `npx create-app`.

---

## 6. Bootstrap the ChaiBuilder app

Run the project scaffolding command once your environment variables are in place:

```bash
npx create-app
```

The script will prompt for the admin user UUID. It reads database url from `.env`/`.env.local` automatically. Rerun the command whenever you need to regenerate local configuration.

This will create the necessary tables and seed data for the ChaiBuilder app and show `CHAIBUILDER_APP_KEY` in the console. Copy this key and add it to your `.env` file.

---

## 7. Run the local dev server

```bash
pnpm dev
# or
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Additional scripts

| Command                        | Description                           |
| ------------------------------ | ------------------------------------- |
| `pnpm build` / `npm run build` | Create an optimized production build. |

---

## Troubleshooting

- **Missing environment variables**: Ensure `.env` exists and contains the Supabase keys before starting the dev server.
- **Authentication errors**: Confirm the admin user exists and you copied the correct UUID.
- **Database connection issues**: Reset the database password in Supabase and update `CHAIBUILDER_DATABASE_URL` accordingly.

---

## Resources

- [ChaiBuilder](https://docs.chaibuilder.com)
- [Supabase documentation](https://supabase.com/docs)
- [Next.js App Router docs](https://nextjs.org/docs/app)

Happy building! ☕️
