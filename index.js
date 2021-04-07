const express = require("express");
const cors = require("cors");
const htmlToPDF = require('html-pdf-node');

const app = express();
const PORT = 8000 || process.env.PORT;
const options = { path: 'test.pdf', format: 'A4' };

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Cookin");
});

app.post("/convert-pdf", (req, res) => {
  const { nome, bi, nif, fone, morada } = req.body;

  let file = { content: `<h1>${nome}</h1>`};

  htmlToPDF.generatePdf(file, options).then(pdfBuffer => {
      console.log("", pdfBuffer);
  });

  res.json({ Cookin: "Cooked" });
});

app.listen(PORT, () => console.log("Server running"));
