import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import { createServiceProxy } from "./config/proxy";
import helmet from "helmet";

dotenv.config();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL;

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "API Gateway",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/health",
      products: "/api/products",
      orders: "/api/orders",
      payments: "/api/payments",
    },
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      product: PRODUCT_SERVICE_URL || "NOT CONFIGURED",
      order: ORDER_SERVICE_URL || "NOT CONFIGURED",
      payment: PAYMENT_SERVICE_URL || "NOT CONFIGURED",
    },
  });
});

// Validation middleware to check if service URL is defined
const validateServiceUrl = (serviceName: string, url: string | undefined) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!url) {
      return res.status(503).json({
        error: "Service Unavailable",
        message: `${serviceName} service URL is not configured`,
        service: serviceName,
      });
    }
    next();
  };
};

// API routes with validation
app.use(
  "/api/products",
  validateServiceUrl("product-service", PRODUCT_SERVICE_URL),
  createServiceProxy(PRODUCT_SERVICE_URL!)
);

app.use(
  "/api/orders",
  validateServiceUrl("order-service", ORDER_SERVICE_URL),
  createServiceProxy(ORDER_SERVICE_URL!)
);

app.use(
  "/api/payments",
  validateServiceUrl("payment-service", PAYMENT_SERVICE_URL),
  createServiceProxy(PAYMENT_SERVICE_URL!)
);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err);

  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 Gateway Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Proxying to:`);
  console.log(`   - Products: ${PRODUCT_SERVICE_URL || "NOT CONFIGURED"}`);
  console.log(`   - Orders: ${ORDER_SERVICE_URL || "NOT CONFIGURED"}`);
  console.log(`   - Payments: ${PAYMENT_SERVICE_URL || "NOT CONFIGURED"}`);
  console.log(`\n✨ Ready to accept requests!\n`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("\n🛑 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("\n🛑 SIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});
