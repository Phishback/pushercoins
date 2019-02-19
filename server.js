const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const Pusher = require('pusher');

const pusher = new Pusher({
  app_id: '717768',
  key: '580c93dd2287d2c7fcd5',
  secret: 'ee54d6f2b4ffa16b9baa',
  cluster: 'us2',
  encrypted: true
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.set('port', (5000));
app.get('/', (req, res) => {
  res.send('Welcome')
});

app.post('/prices/new', (req,res) => {
  pusher.trigger('coin-prices', 'prices', {
    prices: req.body.prices
  });
  res.sendStatus(200);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});