const express = require('express');
const routerApi = require('./routes/index');
var morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const {
  errorHandler,
  logErrors,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middleweres/errorHandles');
const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(cors());
require('./utils/auth/index');
app.use(express.json());
app.use(morgan('tiny'));
routerApi(app);

// app.get('/', checkApiKeys, (req, res) => {
//   res.send('hello world');
// });
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
