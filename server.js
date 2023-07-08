const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Array to store transactions
let transactions = [
  { "tradingParty": "me", "counterParty": "you", "amount": -400 },
  { "tradingParty": "me", "counterParty": "you", "amount": 500 },
  { "tradingParty": "me", "counterParty": "someone_else", "amount": 100 },
];

// Endpoint to retrieve transactions
app.get("/transactions", (req, res) => {
  res.json(transactions);
});

// Endpoint to add a new transaction
app.post("/transactions", (req, res) => {
  const { tradingParty, counterParty, amount } = req.body;

  // Create a new transaction object
  const newTransaction = {
    tradingParty,
    counterParty,
    amount,
  };

  // Add the transaction to the array
  transactions.push(newTransaction);

  res.status(201).json(transactions);
});

// Endpoint to compress transactions
app.post("/compress", (req, res) => {
  console.log('compress');
  let transactionMap = new Map();
  // Create map using an object containing fields for tradingparty and countertrading party that point to the amount.  We are gonna iterate through the transactions and whenever the key already present in the map, combine the amounts for those two transactions and have the map point to the new value.
  transactions.forEach((transaction) => {
    let key = JSON.stringify({
      tradingParty: transaction.tradingParty,
      counterParty: transaction.counterParty,
    });
    if (transactionMap.get(key) === undefined) {
      transactionMap.set(key, transaction.amount);
    } else {
      let sum = transactionMap.get(key) + transaction.amount;
      transactionMap.set(key, sum)
    }
  });

  let newTransactions = []

  for (let [key, value] of transactionMap) {
    newTransactions.push({...JSON.parse(key), amount: value})
  }
    
  transactions = newTransactions

  res.status(201).json(transactions);
});

// Start the server
const port = 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
