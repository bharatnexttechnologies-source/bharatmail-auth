import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON body
app.use(express.json());

// Serve all static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// === API Key Validation Route ===
const SECRET_API_KEY = "bharatmail-auth"; // <-- Replace with your manually created key

app.post("/validate-api", (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.json({ success: false, message: "API key is required" });
  }

  if (apiKey === SECRET_API_KEY) {
    return res.json({ success: true, redirect: "/index.html" });
  } else {
    return res.json({ success: false, message: "Invalid API key" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BharatMail Auth server running at http://localhost:${PORT}`);
});
