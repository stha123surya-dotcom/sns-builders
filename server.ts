import express from "express";
import path from "path";
import helmet from "helmet";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust the proxy since the app runs behind Cloud Run's load balancer
  app.set('trust proxy', 1);

  // Add security headers (disable xFrameOptions to allow preview iframe rendering)
  app.use((req, res, next) => {
    if (req.path.startsWith('/__')) {
      return next();
    }
    next();
  });

  app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: false, // Do not set X-Frame-Options to allow embedding in AI Studio preview iframe
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
  }));

  // Manual headers
  app.use((req, res, next) => {
    if (req.path.startsWith('/__')) {
      return next();
    }
    res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    // Setting CSP manually to allow external scripts used by the app (Firebase, AdSense, etc)
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://apis.google.com https://*.firebaseapp.com; connect-src 'self' https://formsubmit.co https://*.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://*.firebaseio.com wss://*.firebaseio.com wss://*.googleapis.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://googleads.g.doubleclick.net https://*.firebaseapp.com;"
    );
    next();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
