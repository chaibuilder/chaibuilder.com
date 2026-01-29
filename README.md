<p align="center">
  <img src="https://avatars.githubusercontent.com/u/152845344?s=200&v=4" alt="ChaiBuilder" width="80" />
</p>

# Chaibuilder Next + Supabase Starter

Opinionated starter kit for building ChaiBuilder apps with Next.js (App Router) and Supabase. Follow the steps below to get a local environment running against your Supabase project.

## Tech Stack

- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime (for multi-user with page lock)

> 💡 **Multi-site support**: You can run unlimited sites on the same database instance. No need to create separate databases for each site.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#1-clone-the-repository) - Clone, install dependencies
3. [Supabase Setup](#3-provision-supabase) - Provision, database schema, environment variables, admin user
4. [Bootstrap & Run](#7-bootstrap-the-chaibuilder-app) - Initialize app and start dev server

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
2. Choose the organization, project name, and region that best match your requirements.
3. Wait for the database to finish provisioning before continuing.

### Supabase credentials for this starter

| Variable                                       | Value                                            |
| ---------------------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`                     | `https://your-project-id.supabase.co`            |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `your-publishable-default-key` (Publishable key) |
| `SUPABASE_SECRET_KEY`                          | `your-secret-key` (Secret Keys)                  |
| `CHAIBUILDER_DATABASE_URL`                     | `your-db-url` (Goto Connect -> ORMs -> Drizzle)  |

> 🔐 **Security tip:** Store the keys in your environment files only. Never commit them to version control. Replace `[YOUR-PASSWORD]` with the database password shown when you created the project (or reset it from **Project settings → Database** if you no longer have it).

---

## 4. Setup Supabase Database Schema

Before configuring environment variables, you need to manually create the database tables in Supabase.

1. Navigate to the [ChaiBuilder SDK drizzle folder](https://github.com/chaibuilder/sdk/tree/dev/src/actions/drizzle) on GitHub.
2. Copy the SQL schema files (`.sql` files) from that directory.
3. In your Supabase dashboard, go to **SQL Editor**.
4. Paste and execute the SQL schema to create the necessary tables.

---

## 5. Create the initial admin user

1. Navigate to **Authentication → Users** inside the Supabase dashboard.
2. Add a new user that will act as your **admin**. Use an email address you control and set a strong password.
3. Copy the newly created user's **UUID** (visible in the user details sidebar). You will need this value to bootstrap the ChaiBuilder app.

---

## 6. Bootstrap the ChaiBuilder app

1. Navigate to the [ChaiBuilder create-app.sql script](https://github.com/chaibuilder/sdk/blob/dev/frameworks/nextjs/package/scripts/create-app.sql) on GitHub.
2. Copy the sql query.
3. In your Supabase dashboard, go to **SQL Editor**.
4. Paste the query in the Supabase SQL Editor and replace the `YOUR_USER_ID` with the UUID of the admin user you created in step 5.
5. If you wish to change the Project name, you can do so by replacing the `My ChaiBuilder App` with your desired project name.
6. Execute the query.
7. You will get the `CHAIBUILDER_APP_KEY` in the response. Copy it and use it in the `.env` file.

---

## 7. Configure environment variables

Copy the example file (if present) or create new ones as needed:

```bash
cp .env.sample .env  # create the .env file in root directory
```

Populate `.env` with the Supabase credentials:

```dotenv
# .env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
SUPABASE_SECRET_KEY=
CHAIBUILDER_DATABASE_URL=
CHAIBUILDER_APP_KEY=
```

### Optional: Enable AI Features

To enable AI-powered features in ChaiBuilder, add your Vercel AI Gateway API key:

```dotenv
AI_GATEWAY_API_KEY=your-vercel-ai-gateway-key
```

This enables the following AI features:

- **Generate/Edit UI**: AI-powered component generation and editing
- **Generate SEO fields**: Automatic SEO metadata generation
- **Translate content**: Multi-language content translation
- **Edit styles**: AI-assisted styling suggestions

> 💡 Get your Vercel AI Gateway key from the [Vercel Dashboard](https://vercel.com/docs/ai-gateway).

---

## 8. Run the local dev server

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

## Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchaibuilder%2Fchaibuilder-next-supabase-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,SUPABASE_SECRET_KEY,CHAIBUILDER_APP_KEY,CHAIBUILDER_DATABASE_URL&project-name=chaibuilder-nextjs&repository-name=chaibuilder-nextjs)

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
