<p align="center">
  <img src="https://avatars.githubusercontent.com/u/152845344?s=200&v=4" alt="ChaiBuilder" width="80" />
</p>

# Chaibuilder Next + Supabase Starter

An opinionated starter kit for building ChaiBuilder apps with Next.js (App Router) and Supabase. 

> ⚡️ **Fully Online Setup:** You can complete the entire deployment process in your browser. No local environment or coding is required to get your site live

---

## 1. Prepare Environment Variables

Gather these from your <a href="https://supabase.com/dashboard/projects" target="_blank">Supabase Dashboard</a> before clicking deploy.

### A. Create Project
* Create a new project and **save your Database Password** immediately. Supabase only shows this once.

### B. Initialize Database in Supabase

1. **Schema:** Run the <a href="https://github.com/chaibuilder/sdk/blob/dev/src/actions/drizzle/0000_colossal_ultragirl.sql" target="_blank">DB Schema SQL</a> in the **SQL Editor**.
2. **User:** Go to **Authentication > Add User**. Note the **Email/Password** for login and copy the generated **User ID**.
3. **App Key:** Run the <a href="https://github.com/chaibuilder/sdk/blob/dev/frameworks/nextjs/package/scripts/create-app.sql" target="_blank">App Key Script</a> in the SQL Editor.
   - _Note: Replace `YOUR_USER_ID` with the ID from the previous step before running._
   - Copy the generated **App Key**.

### C. Create Storage Bucket
1. Go to **Storage** in your Supabase project.
2. Create a new bucket named `dam-assets`.
3. Set the bucket to **Public**.

### D. Collect Keys
> 💡 The "Connect" button is located in the top bar of the Supabase dashboard.

| Variable | Location |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | **Connect** > App Frameworks |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | **Connect** > App Frameworks |
| `SUPABASE_SECRET_KEY` | **Project Settings** > API Keys > `Secret keys` Section |
| `CHAIBUILDER_DATABASE_URL` | **Connect** > ORMs > Drizzle (Replace `[YOUR-PASSWORD]` with your DB password. Copy without quotes.) |
| `CHAIBUILDER_APP_KEY` | Result from Step B.3 |

---

## 2. Deploy to Vercel
Click the button below and paste the variables collected above into the Vercel deployment form:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchaibuilder%2Fchaibuilder-next-supabase-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,SUPABASE_SECRET_KEY,CHAIBUILDER_APP_KEY,CHAIBUILDER_DATABASE_URL&project-name=chaibuilder-nextjs&repository-name=chaibuilder-nextjs)

---

## 3. Launch
Navigate to `/editor` on your deployed URL and log in with the email/password you created in Step B.2.

---

## Optional: Local Setup
If you prefer to develop or customize the starter kit locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chaibuilder/chaibuilder-next-supabase-starter.git
2. Set Environment Variables: Create a .env file in the root and add the keys collected in Step 1.D.
3. Install & Run:
```bash
npm install
npm run dev
```
4. Access the local editor at http://localhost:3000/editor.

### Optional: Enable AI Features
To enable AI-powered features (UI generation, SEO, and translation), add your Vercel AI Gateway API key to your environment variables:

Code snippet
```bash
AI_GATEWAY_API_KEY=your-vercel-ai-gateway-key
```

> 💡 Get your Vercel AI Gateway key from the <a href="https://vercel.com/docs/ai-gateway" target="_blank">Vercel Dashboard</a>.

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
- **Do not have access to edit website**: Ensure the records in `app_users` table have the correct entry for `user` and `app` columns.

---

## Resources

- <a href="https://docs.chaibuilder.com" target="_blank">ChaiBuilder</a>
- <a href="https://supabase.com/docs" target="_blank">Supabase documentation</a>
- <a href="https://nextjs.org/docs/app" target="_blank">Next.js App Router docs</a>

Happy building! ☕️
