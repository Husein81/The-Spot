// config/proxy.ts
import { createProxyMiddleware } from "http-proxy-middleware";

export const createServiceProxy = (target: string, pathPrefix: string) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path: string) => {
      // Remove the /api prefix but keep the rest
      // Example: /api/products -> /products
      const newPath = path.replace(pathPrefix, "");
      console.log(`[PATH REWRITE] ${path} -> ${newPath}`);
      return newPath;
    },
    logger: console,
    timeout: 30000, // 30 second timeout
    proxyTimeout: 30000,
  });
};
