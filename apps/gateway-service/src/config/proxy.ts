// config/proxy.ts
import { createProxyMiddleware } from "http-proxy-middleware";

export const createServiceProxy = (target: string) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Remove /api prefix: /api/products -> /products
    },
    logger: console,
    timeout: 30000, // 30 second timeout
    proxyTimeout: 30000,
  });
};
