# EduConnect - NGO Education Management Platform

## Overview

This is a full-stack NGO education management application built with modern web technologies. It provides a comprehensive solution for NGOs to manage educational programs, track student progress, process payments, and demonstrate impact. The application features user authentication, Razorpay payment processing, and an intuitive education-focused interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Components**: Comprehensive component library using Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API architecture with structured route handlers
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **Session Management**: Express sessions with PostgreSQL session storage
- **Request Logging**: Custom middleware for API request logging and monitoring

### Database & ORM
- **Database**: PostgreSQL as the primary database
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Database Provider**: Neon serverless PostgreSQL for cloud deployment
- **Schema Management**: Shared schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database schema migrations and management

### Authentication System
- **JWT Tokens**: Secure token-based authentication with configurable secrets
- **Password Security**: bcrypt hashing for secure password storage
- **Google OAuth**: Integrated Google authentication for social login
- **Protected Routes**: Client-side route protection with authentication guards
- **Session Persistence**: Token storage in localStorage with automatic refresh

### Payment Integration
- **Payment Provider**: Razorpay integration for payment processing
- **Subscription Plans**: Support for multiple subscription tiers (free, starter, pro)
- **Payment Tracking**: Database storage of payment records and transaction history
- **Order Management**: Razorpay order creation and payment verification

### Development Environment
- **Hot Reload**: Vite development server with HMR for fast development cycles
- **Error Handling**: Runtime error overlay and comprehensive error boundaries
- **Build Process**: Optimized production builds with code splitting and bundling
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared code

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client for database connectivity
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect support
- **express**: Web application framework for the backend API
- **react**: Frontend UI library with hooks and modern patterns
- **@tanstack/react-query**: Server state management and data synchronization

### Authentication & Security
- **jsonwebtoken**: JWT token creation and verification
- **bcryptjs**: Password hashing and verification
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating component variants
- **lucide-react**: Icon library with React components

### Form Management
- **react-hook-form**: Form library with validation support
- **@hookform/resolvers**: Validation resolvers for different schema libraries
- **zod**: Schema validation library for type-safe data validation

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type system for JavaScript
- **drizzle-kit**: Database migration and introspection tool
- **esbuild**: Fast JavaScript bundler for production builds

### Payment Processing
- **razorpay**: Payment gateway integration for subscription management
- **payment webhooks**: Server-side payment verification and processing

### Additional Utilities
- **date-fns**: Date utility library for formatting and manipulation
- **wouter**: Lightweight routing library for React applications
- **cmdk**: Command palette component for enhanced user experience