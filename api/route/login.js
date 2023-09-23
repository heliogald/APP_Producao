import express from "express";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Rota para fazer o login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erro no servidor' });
      } else if (results.length === 0) {
        res.status(401).json({ message: 'Credenciais inválidas' });
      } else {
        const user = results[0];
        // Verifique a senha usando bcrypt
        bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
          if (bcryptErr || !bcryptResult) {
            res.status(401).json({ message: 'Credenciais inválidas' });
          } else {
            // Autenticação bem-sucedida, você pode gerar e retornar um token JWT aqui
            res.json({ message: 'Login bem-sucedido' });
          }
        });
      }
    }
  );   
  if (bcryptErr || !bcryptResult) {
    res.status(401).json({ message: 'Credenciais inválidas' });
  } else {
    const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido', token });
  }

  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token ausente' });
    }
  
    jwt.verify(token, 'secreto', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      req.userId = decoded.userId;
      next();
    });
  };
  
  // Exemplo de uso do middleware para proteger uma rota
  app.get('/rota-protegida', verifyToken, (req, res) => {
    // O usuário está autenticado
    res.json({ message: 'Rota protegida' });
  });

  axios.get('/rota-protegida', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    // Lida com a resposta
  })
  .catch(error => {
    // Lida com erros
  });
  
  
});



