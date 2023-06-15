const express = require('express');
const routerApi = require('./routes/index');
var morgan = require('morgan');
const cors = require('cors');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middleweres/errorHandles');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
