const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const codeRoutes = require("./routes/codeRoutes"); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/", codeRoutes); 

app.post("/", (req, res) => {
  console.log(req.body); 
});

app.get("/", (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code Editor</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
            h1 { color: #333; }
            a { color: #007BFF; text-decoration: none; font-size: 18px; }
            a:hover { text-decoration: underline; } 
        </style>
    </head>
    <body>
        <h1>Your server is live!</h1>
        <p><a href="https://codenetmaster.netlify.app/" target="_blank">Go to Frontend Page</a></p>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

mongoose
  .connect("mongodb+srv://muthuhariharan:MuthuHariharan@cluster0.nt9ac.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB Atlas", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// const axios = require('axios');

// const getRuntimes = async () => {
//   try {
//     const response = await axios.get('https://emkc.org/api/v2/piston/runtimes');
//     console.log(response.data); // This will show all available languages and versions
//   } catch (error) {
//     console.error('Error fetching runtimes:', error.message);
//   }
// };

// getRuntimes();
