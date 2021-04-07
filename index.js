const express = require("express");
const cors = require("cors");
const htmlToPDF = require('html-pdf-node');
const fs = require('fs');
const { resolve } = require('path');
const pdfMerge = require('easy-pdf-merge');

const app = express();
const PORT = 8000 || process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/convert-pdf", async (req, res) => {
  const { nome, bi, nif, fone, morada } = req.body;
  const options = { path: `${nome}.pdf`, format: 'A4', margin: {left: '20px', right: '20px'}};
  let returnedTestFile = '';

  // let file = { content: `
  //                         <div style="margin-left: 20px; margin-right: 20px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
  //                           <div style="padding-bottom: 20px;"><label style="display: flex; justify-content: space-between; width: 500px;"><span>Nome:</span> <input type="text" value="${nome}" style="border: none;" readonly/></label></div>
  //                           <div style="padding-bottom: 20px;"><label style="display: flex; justify-content: space-between; width: 500px;"><span>BI:</span> <input type="text" value="${bi}" style="border: none;" readonly/></label></div>
  //                           <div style="padding-bottom: 20px;"><label style="display: flex; justify-content: space-between; width: 500px;"><span>NIF:</span> <input type="text" value="${nif}" style="border: none;" readonly/></label></div>
  //                           <div style="padding-bottom: 20px;"><label style="display: flex; justify-content: space-between; width: 500px;"><span>Telefone:</span> <input type="text" value="${fone}" style="border: none;" readonly/></label></div>
  //                           <div style="padding-bottom: 20px;"><label style="display: flex; justify-content: space-between; width: 500px;"><span>Morada:</span> <input type="text" value="${morada}" style="border: none;" readonly/></label></div>
  //                         </div>
  //             `};

  let testFile = fs.readFileSync(resolve(`${__dirname}/views/test.html`), {
    encoding: 'utf-8'   
  });

  returnedTestFile = testFile.replace('a__', nome)
  returnedTestFile = returnedTestFile.replace('b__', bi);
  returnedTestFile = returnedTestFile.replace('c__', nif);
  returnedTestFile = returnedTestFile.replace('d__', fone);
  returnedTestFile = returnedTestFile.replace('e__', morada);

  // htmlToPDF.generatePdf({content: `${returnedTestFile}`}, options).then(pdfBuffer => {
  //     console.log("", pdfBuffer);
      
  // });

  pdfMerge([resolve(`${__dirname}/Miles.pdf`), resolve(`${__dirname}/Miles Johnson.pdf`)], `${__dirname}/outputFile.pdf`, function (err) {
    console.log('Error merging file: ', err);
  });

  res.json({ Cookin: "Cooked" });
});

app.listen(PORT, () => console.log(`Server running ${PORT}`));
