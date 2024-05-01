const app = require('express')();





/// change the numbers as required
let numbers = [1,2,3,4,5,6]






app.get('/numbers',(req,res)=>{
    console.log("Get request received");
    rNum = {
        numbers:[...numbers]
    }
    res.send(rNum)
})

app.listen(4000);