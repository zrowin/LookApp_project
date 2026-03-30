# LookApp

A modern SaaS application for managing your virtual wardrobe and creating outfit combinations.

![LookApp](https://via.placeholder.com/800x400?text=LookApp+Screenshot)

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
