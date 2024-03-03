
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