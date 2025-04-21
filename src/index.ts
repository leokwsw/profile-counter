import express from "express";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.connect().catch(console.error);

app.get("/:key/count.svg", async (req, res) => {
    const key = req.params.key;

    // Increment the counter
    const count = await redisClient.incr(`counter:${key}`);

    // Create SVG
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="20">
      <rect width="100%" height="100%" fill="#555"/>
      <text x="90" y="14" fill="#fff" font-family="Verdana" font-size="11" text-anchor="middle">
        ${key}: ${count}
      </text>
    </svg>
  `;

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
});

app.listen(port, () => {
    console.log(`Counter server running on port ${port}`);
});
