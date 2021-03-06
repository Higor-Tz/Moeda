const { v4: uuidv4 } = require('uuid');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fabricNetwork = require('./fabricNetwork')
//const enrollAdmin = require('../enrollAdmin')
const registerUser = require('../registerUser')
app.set('view engine', 'ejs');
app.use(bodyParser.json());
urlencoder = bodyParser.urlencoded({ extended: true });
/*
try {
  //enrollAdmin.enrollAdmin();
} catch (error) {
  console.log(error);
}
*/
app.post('/api/createTransacao', urlencoder, async function (req, res) {

  try {
    const contract = await fabricNetwork.connectNetwork();
    console.log(req.body);
    let tx = await contract.submitTransaction('createTransacao', uuidv4(), value);
    res.json({
      status: 'OK - Transaction has been submitted',
      txid: tx.toString()
    });
    console.log('OK - Transaction has been submitted');
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error
    });
  }

});

app.post('/api/deleteTransacao', urlencoder, async function (req, res) {

  try {
    const contract = await fabricNetwork.connectNetwork();
    console.log(req.body);
    let tx = await contract.submitTransaction('deleteTransacao', req.body.transacaoId);
    res.json({
      status: 'OK - Transaction has been submitted',
      txid: tx.toString()
    });
    console.log('OK - Transaction has been submitted');
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error
    });
  }

});

app.get('/api/readTransacao', async function (req, res) {
  try {
    const contract = await fabricNetwork.connectNetwork();
    console.log(req.body);
    const result = await contract.evaluateTransaction('readTransacao', req.body.transacaoId);
    let response = JSON.parse(result.toString());
    res.json(response);
    console.log('OK - Query Successful');
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error
    });
  }
})




app.listen(3000, () => {
  console.log("***********************************");
  console.log("API server listening at localhost:3000");
  console.log("***********************************");
});
