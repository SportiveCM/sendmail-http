const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// 🛡️ CORS middleware
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  next();
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sportivecm@gmail.com',
    pass: 'muil vfeh szev fljz'
  }
});

app.post('/', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Falten els camps obligatoris: to, subject, text' });
  }

  try {
    await transporter.sendMail({
      from: 'SportiveCM <sportivecm@gmail.com>',
      to,
      subject,
      html: text
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error enviant correu:', err);
    res.status(500).json({ error: err.toString() });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor escoltant al port ${port}`);
});
