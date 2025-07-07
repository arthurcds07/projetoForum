const express = require('express');
const app = express();

const pool = require('./conneciton/db');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const commentsRoutes = require('./src/routes/commentsRoutes');
const userRoutes = require('./src/routes/userRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');

const cors = require('cors'); 
const path = require('path');
const PORT = process.env.PORT || 3001;

//Criar o stack de administrar o programa todo
app.use(cors());
app.use(express.json());

//END POINTS
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send("Bem-vindo ao servidor do Fórum!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});