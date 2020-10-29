//load libraries
const express = require('express')
const handlebars = require('express-handlebars')

//configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

//create express instance
const app = express()

//set up handlebars
app.engine('hbs',
    handlebars({defaultLayout: 'default.hbs'})
)

app.set('view engine', 'hbs')

//configure routes
app.post('/',
    express.urlencoded({extended: true}),
    (req, resp) => {
        console.info(req.body)
        const items = JSON.parse(req.body.cartState)
        items.push({
            item: req.body.item,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice
        })
        resp.status(200)
        resp.type('text/html')
        resp.render('cart',
        {
            items,
            state: JSON.stringify(items)
        })
    }
)

app.get('/',
    (req, resp) => {
        const items = []
        resp.status(200)
        resp.type('text/html')
        resp.render('cart',
            {
                state: JSON.stringify(items)
            }
        )
    }
)

app.use(express.static(__dirname + '/public'))

//start express
app.listen(PORT,
    () => {
        console.info(`Application started at PORT ${PORT} at ${new Date()}`)
    }
)