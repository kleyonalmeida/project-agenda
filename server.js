require('dotenv').config(); // Com essa configuração, nós podemos importar do env apenas a const criada onde contem as informações pessoais do banco de dados como a senha
// Dessa forma, evitamos vazar os dados.

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}) // Colocamos dessa forma para que possamos capturar a const que está contida no env
  .then(() => {
    app.emit('pronto'); // Usamos dessa parte para emitir um sinal assim que estiver tudo conectado e na line 29
  })
  .catch(e => console.log(e));

const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, csrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const MongoStore = require('connect-mongo');

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
  secret: 'Podemos por qualquer coisa aqui nessa secret',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Tempo máximo que a requisição ficará salva
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf()); // Tem que vir antes das rotas, acredito que por convenção do professor, ele prefiro por antes dos middlewares também
app.use(csrfError); // Esse middleware permite que cubramos o erro onde mostra todos os dados que podem nos comprometer com um html de error 404 que criamos e conectamos.
app.use(middlewareGlobal); // Uma vez colocado aqui, todas as requisições, em todas as rotas, passarão pelo middleware global
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
  app.listen(5000, () => {
    console.log('Acessar http://localhost:5000')
    console.log('Servidor executando na porta 5000')
  });
}); // Estamos capturando o "emit" da line 10, ondea conexão só irá escutar quando o app emitir o sinal de pronto, aparentemente precisa ser passado a mesma mensagem que está escrita dentro do emit
