import './config/env.js'
console.log("DEBUG ENV:", process.env.GROQ_API_KEY ? "Key loaded ✅" : "Key missing ❌");
 
import app from "./app.js";

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello, Express with ES6 Modules!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
