const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Cấu hình CORS
app.use(cors());

// Middleware
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/users_db';

mongoose.connect(mongoUrl)
  .then(() => console.log("✅ Đã kết nối MongoDB"))
  .catch(err => console.error("❌ MongoDB lỗi:", err));

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Backend + MongoDB hoạt động!');
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Thiếu tên' });

  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`🚀 Backend chạy tại http://localhost:${port}`);
});
