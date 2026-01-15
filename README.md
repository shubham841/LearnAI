# AI Online Platform

An intelligent online learning platform powered by AI that enables users to create, explore, and learn from AI-generated courses.

## 🚀 Features

- **AI-Powered Course Generation**: Automatically generate course structure and content using AI
- **User Authentication**: Secure sign-up and sign-in with Clerk
- **Course Management**: Create, edit, and manage courses with ease
- **Course Enrollment**: Browse and enroll in courses from the exploration section
- **Interactive Learning**: View course content with chapter-based navigation
- **User Dashboard**: Personalized workspace with your created and enrolled courses
- **Billing Integration**: Built-in billing and subscription management
- **Responsive Design**: Fully responsive UI for desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 14+ with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with custom components
- **Database**: Drizzle ORM with PostgreSQL
- **Authentication**: [Clerk](https://clerk.com)
- **UI Components**: Custom component library with shadcn/ui patterns
- **Form Handling**: React forms with validation
- **Middleware**: Custom Next.js middleware for protected routes

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL database
- Clerk API keys (for authentication)

## 🎯 Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd online-ai-platform

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory and add:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=your_postgresql_url

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Run migrations
npm run db:push
# or
yarn db:push
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
app/
├── (auth)/              # Authentication pages
│   ├── sign-in/
│   └── sign-up/
├── api/                 # API routes
│   ├── courses/
│   ├── enroll-course/
│   ├── generate-course-content/
│   ├── generate-course-layout/
│   └── user/
├── course/              # Course viewing
│   ├── _components/
│   └── [courseId]/
└── workspace/           # User dashboard
    ├── _components/
    ├── billing/
    ├── edit-course/
    ├── explore/
    ├── my-learning/
    ├── profile/
    └── view-course/

components/             # Reusable UI components
config/                 # Configuration files (DB, Schema)
context/                # React Context for state management
hooks/                  # Custom React hooks
lib/                    # Utility functions
public/                 # Static assets
```

## 🔑 Key Features

### Course Creation
Users can create new courses and let AI generate the course structure and content automatically.

### Course Exploration
Browse and discover courses created by other users in the explore section.

### Learning Dashboard
Access your created and enrolled courses from a centralized workspace.

### User Profile
Manage user profile, preferences, and account settings.

### Chapter-Based Learning
Organized course content with chapter navigation for better learning experience.

## 📚 API Endpoints

- `POST /api/courses` - Create a new course
- `POST /api/enroll-course` - Enroll in a course
- `POST /api/generate-course-layout` - Generate course structure
- `POST /api/generate-course-content` - Generate course content
- `GET /api/user` - Get user details

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions, please open an issue on the GitHub repository.
