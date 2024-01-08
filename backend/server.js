// server/server.js
const express = require("express");
const fetch = require("isomorphic-unfetch");
const cacheUtil = require("../utils/cacheUtil"); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 3001;

const fetchBeerData = async (page) => {
  const response = await fetch(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`
  );
  const data = await response.json();
  return data;
};

app.get("/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page, 10) || 1;
    const cacheKey = `beerDataPage${page}`;
    const cachedData = cacheUtil.get(cacheKey);

    if (cachedData) {
      res.json(cachedData);
    } else {
      const data = await fetchBeerData(page);
      cacheUtil.set(cacheKey, data, 60 * 5);
      res.json(data);
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
