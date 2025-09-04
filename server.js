const express = require("express");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data", "TO.json");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // віддає ваш фронтенд

// збереження даних
app.post("/save", async (req, res) => {
  try {
    const newRecord = req.body;

    let records = [];
    if (await fs.pathExists(DATA_FILE)) {
      records = await fs.readJson(DATA_FILE);
    }

    records.push(newRecord);
    await fs.writeJson(DATA_FILE, records, { spaces: 2 });

    res.json({ success: true, message: "Дані збережено" });
  } catch (err) {
    console.error("Помилка запису:", err);
    res.status(500).json({ success: false, error: "Помилка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер працює: http://localhost:${PORT}`);
});
