const express = require('express');
const cors = require('cors')
require('dotenv').config()
const nodemailer = require('nodemailer')
const app = express();
const port = process.env.PORT || 3000;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.use(cors({
  origin: 'http://127.0.0.1:5500'
}))
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Birding page contact form server is live')
})

app.post('/', (req, res) => {
  data = req.body;
  console.log(data)
  res.status(200).send(JSON.stringify(req.body))

  const message = {
    from: "arslongatest1@gmail.com",
    to: "arslongatest2@yahoo.com",
    subject: `${data.subject}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
  };
  
  transporter.sendMail(message)
})




