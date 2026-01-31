<p align="center">
  <img src="https://avatars.githubusercontent.com/u/152845344?s=200&v=4" alt="ChaiBuilder" width="80" />
</p>

# Chaibuilder Next + Supabase Starter

Opinionated starter kit for building ChaiBuilder apps with Next.js (App Router) and Supabase. Follow the steps below to get a local environment running against your Supabase project.

## Steps:

1. Log in to the [Supabase dashboard](https://supabase.com/dashboard/projects) and create a **new project**.
2. Impor the Database schema in SQL editor. [DB Schema](https://github.com/chaibuilder/sdk/blob/dev/src/actions/drizzle/0000_colossal_ultragirl.sql)
3. Create a user or use an existing one.
   - Goto Authentication -> Add User
   - Add email / password ( will be used later to login )
   - Copy the user id generated
4. Create a new APP_KEY by running [the script](https://github.com/chaibuilder/sdk/blob/dev/frameworks/nextjs/package/scripts/create-app.sql) in SQL Editor. Replace the `USER_ID` before running script.

## Deploying to Vercel
Click deploy to start. [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchaibuilder%2Fchaibuilder-next-supabase-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,SUPABASE_SECRET_KEY,CHAIBUILDER_APP_KEY,CHAIBUILDER_DATABASE_URL&project-name=chaibuilder-nextjs&repository-name=chaibuilder-nextjs)

Deployment process with ask to enter ENV variables as below.
| Variable                                       | Value                                            |
| ---------------------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`                     | `https://****.supabase.co` (Goto: Connect -> App Frameworks )             |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `your-publishable-default-key` (Goto: Connect -> App Frameworks)  |
| `SUPABASE_SECRET_KEY`                          | `your-secret-key` (Goto: Project Settings -> API Keys -> Secret Keys)                  |
| `CHAIBUILDER_DATABASE_URL`                     | `your-db-url` (Goto Connect -> ORMs -> Drizzle)  |
| `CHAIBUILDER_APP_KEY `                         | Copy from step 4 above


## Post deployment:
Visit the /editor path on your deployed url. Login with email password credentials and start building.


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
