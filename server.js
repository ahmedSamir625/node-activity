const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const Products = require('./Controllers/ProductsController')
const User = require('./Controllers/UsersController')
const Categories = require('./Controllers/CategoriesConroller')
const Authentication = require('./Controllers/AuthenticationController')


const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(
    // "mongodb://localhost/sawa2ni",
    "mongodb+srv://abosamra:sawa2ni123@sawa2nicluster.r91x9.mongodb.net/sawa2niDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('DB is connected...') })


//-----------------User----------------

app.get('/user', (req, res) => { User.getUser(req, res) })
app.get('/myCart', (req, res) => { User.getUserCart(req, res) })
app.put('/addToCart', (req, res) => { User.addToCart(req, res) })
app.put('/removeFromCart', (req, res) => { User.removeItemFromCart(req, res) })
app.put('/incrementProductAmount', (req, res) => { User.incrementUserProductAmount(req, res) })
app.put('/decrementProductAmount', (req, res) => { User.decrementUserProductAmount(req, res) })

//-----------------Products----------------

app.get('/products', (req, res) => { Products.getProducts(req, res) })
app.get('/products/:id', (req, res) => { Products.getProduct(req, res) })
app.get('/products/categories/:id', (req, res) => { Products.getCategoryProducts(req, res) })
app.post('/products', (req, res) => { Products.addProduct(req, res) })
app.put('/products/:id', (req, res) => { Products.editProduct_put(req, res) })
app.patch('/products/:id', (req, res) => { Products.editProduct_patch(req, res) })
app.delete('/products/:id', (req, res) => { Products.deleteProduct(req, res) })


//-----------------Categories----------------

app.get('/categories', (req, res) => { Categories.getCategories(req, res) })
app.post('/addCategory', (req, res) => { Categories.addCategory(req, res) })    


//-----------------Auth----------------
app.post('/register', (req, res) => { Authentication.handleRegister(req, res) })
app.get('/signin', (req, res) => { Authentication.handleSignin(req, res) })

//----------------------------------------

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is listening to port ${process.env.PORT || 3000}`)
})

