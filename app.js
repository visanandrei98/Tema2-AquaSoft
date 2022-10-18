const mysql = require('mysql'); // require() folosit de node.js pentru a citi module
const express = require('express');
var app = express();




const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    database: 'bazaDeDate',
    user: 'root',
    password: 'password'
}); // informatii luate din mySQL workbench cand am creeat database-ul



// Site-ul merge la port 3000 
app.listen(3000, () =>{
    console.log("Server is running at port 3000");
    mysqlConnection.connect((err) =>{
        if(err) throw err; //daca da eroare sa se opreasca functia
            console.log( 'Connection succeded'); // daca nu da eroare afiseaza textul
    });
})
// Cand dai request ('req') la localhost:3000/articles raspunsul('response')
// sa fie  variabila "sql" (tot tabelul creeat in mysql Workbench), in caz ca da eroare
// sa se opreasca functia, in caz ca nu da eroare sa se afiseze rezultatele sub forma unui array cu obiecte("res.send()")
app.get('/articles', (req, res) =>{
    let sql = 'SELECT  * from Articles'; 
    mysqlConnection.query(sql, (err,results) =>{
        if (err) throw err;
        res.send(results);
    })
});
//////////get pentru a selecta doar un element cu in functie de "article_weight"
app.get('/articles/:article_weight', (req, res) =>{
    let sql = 'SELECT  * FROM Articles WHERE Article_weight = ?'; 
    mysqlConnection.query(sql, [req.params.article_weight] , (err,results) =>{
        if (err) throw err;
        res.send(results);
    })
});


//////////Delete pentru a sterge un element din tabel in functie de "Location"
app.delete('/articles/:Location', (req, res) =>{
    let sql = 'Delete FROM Articles WHERE Location = ?'; 
    mysqlConnection.query(sql, [req.params.Location] , (err,results) =>{
        if (err) throw err;
        res.send("Deleted location");
    })
});


/////////////POST



////////PUT