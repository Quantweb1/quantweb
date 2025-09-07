# EmptyLegHub Training System

A comprehensive training module system with user authentication, progress tracking, and interactive quizzes.

## Features

- 🔐 **User Authentication**: Secure sign-in system with session management
- 📚 **Training Modules**: Structured content delivery with rich formatting
- 📝 **Interactive Quizzes**: 10-question assessments for each module
- 📊 **Progress Tracking**: Real-time tracking of module completion and scores
- 🎯 **Performance Metrics**: Track quiz scores and passing rates
- 💻 **Modern UI**: Clean, responsive interface with smooth animations

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   ```bash
   npx prisma db push
   ```

3. **Seed Sample Data**
   ```bash
   npm run db:seed
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Use test credentials:
     - Email: `test@emptyleghub.com`
     - Password: `password123`

## Project Structure

```
emptyleghub-training/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── module/[id]/      # Module viewer page
│   └── register/         # Registration page
├── components/            # React components
├── lib/                   # Utility functions and configurations
├── prisma/               # Database schema and seeds
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## Key Features Explained

### Training Modules
- Each module contains structured content with headings, paragraphs, lists, and highlights
- Estimated duration for completion
- Sequential ordering for progressive learning

### Quiz System
- 10 questions per module
- Multiple choice format
- 70% passing grade requirement
- Immediate feedback with score display
- Ability to retake quizzes if failed

### Progress Tracking
- Visual progress bars
- Module completion status
- Score history
- Overall progress percentage

## Environment Variables

Create a `.env.local` file with:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Prisma**: Database ORM with SQLite
- **NextAuth.js**: Authentication solution
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Icons**: Icon components

## Development

To modify training content:
1. Edit the seed file at `prisma/seed.ts`
2. Run `npm run db:seed` to update the database

To add new modules:
1. Add module data to the seed file
2. Ensure each module has exactly 10 questions
3. Run the seed command to populate the database

## Production Deployment

1. Update environment variables for production
2. Use a production database (PostgreSQL recommended)
3. Update Prisma schema datasource if changing database
4. Generate secure NEXTAUTH_SECRET
5. Build the application: `npm run build`
6. Start production server: `npm start`