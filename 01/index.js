const express = require('express');
const {performance} = require('performance');

const app = express();
const PORT = 3000;

const WINDOW_Size = 10;
const API_URL = 'https://localhost:9876/numbers/';
const numbers =[];


const handlenumbers= (n)=>{
    if(!numbers.includes(n)){
        if(numbers.length >= WINDOW_Size){
            numbers.shift()
        }
        numbers.push(n);
    }
}

async function getData(id){
    try{
        const startTime = performance.now();
        const res = await fetch(API_URL+id);
        const endTime = performance.now();
        const elapsedTIme = endTime - startTime;
        
        if(response.ok && elapsedTIme <=500){
            const data = await res.json();
            // console.log(data);
            const numbers = data.numbers;
            numbers.forEach(n => handlenumbers(n));
        }
        
    }
    catch(e){
        console.error("Error Fetching Data")
    }
}


///////AVerage CAlculation/////

const avg = ()=>{
    const sum = numbers.reduce((acc,n) => acc+n,0);
    return numbers.length>0 ? sum/numbers.length :0;
}

app.get('/numbers/:id',async(req,res) =>{
    const n_id = req.params;
    console.log(n_id);
    await getData(n_id);
    const AVerage = avg();

    res.json({
        "windowPrevState":[],
        "windowCurrState":[...numbers],
        "numbers":[...numbers],
        "avg":avg.toFixec(2)
    })
})


app.listen(PORT,() =>{
    console.log(`Server is Listening at port ${PORT}`);
})
