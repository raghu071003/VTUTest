const express = require('express');
const { performance } = require('perf_hooks');


const app = express();
const PORT = 3000;

const WINDOW_SIZE = 10;
const API_URL = `http://localhost:4000/numbers`;
// const API_URL = `http://20.244.56.144/test/primes`
const numbers = [];
let prev = [];

const handleNumbers = (n) => {
    if (!numbers.includes(n)) {
        if (numbers.length >= WINDOW_SIZE) {
            numbers.unshift();
        }
        numbers.push(n);
    }
};

async function getData(id) {
    try {
        const startTime = performance.now();
        const res = await fetch(API_URL);
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        
        if (res.ok && elapsedTime <= 500) {
            const data = await res.json();
            prev = [...numbers]; // Store previous state
            const receivedNumbers = data.numbers;
            receivedNumbers.forEach(n => handleNumbers(n));
        }
        
    } catch (e) {
        console.error("Error Fetching Data", e);
    }
}

const avg = () => {
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return numbers.length > 0 ? sum / numbers.length : 0;
};

app.get('/numbers/:id', async (req, res) => {
    const n_id = req.params.id;
    console.log(n_id);
    await getData(n_id);
    const AVerage = avg();

    res.json({
        "windowPrevState": [...prev],
        "windowCurrState": [...numbers],
        "numbers": [...numbers],
        "avg": AVerage.toFixed(2)
    });
});

app.listen(PORT, () => {
    console.log(`Server is Listening at port ${PORT}`);
});
