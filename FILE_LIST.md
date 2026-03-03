# 📋 Hotels.pak - Complete File List

## **All Files You Need to Copy:**

### **🔧 Configuration Files (Root Directory):**
```
package.json                    # Dependencies and scripts
next.config.js                 # Next.js configuration
tailwind.config.ts             # Tailwind CSS config
tsconfig.json                  # TypeScript configuration
postcss.config.js              # PostCSS configuration
components.json                # Shadcn/UI configuration
netlify.toml                   # Deployment configuration
.eslintrc.json                 # ESLint configuration
.env.local                     # Environment variables
README.md                      # Project documentation
DOWNLOAD_GUIDE.md              # This download guide
FILE_LIST.md                   # This file list
```

### **🏠 App Directory (app/):**
```
app/page.tsx                   # Homepage with hotel search
app/layout.tsx                 # Main layout with navbar
app/globals.css                # Global styles and animations
app/about/page.tsx             # About page
app/contact/page.tsx           # Contact form with Google Forms
app/admin/page.tsx             # Admin dashboard
app/hotels/page.tsx            # Hotels listing with filters
app/hotels/[id]/page.tsx       # Individual hotel details
app/hotels/[id]/layout.tsx     # Hotel layout for static generation
```

### **🧩 Components Directory (components/):**
```
components/Navbar.tsx          # Navigation bar with auth
components/AuthModal.tsx       # Login/signup modal
components/BookingModal.tsx    # Hotel booking form
components/HotelMap.tsx        # Interactive Leaflet map
components/GoBackButton.tsx    # Back navigation button
```

### **📚 Library Directory (lib/):**
```
lib/hotels-data.ts             # Hotel data and search functions
lib/supabase.ts                # Supabase client configuration
lib/database-types.ts          # TypeScript database types
lib/database-functions.ts      # Database operations
lib/google-forms-config.ts     # Google Forms integration setup
lib/utils.ts                   # Utility functions
```

### **🗄️ Database Directory (supabase/migrations/):**
```
supabase/migrations/20251030135548_dawn_palace.sql      # Initial booking schema
supabase/migrations/20251223103248_fragrant_tower.sql   # Enhanced hotel schema
supabase/migrations/enhance_hotels_schema.sql           # Additional enhancements
```

---

## **📝 Copy Instructions:**

### **Step 1: Create Folder Structure**
```
mkdir hotels-pak
cd hotels-pak
mkdir app app/about app/admin app/contact app/hotels app/hotels/[id]
mkdir components lib supabase supabase/migrations
```

### **Step 2: Copy Each File**
- Open each file in the Bolt interface
- Copy the content
- Create the file in your local folder
- Paste the content
- Save the file

### **Step 3: Verify Structure**
Your final structure should look like:
```
hotels-pak/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── about/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── hotels/
│       ├── page.tsx
│       └── [id]/
│           ├── page.tsx
│           └── layout.tsx
├── components/
│   ├── Navbar.tsx
│   ├── AuthModal.tsx
│   ├── BookingModal.tsx
│   ├── HotelMap.tsx
│   └── GoBackButton.tsx
├── lib/
│   ├── hotels-data.ts
│   ├── supabase.ts
│   ├── database-types.ts
│   ├── database-functions.ts
│   ├── google-forms-config.ts
│   └── utils.ts
├── supabase/
│   └── migrations/
│       ├── 20251030135548_dawn_palace.sql
│       ├── 20251223103248_fragrant_tower.sql
│       └── enhance_hotels_schema.sql
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── components.json
├── netlify.toml
├── .eslintrc.json
├── .env.local
└── README.md
```

---

## **🚀 After Download:**

1. **Install dependencies:** `npm install`
2. **Configure environment:** Update `.env.local`
3. **Setup Google Forms:** Edit `lib/google-forms-config.ts`
4. **Run development:** `npm run dev`
5. **Build for production:** `npm run build`

**Your Hotels.pak website will be ready to run!** 🎉