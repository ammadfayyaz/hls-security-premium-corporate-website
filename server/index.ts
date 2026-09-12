import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { inquiryInputSchema, sendInquiryEmail } from "./inquiry";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "64kb" }));

  app.post("/api/inquiry", async (req, res) => {
    const parsed = inquiryInputSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Please check your information and try again.",
      });
      return;
    }

    try {
      await sendInquiryEmail(parsed.data);
      res.json({ success: true });
    } catch (error) {
      console.error("[Inquiry API] Submission failed", error);
      res.status(502).json({
        success: false,
        message: "Unable to submit your request at this time.",
      });
    }
  });

  if (process.env.NODE_ENV === "development") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const staticPath = path.resolve(__dirname, "public");
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof SyntaxError) {
      res.status(400).json({
        success: false,
        message: "Please check your information and try again.",
      });
      return;
    }
    next(error);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
