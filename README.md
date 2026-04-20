# LookApp

A modern SaaS application for managing your virtual wardrobe and creating outfit combinations.

![LookApp](https://via.placeholder.com/800x400?text=LookApp+Screenshot)

## Spis treści — Business Analysis

Poniżej krótki spis plików z folderu [docs/business-analysis](docs/business-analysis) z bardzo krótkim opisem zawartości:

- [Competitor_audit_LookApp.md](docs/business-analysis/Competitor_audit_LookApp.md): Analiza konkurencji — kluczowe insighty i lista konkurentów.
- [Files_Structure.md](docs/business-analysis/Files_Structure.md): Opis struktury repozytorium i wskazówki uruchomienia.
- [GTM_Strategy.md](docs/business-analysis/GTM_Strategy.md): Strategia wejścia na rynek, cele i plan na pierwsze miesiące.
- [ICP_Persona_LookApp.md](docs/business-analysis/ICP_Persona_LookApp.md): Profil idealnego klienta (ICP) i persony z rekomendacjami.
- [Job_To_Be_Done_LookApp.md](docs/business-analysis/Job_To_Be_Done_LookApp.md): Krótkie mapowanie "Job To Be Done" i hipotezy walidacyjne.
- [Kill_the_idea-lookapp.md](docs/business-analysis/Kill_the_idea-lookapp.md): Pre‑mortem — analiza ryzyk i możliwych przyczyn porażki.
- [Monetization_Strategy.md](docs/business-analysis/Monetization_Strategy.md): Propozycje modelu przychodów i struktury tiery.
- [MVP_Scoping.md](docs/business-analysis/MVP_Scoping.md): Zakres MVP i kluczowe metryki walidacyjne.
- [opis-projektu-lookapp.md](docs/business-analysis/opis-projektu-lookapp.md): Krótki opis projektu, cele i docelowy użytkownik.
- [Resource_Analysis.md](docs/business-analysis/Resource_Analysis.md): Analiza zasobów i plan działania.
- [Tech_Stack_Audit_LookApp.md](docs/business-analysis/Tech_Stack_Audit_LookApp.md): Rekomendacje stacku technologicznego dla MVP.
- [User_Journey_Map.md](docs/business-analysis/User_Journey_Map.md): Mapa ścieżki użytkownika i kluczowe metryki sukcesu.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **State Management**: React hooks + context
- **Code Quality**: ESLint, Prettier, TypeScript

## Features

- 📸 Upload and organize clothing photos
- ✂️ Automatic background removal
- 👗 Virtual wardrobe management
- 🎨 Drag-and-drop outfit builder
- 💾 Save and manage outfit combinations
- 📱 Responsive design for mobile and desktop
- 🔐 User authentication with Supabase Auth
- 💳 Subscription management with Stripe

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm, yarn, or pnpm
- A Supabase project (for authentication and database)
- A Stripe account (for payments)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/lookapp.git
cd lookapp
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment variables template:

```bash
cp .env.example .env.local
```

4. Fill in your environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

## Supabase storage setup

To create the `clothing-images` bucket and apply example RLS, you can run the helper script locally or trigger the GitHub Action.

Locally:

```bash
# set environment variables (PowerShell / Windows example)
set SUPABASE_URL=your-supabase-url
set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
node scripts/setup_supabase_storage.js
```

Via GitHub Actions (recommended for CI):

1. Add repository secrets: `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
2. Go to the Actions tab → `Setup Supabase Storage` workflow → Run workflow → `Run workflow`.

To create the `images` table and sample RLS policies, open `docs/supabase/images_table_and_rls.sql` and paste into Supabase SQL editor (or run via psql with proper DB connection).

## Local upload test

A quick local integration test is provided to validate the upload + thumbnail flow without real Supabase credentials. It uses a mocked Supabase client and sharp to generate a thumbnail.

Requirements:
- Node 20+
- Dependencies installed (`npm install`)

Run the test:

```powershell
npm run test:upload
```

Notes:
- The `test:upload` script runs `scripts/run-upload-test.js` with `ts-node` and `tsconfig-paths` so TypeScript modules and path aliases resolve correctly.
- The script uses `--no-warnings` to suppress environment warnings during the test; this does not change project configuration.
- If you prefer a Jest-based test harness, I can add `jest`/`ts-jest` tests instead.

### Reviewing test output

- The quick test prints its output to the terminal (console). Look for the `Test result:` object and the final `UPLOAD TEST: OK` or error lines.
- Location of test files and scripts:
	- `scripts/run-upload-test.js` — runner used by `npm run test:upload`
	- `src/app/api/upload/route.ts` — `handleUpload()` implementation exercised by the test
	- `src/lib/images/thumbnail.ts` — thumbnail generator used in the flow
- If the test fails, copy the terminal error trace and open the related file above — the stack trace typically points to the failing module and line number.
- For CI runs (GitHub Actions), check the Actions run logs in the repository UI (Actions → workflow run → Logs) for step output and artifacts.




## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes group
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/         # Protected routes
│   │   ├── wardrobe/
│   │   ├── outfit-builder/
│   │   ├── outfits/
│   │   └── settings/
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing/Home
├── components/
│   ├── ui/                  # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   └── features/            # Feature-specific components
│       ├── upload/
│       ├── canvas/
│       ├── wardrobe/
│       └── outfits/
├── hooks/                    # Custom React hooks
│   └── useUser.ts
├── lib/
│   ├── supabase/            # Supabase client setup
│   │   └── client.ts
│   └── utils.ts             # Utility functions
├── types/                    # TypeScript types
│   └── index.ts
└── middleware.ts             # Auth middleware
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Zuzanna Grześkowiak
- Zofia Rowińska

---

Built with ❤️ for fashion enthusiasts everywhere.


