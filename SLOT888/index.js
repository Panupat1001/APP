const express = require('express')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log('Server Started on port 3000') )

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_selected2023'
}); 
conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
module.exports = conn;


app.get('/', (request, response) => {        
    response.status(201).json({ message: 'NodeJS Okay' })
})

app.get('/random', (request, response) => {        
    response.status(200).json({ message: 'Random Page' })
})

app.get('/plus/:var1/:var2', (request, response) => {
    response.status(200).json({ 
        message: 'Plus function',
        reqVar1: request.params.var1,
        reqVar2: request.params.var2,
        result: parseInt(request.params.var1)+parseInt(request.params.var2)
    })
})

app.get('/plus', (request, response) => {
    response.status(200).json({ 
        message: 'Plus function with Query',
        reqQuery1: request.query.a,
        reqQuery2: request.query.b        
    })
})

app.post('/plus', (request, response) => {
    response.status(200).json({ 
        message: 'Plus function with POST method',        
        reqValue1: request.body.value_1,
        reqValue2: request.body.value_2      
    })
})

app.post('/plus/save', (request, response) => {
    var result = parseFloat(request.body.value1) + parseFloat(request.body.value2);
    var sql = "INSERT INTO plus (value_1, value_2, result) VALUES  ? ";
    var values = [  
                    [ request.body.value1,
                    request.body.value2, 
                    result]
                    ];
    conn.query(sql, [values], function (err, result) {
        if (err) throw err;
    });
    response.status(200).json({ 
        message: 'Plus function with POST method',        
        result: result        
    });
})

app.get('/func/:id/:username', (request, response)=>{
    response.status(200).json({ 
        reqID: request.params.id,
        reqName: request.params.username
    });
})


