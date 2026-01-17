# Restaurant Online Ordering System

A modern, mobile-first restaurant ordering system built with Next.js 14, TypeScript, and Google Sheets integration. Perfect for Vietnamese restaurants looking to digitize their ordering process.

## Features

- **Mobile-First Design**: Optimized for smartphones with responsive layouts
- **Real-Time Cart**: Add/remove items with instant updates and localStorage persistence
- **Category Filtering**: Browse menu by "All", "Main Dishes", or "Drinks"
- **Google Sheets Integration**: Orders automatically saved to Google Sheets for kitchen staff
- **Vietnamese Currency**: Prices formatted as "45,000đ" with proper comma separators
- **Order Confirmation**: Success page with unique order ID and table number

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Google Sheets API
- **State Management**: React Context API + localStorage
- **Deployment**: Vercel

## Project Structure

```
restaurant-order/
├── app/
│   ├── contexts/
│   │   └── CartContext.tsx       # Cart state management
│   ├── api/
│   │   └── orders/route.ts       # Order submission endpoint
│   ├── cart/
│   │   └── page.tsx              # Cart page
│   ├── success/
│   │   └── page.tsx              # Order confirmation page
│   ├── page.tsx                  # Menu page (home)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── MenuItem.tsx              # Menu item card
│   ├── CartItem.tsx              # Cart item with controls
│   └── CartFooter.tsx            # Sticky cart summary
├── lib/
│   ├── menuData.ts               # Menu items and utilities
│   └── googleSheets.ts           # Google Sheets integration
├── types/
│   └── index.ts                  # TypeScript definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Google Sheets API

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Sheets API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

#### Step 2: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in service account details:
   - Name: `restaurant-order-service`
   - Role: **Editor** (or custom role with Sheets access)
4. Click "Done"

#### Step 3: Generate JSON Key

1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose **JSON** format
5. Download the JSON file (keep it secure!)

#### Step 4: Create Google Sheet

1. Create a new Google Sheet
2. Name it "Restaurant Orders" (or your preference)
3. Create a sheet tab named **"Orders"**
4. Add header row in the first row:
   ```
   Timestamp | Order ID | Table Number | Item Details | Total Price | Notes | Status
   ```

#### Step 5: Share Sheet with Service Account

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (found in JSON file as `client_email`)
   - Format: `restaurant-order-service@your-project.iam.gserviceaccount.com`
4. Give **Editor** permissions
5. Uncheck "Notify people" (it's a service account, not a real person)
6. Click "Share"

#### Step 6: Setup Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in values from your JSON key file:

   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your_spreadsheet_id_here
   ```

   **Important Notes:**
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Copy from `client_email` in JSON file
   - `GOOGLE_PRIVATE_KEY`: Copy from `private_key` in JSON file (keep the quotes and `\n` characters)
   - `GOOGLE_SHEET_ID`: Get from your Google Sheet URL:
     - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
     - Copy the `SPREADSHEET_ID` part

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage Flow

1. **Customer scans QR code** → Opens menu page at `/`
2. **Browse menu** → Filter by category (All/Main/Drinks)
3. **Add items to cart** → Click "Add to Cart" buttons
4. **Review cart** → Click "View Cart" in sticky footer
5. **Enter details** → Fill in table number and optional notes
6. **Submit order** → Click "Confirm Order"
7. **Order sent to Google Sheets** → Kitchen staff sees new order
8. **Confirmation page** → Customer sees order ID and table number

## Menu Customization

Edit menu items in `lib/menuData.ts`:

```typescript
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'your-item-id',
    name: 'Your Dish Name',
    price: 50000,
    category: 'main', // or 'drink'
    image: '🍜', // Emoji or image URL
    description: 'Your description here'
  },
  // Add more items...
];
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Restaurant ordering system"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Add Environment Variables

1. In Vercel project settings, go to "Environment Variables"
2. Add the three variables:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
3. Make sure to use the same values from your `.env.local` file

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Visit your deployment URL (e.g., `your-app.vercel.app`)

### 5. Generate QR Code

1. Use a QR code generator (e.g., [QR Code Generator](https://www.qr-code-generator.com/))
2. Enter your Vercel URL
3. Download QR code image
4. Print and place on restaurant tables

## Troubleshooting

### Error: "Failed to submit order"

**Possible causes:**
- Google Sheets API credentials are incorrect
- Service account doesn't have access to the sheet
- Sheet name is not "Orders" (case-sensitive)
- Internet connection issue

**Solution:**
1. Verify environment variables in Vercel/local `.env.local`
2. Check that service account email has Editor access to the sheet
3. Ensure sheet tab is named exactly "Orders"
4. Check browser console and Vercel logs for detailed errors

### Cart items disappear after page refresh

**Cause:** localStorage is disabled or browser in private mode

**Solution:**
- Ask users to enable localStorage
- Use regular browser window (not incognito/private)

### Orders not appearing in Google Sheet

**Possible causes:**
- Service account not shared with the sheet
- Wrong sheet ID in environment variables
- Sheet tab name is incorrect

**Solution:**
1. Double-check `GOOGLE_SHEET_ID` matches your sheet URL
2. Verify service account email has access
3. Ensure tab is named "Orders" (not "Sheet1")

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Structure

- **Client Components**: All pages and interactive components use `'use client'` directive
- **Server Components**: API routes run on server-side only
- **State Management**: Cart state managed by Context API with localStorage sync
- **Type Safety**: Full TypeScript coverage with strict mode

## License

MIT

## Support

For issues or questions, please create an issue on GitHub or contact the development team.

---

Built with ❤️ for Vietnamese restaurants
