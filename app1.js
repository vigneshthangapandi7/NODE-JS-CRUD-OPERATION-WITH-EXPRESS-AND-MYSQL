const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'products_and_categories'
// });

// connection.connect(function (err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('DATABASE CONNECTED');
//     }
// });


// app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'ejs');
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

var a=function(){
app.get(('/gotoproductoperation'),function(req,res){    
let sql1 = "select * from product_details";
let query1 = connection.query(sql1, function (err, datas) {
    if (err) {
        console.log(err);
    }
    res.render('user1_index', {
        title: "CATEGORIE'S AND PRODUCT'S CRUD OPERATION'S",
        product_details: datas
    });
});
});


app.get('/addproduct', function (req, res) {
    res.render('product_adding');
})


app.post('/saveproduct', function (req, res) {
    let proname = req.body;
    let sql = "INSERT INTO product_details(product_name,category_id) VALUES('" + req.body.pro_name + "','" + req.body.cat_id + "')"
    let query = connection.query(sql, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/user1_index.ejs');
        }
    });
})


app.get('/editproduct/:productid', function (req, res) {
    const productid = req.params.productid;
    let query = connection.query('Select * from product_details where product_id=?', productid, function (err, data) {
        if (err)
            throw (err)
        res.render('product_edit', {
            allData: data[0]
        })
    });
})


app.post('/updatepro', function (req, res) {
    let proname = req.body;
    let sql = "update product_details SET product_name='" + req.body.pro_name + "',product_id='" + req.body.pro_id + "' where product_id='" + req.body.pro_id + "'";
    //const productid = req.body.pro_id;
    let query = connection.query(sql, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/user1_index.ejs');
        }
    });
})


app.get('/deleteproduct/:productid', function (req, res) {
    const productid = req.params.productid;
    let query = connection.query('DELETE from product_details where product_id=?', productid, function (err, data) {
        if (err)
            throw (err);
        res.redirect('/user1_index.ejs');
    });
});

}
