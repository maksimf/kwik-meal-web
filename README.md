# Kwik Meal Web

A modern React frontend for the Kwik Meal recipe API. Built with Next.js, shadcn/ui, and Tailwind CSS.

## Features

- **Tokenized Ingredient Search**: Add ingredients as tags with easy removal
- **Real-time Recipe Search**: Fast search through 10,000+ recipes
- **Beautiful UI**: Modern design with shadcn/ui components
- **Responsive Design**: Works great on desktop and mobile
- **Loading States**: Skeleton loaders for smooth UX
- **Error Handling**: Graceful error display and recovery

## Tech Stack

- Next.js 14 with App Router
- React 18 with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- Lucide React for icons

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3001](http://localhost:3001)

## API Configuration

The frontend connects to the Kwik Meal API running on `http://localhost:3000` by default.

To change the API URL, set the `NEXT_PUBLIC_API_BASE_URL` environment variable:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://your-api-server:3000
```

## Usage

1. **Add Ingredients**: Type ingredient names and press Enter to add them as tags
2. **Remove Ingredients**: Click the X on any tag or press Backspace when the input is empty
3. **Search**: Click the Search button to find recipes
4. **View Results**: Browse recipe cards with ingredients, ratings, and cooking times

## Features in Detail

### Tokenized Input

- Type ingredients and press Enter to add them
- Visual tags show added ingredients
- Easy removal with click or keyboard
- Prevents duplicate ingredients

### Recipe Display

- Beautiful recipe cards with images
- Highlighted matching ingredients
- Recipe ratings, cooking times, and cuisine info
- Responsive grid layout

### Smart Search

- Handles typos and partial matches (powered by the API)
- Fast search results with performance metrics
- Loading states with skeleton components
- Error handling with user-friendly messages

## Development

### Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── ingredient-input.tsx
│   └── recipe-card.tsx
└── lib/               # Utilities
    ├── api.ts         # API client
    └── utils.ts       # Utility functions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Building for Production

```bash
npm run build
npm run start
```

The app will be available at [http://localhost:3000](http://localhost:3000) (or your configured port).
