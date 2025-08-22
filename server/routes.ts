import dotenv from "dotenv";
dotenv.config();

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, signupSchema, paymentSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// Simple auth middleware
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration
  app.post("/api/v1/auth/signup", async (req, res) => {
    try {
      const validatedData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: userWithoutPassword,
        token,
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false,
        message: error.message || "Registration failed" 
      });
    }
  });

  // User login
  app.post("/api/v1/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user || !user.password) {
        return res.status(401).json({ 
          success: false,
          message: "Invalid credentials" 
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false,
          message: "Invalid credentials" 
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
        token,
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false,
        message: error.message || "Login failed" 
      });
    }
  });

  // Google OAuth login (placeholder - would integrate with actual Google OAuth)
  app.post("/api/v1/auth/loginGoogle", async (req, res) => {
    try {
      // This would normally verify Google OAuth token
      // For now, we'll create a simple implementation
      const { googleId, email, name } = req.body;
      
      if (!googleId || !email || !name) {
        return res.status(400).json({ 
          success: false,
          message: "Missing Google OAuth data" 
        });
      }

      // Check if user exists by Google ID
      let user = await storage.getUserByGoogleId(googleId);
      
      if (!user) {
        // Check if user exists by email
        user = await storage.getUserByEmail(email);
        if (user) {
          // Link Google account to existing user
          user = await storage.updateUser(user.id, { googleId });
        } else {
          // Create new user
          user = await storage.createUser({
            email,
            name,
            password: null, // No password for Google OAuth users
          });
          user = await storage.updateUser(user.id, { googleId });
        }
      }

      if (!user) {
        return res.status(500).json({ 
          success: false,
          message: "Failed to create or update user" 
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.json({
        success: true,
        message: "Google login successful",
        user: userWithoutPassword,
        token,
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false,
        message: error.message || "Google login failed" 
      });
    }
  });

  // Get current user
  app.get("/api/v1/auth/me", authenticateToken, async (req: any, res) => {
    const { password, ...userWithoutPassword } = req.user;
    res.json({
      success: true,
      user: userWithoutPassword,
    });
  });

  // Logout
  app.post("/api/v1/auth/logout", authenticateToken, async (req, res) => {
    // Since we're using JWT, logout is handled client-side by removing the token
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  });

  // Create payment order
  app.post("/api/v1/payment/capturePayment", authenticateToken, async (req: any, res) => {
    try {
      const validatedData = paymentSchema.parse(req.body);
      
      // Create Razorpay order
      const options = {
        amount: parseInt(validatedData.amount) * 100, // Convert to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          plan: validatedData.plan,
          userId: req.user.id,
        },
      };

      const razorpayOrder = await razorpay.orders.create(options);
      
      // Create payment record
      const payment = await storage.createPayment({
        userId: req.user.id,
        razorpayOrderId: razorpayOrder.id,
        amount: validatedData.amount,
        currency: "INR",
        status: "pending",
        plan: validatedData.plan,
        razorpayPaymentId: null,
      });

      res.json({
        success: true,
        message: "Payment order created",
        payment,
        razorpayKey: process.env.RAZORPAY_KEY_ID,
      });
    } catch (error: any) {
      console.error("Payment creation error:", error);
      res.status(400).json({ 
        success: false,
        message: error.message || "Payment creation failed" 
      });
    }
  });

  // Verify payment
  app.post("/api/v1/payment/verify", authenticateToken, async (req: any, res) => {
    try {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature, plan } = req.body;
      
      // Verify payment signature with Razorpay
      const crypto = require('crypto');
      const body = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || "")
        .update(body.toString())
        .digest('hex');
      
      const isValidSignature = expectedSignature === razorpaySignature;
      
      if (!isValidSignature) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment signature"
        });
      }
      
      // Update user subscription
      await storage.updateUser(req.user.id, { subscription: plan });
      
      // Update payment status
      const payments = await storage.getPaymentsByUserId(req.user.id);
      const payment = payments.find(p => p.razorpayOrderId === razorpayOrderId);
      
      if (payment) {
        await storage.updatePayment(payment.id, {
          razorpayPaymentId,
          status: "completed",
        });
      }

      res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } catch (error: any) {
      console.error("Payment verification error:", error);
      res.status(400).json({ 
        success: false,
        message: error.message || "Payment verification failed" 
      });
    }
  });

  // Get user payments
  app.get("/api/v1/payment/history", authenticateToken, async (req: any, res) => {
    try {
      const payments = await storage.getPaymentsByUserId(req.user.id);
      res.json({
        success: true,
        payments,
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: error.message || "Failed to fetch payments" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
