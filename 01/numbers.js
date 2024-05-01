const app = require('express')();
let numbers = [1,3,5,7]
app.get('/numbers',(req,res)=>{
    console.log("Get request received");
    rNum = {
        numbers:[1,3,5,7]
    }
    res.send(rNum)
})

app.listen(4000);