const express = require('express');
const app = express();

// Endpoint 1: Calculate the Returns of the Stocks added
app.get('/calculate-returns', (req, res) => {
    const { boughtAt, marketPrice, quantity } = req.query;
    
    const boughtAtFloat = parseFloat(boughtAt);
    const marketPriceFloat = parseFloat(marketPrice);
    const quantityInt = parseInt(quantity);
    
    if (isNaN(boughtAtFloat) || isNaN(marketPriceFloat) || isNaN(quantityInt)) {
        return res.status(400).send('Invalid input values');
    }
    
    const returnValue = (marketPriceFloat - boughtAtFloat) * quantityInt;
    
    res.send(returnValue.toString());
});

// Endpoint 2: Calculate the Total Returns
app.get('/total-returns', (req, res) => {
    const { stock1, stock2, stock3, stock4 } = req.query;
    
    const totalReturns = parseFloat(stock1) + parseFloat(stock2) + parseFloat(stock3) + parseFloat(stock4);
    
    if (isNaN(totalReturns)) {
        return res.status(400).send('Invalid input values');
    }

    res.send(totalReturns.toString());
});

// Endpoint 3: Calculate the Return Percentage
app.get('/calculate-return-percentage', (req, res) => {
    const { boughtAt, returns } = req.query;

    const boughtAtFloat = parseFloat(boughtAt);
    const returnsFloat = parseFloat(returns);
    
    if (isNaN(boughtAtFloat) || isNaN(returnsFloat)) {
        return res.status(400).send('Invalid input values');
    }
    
    const returnPercentage = (returnsFloat / boughtAtFloat) * 100;
    
    res.send(returnPercentage.toString());
});

// Endpoint 4: Calculate the Total Return Percentage
app.get('/total-return-percentage', (req, res) => {
    const { stock1, stock2, stock3, stock4 } = req.query;

    const totalReturnPercentage = parseFloat(stock1) + parseFloat(stock2) + parseFloat(stock3) + parseFloat(stock4);
    
    if (isNaN(totalReturnPercentage)) {
        return res.status(400).send('Invalid input values');
    }
    
    res.send(totalReturnPercentage.toString());
});

// Endpoint 5: Identify the Status of Stocks based on their Return Value
app.get('/status', (req, res) => {
    const { returnPercentage } = req.query;
    
    const returnPercentageFloat = parseFloat(returnPercentage);
    
    if (isNaN(returnPercentageFloat)) {
        return res.status(400).send('Invalid input values');
    }
    
    const status = returnPercentageFloat > 0 ? 'profit' : 'loss';
    
    res.send(status);
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
