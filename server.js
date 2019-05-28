let express = require('express');
var bodyParser = require('body-parser');
const app = express();
let db=require('./database');
let tasks = [];
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.text());

app.post('/add', function (req, res) {
    try {
        // var bod = req.body;
        // console.log(req.headers);
    
       
        
        db.insertDocs(req.body.todo,function(insertedIds){
            tasks.push({"_id":insertedIds,"a":req.body.todo});
            
            res.send({"_id":insertedIds,"a":req.body.todo});
             console.log(insertedIds);
            // console.log(req.body.todo);
        })
        // res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(200);
    }

});

app.get('/data', function (req, res) {
    res.send(tasks);
    console.log(tasks);
});

app.post('/del', function (req, res) {
    try{
    let index = req.body.id;
    let p_id= req.body.p_id;
    tasks.splice( index, 1);
  
    // console.log(tasks);
    db.deleteDocs(p_id,function(result){
        console.log(result.result);
        
        res.send(tasks);
        console.log(tasks);
    });
    
    }catch(e){
        console.log(e);
    }
});
app.post('/update',function(req,res){
    try{
        let updval=req.body.value;
        let index= req.body.index;
        let p_id= req.body.id;
       
        console.log(p_id)

        // console.log(updval);
        db.update(p_id,updval,function(insertedId){
            
            tasks[index]={"_id":p_id,"a":updval};
            res.send(tasks);
            
           
            console.log(tasks);
        
            
        })
        
    }catch(e){
       e.sendStatus(500);
       console.log("enable to update");
    }
})



app.get('/data', function (req, res) {
    res.send(tasks);
});

function refilling(){
    db.getTask(function(result){
       tasks=result;
       });
}



app.listen(5000, function () {
    console.log('server running on port 5000');
    db.connect( function(){
        refilling();
    });
})