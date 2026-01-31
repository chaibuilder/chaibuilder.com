<p align="center">
  <img src="https://avatars.githubusercontent.com/u/152845344?s=200&v=4" alt="ChaiBuilder" width="80" />
</p>

# Chaibuilder Next + Supabase Starter

Opinionated starter kit for building ChaiBuilder apps with Next.js (App Router) and Supabase. Follow the steps below to get a local environment running against your Supabase project.
## 1. Prepare Environment Variables
Gather these from your [Supabase Dashboard](https://supabase.com/dashboard/projects) before deploying.

### A. Create Project
* Create a new project and **save your Database Password** immediately. Supabase only shows this once.

### B. Initialize Database
1. **Schema:** Run the [DB Schema SQL](https://github.com/chaibuilder/sdk/blob/dev/src/actions/drizzle/0000_colossal_ultragirl.sql) in the **SQL Editor**.
2. **User:** Go to **Authentication > Add User**. Note the **Email/Password** for login and copy the generated **User ID**.
3. **App Key:** Run the [App Key Script](https://github.com/chaibuilder/sdk/blob/dev/frameworks/nextjs/package/scripts/create-app.sql) in the SQL Editor. 
   * *Note: Replace `YOUR_USER_ID` with the ID from the previous step before running.*
   * Copy the generated **App Key**.

### C. Collect Keys
> Connect button is in top bar

| Variable | Location |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | **Connect** > App Frameworks |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Connect** > App Frameworks |
| `SUPABASE_SECRET_KEY` | **Project Settings** > API Keys > `Secret keys` Section |
| `CHAIBUILDER_DATABASE_URL` | **Connect** > ORMs > Drizzle (Replace `[YOUR-PASSWORD]` with your DB password in URL. Copy without quotes) |
| `CHAIBUILDER_APP_KEY` | Result from Step B.3 |

---

## 2. Deploy to Vercel
Click the button below and paste the variables collected above:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchaibuilder%2Fchaibuilder-next-supabase-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,SUPABASE_SECRET_KEY,CHAIBUILDER_APP_KEY,CHAIBUILDER_DATABASE_URL&project-name=chaibuilder-nextjs&repository-name=chaibuilder-nextjs)

---

## 3. Launch
Navigate to `/editor` on your deployed URL and log in with the email/password you created in Step B.2.


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

## Tech Stack

- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime (for multi-user with page lock)

> 💡 **Multi-site support**: You can run unlimited sites on the same database instance. No need to create separate databases for each site.

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
