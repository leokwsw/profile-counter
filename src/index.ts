import express from "express";
import {createClient} from "redis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const redisClient = createClient({url: process.env.REDIS_URL});

redisClient.connect().catch(console.error);

const PLACES = 5;

app.get("/:key/count.svg", async (req, res) => {
    const key = req.params.key;

    // Increment the counter
    const count = await redisClient.incr(`counter:${key}`);

    const countArray = count.toString().padStart(PLACES, "0").split("");
    const parts = countArray.reduce(
        (acc, next, index) =>
            `${acc}
       <rect id="Rectangle" fill="#000000" x="${index * 32}" width="29" height="29"></rect>
       <text id="0" font-family="Courier" font-size="24" font-weight="normal" fill="#00FF13">
           <tspan x="${index * 32 + 7}" y="22">${next}</tspan>
       </text>
`,
        ""
    );
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${PLACES * 32}px" height="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Count</title>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        ${parts}
      </g>
  </svg>
  `;

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
});

app.listen(port, () => {
    console.log(`Counter server running on port ${port}`);
});
