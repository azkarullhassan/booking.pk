# 📥 Hotels.pak - Complete Download Guide

## 🚨 **How to Download Your Website Code**

Since there's no visible export button in this Bolt interface, here are your options:

### **Method 1: Manual File Copy (Recommended)**

**Step 1: Create Project Structure**
Create these folders on your computer:
```
hotels-pak/
├── app/
│   ├── about/
│   ├── admin/
│   ├── contact/
│   └── hotels/
│       └── [id]/
├── components/
│   └── ui/
├── lib/
├── supabase/
│   └── migrations/
└── public/
```

**Step 2: Copy Files**
Copy each file from the Bolt interface to your local folders:

### **📁 Root Files:**
- `package.json`
- `next.config.js`
- `tailwind.config.ts`
- `tsconfig.json`
- `postcss.config.js`
- `components.json`
- `netlify.toml`
- `.eslintrc.json`
- `.env.local`
- `README.md`
- `DOWNLOAD_INSTRUCTIONS.md`

### **📁 App Directory (`app/`):**
- `app/page.tsx` (Homepage)
- `app/layout.tsx` (Main layout)
- `app/globals.css` (Global styles)
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/admin/page.tsx`
- `app/hotels/page.tsx`
- `app/hotels/[id]/page.tsx`
- `app/hotels/[id]/layout.tsx`

### **📁 Components Directory (`components/`):**
- `components/Navbar.tsx`
- `components/AuthModal.tsx`
- `components/BookingModal.tsx`
- `components/HotelMap.tsx`
- `components/GoBackButton.tsx`

### **📁 Library Directory (`lib/`):**
- `lib/hotels-data.ts`
- `lib/supabase.ts`
- `lib/database-types.ts`
- `lib/database-functions.ts`
- `lib/google-forms-config.ts`
- `lib/utils.ts`

### **📁 Database Directory (`supabase/migrations/`):**
- `supabase/migrations/20251030135548_dawn_palace.sql`
- `supabase/migrations/20251223103248_fragrant_tower.sql`
- `supabase/migrations/enhance_hotels_schema.sql`

---

## **Method 2: Contact Bolt Support**

If manual copying is too tedious:
1. Look for a **"Help"** or **"Support"** button in the Bolt interface
2. Ask them about the **export/download feature**
3. They might provide a direct download link

---

## **Method 3: Browser Developer Tools**

Advanced users can:
1. Open browser **Developer Tools** (F12)
2. Go to **Network** tab
3. Look for file requests and save them manually

---

## 🚀 **After Download Setup:**

### **1. Install Dependencies:**
```bash
cd hotels-pak
npm install
```

### **2. Configure Environment:**
Update `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### **3. Setup Google Forms:**
Edit `lib/google-forms-config.ts` with your form IDs

### **4. Run Development Server:**
```bash
npm run dev
```

### **5. Build for Production:**
```bash
npm run build
```

---

## 📧 **Need Help?**

If you need assistance with the download:
- Email: azkarullhassan7@gmail.com
- The code is complete and ready to run
- All Google Forms integration is configured
- Database schema is included

---

## ✅ **What You're Getting:**

- ✅ Complete hotel booking website
- ✅ Google Forms integration for contact & bookings
- ✅ Email notifications to azkarullhassan7@gmail.com
- ✅ Admin dashboard
- ✅ Interactive maps
- ✅ Mobile responsive design
- ✅ Database schema with Supabase
- ✅ TypeScript + Next.js + Tailwind CSS

**Your Hotels.pak website is production-ready!** 🎉