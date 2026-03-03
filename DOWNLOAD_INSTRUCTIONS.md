# Hotels.pak - Download Instructions

## 📁 Project Structure

Your Hotels.pak website contains the following files:

### Core Application Files:
```
hotels-pak/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx              # Main layout
│   ├── globals.css             # Global styles
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── admin/page.tsx          # Admin dashboard
│   └── hotels/
│       ├── page.tsx            # Hotels listing
│       ├── [id]/page.tsx       # Hotel details
│       └── [id]/layout.tsx     # Hotel layout
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── AuthModal.tsx           # Login/signup modal
│   ├── BookingModal.tsx        # Booking form
│   ├── HotelMap.tsx           # Interactive map
│   └── GoBackButton.tsx       # Back navigation
├── lib/
│   ├── hotels-data.ts          # Hotel data
│   ├── supabase.ts            # Database config
│   ├── database-types.ts       # TypeScript types
│   ├── database-functions.ts   # Database operations
│   ├── google-forms-config.ts  # Forms integration
│   └── utils.ts               # Utilities
├── supabase/migrations/        # Database migrations
├── package.json               # Dependencies
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── .env.local                # Environment variables
└── README.md                 # Documentation
```

## 🚀 Setup Instructions After Download:

### 1. Install Dependencies
```bash
cd hotels-pak
npm install
```

### 2. Configure Environment Variables
Update `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Setup Google Forms (Optional)
- Edit `lib/google-forms-config.ts`
- Add your Google Form IDs and entry field IDs
- Follow the detailed instructions in the file

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 📧 Email Integration
- Contact forms send to: azkarullhassan7@gmail.com
- Booking confirmations include all details
- Google Forms integration for data collection

## 🗄️ Database Setup
- Uses Supabase for backend
- Migrations included for schema setup
- Admin dashboard for management

## 🌐 Deployment
- Ready for Vercel, Netlify, or any hosting platform
- Static export configured in next.config.js
- All dependencies included

## 📞 Support
For any issues or questions:
- Email: azkarullhassan7@gmail.com
- Check README.md for detailed documentation

---
Built with Next.js, TypeScript, Tailwind CSS, and Supabase