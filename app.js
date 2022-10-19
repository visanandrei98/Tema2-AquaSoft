const mysql = require('mysql'); // require() folosit de node.js pentru a citi module
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
    


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    database: 'bazaDeDate',
    user: 'root',
    password: 'password',
    multipleStatements : true
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


//////////Delete pentru a sterge un element din tabel in functie de "Location". Pentru a vedea schimbarile voi folosi un API "Postman"
app.delete('/articles/:Location', (req, res) =>{
    var sql = 'Delete FROM Articles WHERE Location = ?'; 
    mysqlConnection.query(sql, [req.params.Location] , (err,results) =>{
        if (err) throw err;
        res.send("Deleted location");
    })
});


/////////////PUT
app.put('/articles', (req, res) =>{
    let art = req.body;
    let post = {
        ID : art.ID, 
        Article_no : art.Article_no, 
        Article_short_description: art.Article_short_description, 
        Article_date: art.Article_date, 
        Collection_date: art.Collection_date, 
        Article_body: art.Article_body, 
        Article_source: art.Article_source, 
        Article_url: art.Article_url, 
        Location: art.Location, 
        Article_keywords: art.Article_keywords, 
        Article_weight: art.Article_weight, 
        Article_citations: art.Article_citations
    }
    let sql = 'SET @ID = ?; SET @Article_no = ?; SET @Article_short_description = ?; SET @Article_date = ?; SET @Collection_date = ?; SET @Article_body = ?; SET @Article_source = ?; SET @Article_url = ?; SET @Location = ?; SET @Article_keywords = ?; SET @Article_weight = ?; SET @Article_citations = ?; \
    CALL AddOrEditArticle(@ID, @Article_no, @Article_short_description, @Article_date, @Collection_date, @Article_body, @Article_source, @Article_url, @Location, @Article_keywords, @Article_weight, @Article_citations);';
     
    mysqlConnection.query(sql, post , (err,results) =>{
        if (err) throw err;
        res.send('Updated succesfully');
    })
});

//Articolul se va updatata daca folosesc un articol cu un ID deja existent
// de exemplu: 

// {
//     "ID": 2,
//     "Article_no": "10",
//     "Article_short_description": "Youtube JOB",
//     "Article_date": "2022-05-05",
//     "Collection_date": "2022-02-01",
//     "Article_body": "Angajam la youtube ",
//     "Article_source": "youtube",
//     "Article_URL": "youtube.com",
//     "Location": "England",
//     "Article_keywords": "job Youtube England",
//     "Article_weight": 550,
//     "Article_citations": "youtube.com"
// }

// Articolul cu ID 2 va fi updatat cu urmatoarele informatii




////////POST

app.post('/articles', (req, res) =>{
    let art = req.body;
    let post = {
        ID : art.ID, 
        Article_no : art.Article_no, 
        Article_short_description: art.Article_short_description, 
        Article_date: art.Article_date, 
        Collection_date: art.Collection_date, 
        Article_body: art.Article_body, 
        Article_source: art.Article_source, 
        Article_url: art.Article_url, 
        Location: art.Location, 
        Article_keywords: art.Article_keywords, 
        Article_weight: art.Article_weight, 
        Article_citations: art.Article_citations
    };
    var sql = 'SET @ID = ?; SET @Article_no = ?; SET @Article_short_description = ?; SET @Article_date = ?; SET @Collection_date = ?; SET @Article_body = ?; SET @Article_source = ?; SET @Article_url = ?; SET @Location = ?; SET @Article_keywords = ?; SET @Article_weight = ?; SET @Article_citations = ?; \
    CALL AddOrEditArticle(@ID, @Article_no, @Article_short_description, @Article_date, @Collection_date, @Article_body, @Article_source, @Article_url, @Location, @Article_keywords, @Article_weight, @Article_citations);';
     
    mysqlConnection.query(sql, post , (err,results) =>{
        if (err) throw err;
        res.send(results);
    })
});


// am incercat sa adaug un nou articol folosind "postman" -> "POST" 
// {
//     "ID": 0,
//     "Article_no": "10",
//     "Article_short_description": "Youtube JOB",
//     "Article_date": "2022-05-05",
//     "Collection_date": "2022-02-01",
//     "Article_body": "Angajam la youtube ",
//     "Article_source": "youtube",
//     "Article_URL": "youtube.com",
//     "Location": "England",
//     "Article_keywords": "job Youtube England",
//     "Article_weight": 550,
//     "Article_citations": "youtube.com"
// }
// Conform procedurii creeate in mysql workbench "AddOrEditArticle"
// daca ID ul nou este = 0 introduce toate valorile articolului, altfel
// actualizeaza articolul cu noile valorile introduse


/// postman JSON link -> https://www.getpostman.com/collections/29f9630b9ef0278203f0