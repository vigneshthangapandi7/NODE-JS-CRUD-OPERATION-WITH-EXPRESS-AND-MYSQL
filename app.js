const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const another=require('./app1.js')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'products_and_categories'
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('DATABASE CONNECTED');
    }
});


app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', function (req, res, next){
    let sql = "select * from category_details";
    let query = connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
        }
        res.render('user_index', {
            title: "CATEGORIE'S AND PRODUCT'S CRUD OPERATION'S",
            category_details: rows
        });
    });
});

app.get('/addCategory', function (req, res) {
    res.render('category_adding');
})


app.post('/save', function (req, res) {
    let cat_name = req.body;
    let sql = "INSERT INTO category_details(category_name) VALUES('" + req.body.cat_name + "')"
    let query = connection.query(sql, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
})


app.get('/editcategory/:categoryid', function (req, res) {
    const categoryid = req.params.categoryid;
    let query = connection.query('Select * from category_details where category_id=?', categoryid, function (err, data) {
        if (err)
            throw (err)
        res.render('category_edit', {
            allData: data[0]
        })
    });
})


app.post('/updatecat', function (req, res) {
    let catname = req.body;
    let sql = "update category_details SET category_name='" + req.body.cat_name + "' where category_id='" + req.body.cat_id + "'";
    const categoryid = req.body.cat_id;
    let query = connection.query(sql, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
})


app.get('/deletecategory/:categoryid', function (req, res) {
    const categoryid = req.params.categoryid;
    let query = connection.query('DELETE from category_details where category_id=?', categoryid, function (err, data) {
        if (err)
            throw (err);
        res.redirect('/');
    });
});







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
                res.redirect('http://localhost:3000/gotoproductoperation');
            }
        });
    })
    
    
    app.get('/editproduct/:productid', function (req, res) {
        const productid = req.params.productid;
        let query = connection.query('Select * from product_details where product_id=?', productid, function (err, data) {
            if (err)
                throw (err)
            res.render('product_edit', {
                allDataproduct: data[0]
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
                res.redirect('http://localhost:3000/gotoproductoperation');
            }
        });
    })
    
    
    app.get('/deleteproduct/:productid', function (req, res) {
        const productid = req.params.productid;
        let query = connection.query('DELETE from product_details where product_id=?', productid, function (err, data) {
            if (err)
                throw (err);
            res.redirect('http://localhost:3000/gotoproductoperation');
        });
    });
    
    
    


app.listen(3000);