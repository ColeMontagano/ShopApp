const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

shop = {
	toyota    : [
		{
			name        : '2JZ - GTE',
			make        : 'toyota',
			description : 'From the MKIV Supra',
			price       : 10000,
			img         : '/images/2jz.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : '2jzgte'
		},
		{
			name        : '1JZ - GTE',
			make        : 'toyota',
			description : 'From the JDM MKIII Supra',
			price       : 7000,
			img         : '/images/1jz.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : '1jzgte'
		},
		{
			name        : '7M - GTE',
			make        : 'toyota',
			description : 'From the USDM MKIII Supra',
			price       : 3800,
			img         : '/images/7mgte.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : '7mgte'
		},
		{
			name        : '4A - GE',
			make        : 'toyota',
			description : 'From the 87 Corolla',
			price       : 1200,
			img         : '/images/4age.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : '4age'
		},
		{
			name        : '3S - GTE',
			make        : 'toyota',
			description : 'From the MR2 Turbo',
			price       : 3000,
			img         : '/images/3sgte.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : '3sgte'
		}
	],
	nissan    : [
		{
			name        : 'RB26',
			make        : 'nissan',
			description : 'From the R34GTR',
			price       : 9000,
			img         : '/images/rb26.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : 'rb26'
		},
		{
			name        : 'RB25',
			make        : 'nissan',
			description : 'From the R32GTR',
			price       : 8000,
			img         : '/images/rb25.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : 'rb25'
		},
		{
			name        : 'SR20DET',
			make        : 'nissan',
			description : 'From the Silvia',
			price       : 2500,
			img         : '/images/sr20.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : 'sr20det'
		},
		{
			name        : 'VQ35DE',
			make        : 'nissan',
			description : 'From the 350Z',
			price       : 3600,
			img         : '/images/vq35.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : 'vq35de'
		},
		{
			name        : 'VG30DETT',
			make        : 'nissan',
			description : 'From the 300ZX',
			price       : 3200,
			img         : '/images/vg30.jpg',
			hp          : 320,
			tq          : 300,
			dp          : 2997,
			id          : 'vg30dett'
		}
	],
	carousel  : [
		{
			name : 'JDM Import Motors',
			img  : '/carousel/jdmimportmotors.png'
		},
		{
			name : '2jz',
			img  : '/carousel/2jz.png'
		}
	],
	cart      : [],
	name      : '',
	cartTotal : 0
}

app.get('/', (req, res) => {
	res.json(shop)
})

app.post('/', (req, res) => {
	shop.cart = req.body.cart
	shop.cartTotal = req.body.cartTotal
	res.json(shop.cart)
})

app.get('/name', (req, res) => {
	res.json(shop.name)
})

app.post('/name', (req, res) => {
	shop.name = req.body.name
	res.json(shop.name)
})

app.get('/products/:make/:id', (req, res) => {
	let make = req.params.make


		make === 'toyota' ? (item = shop.toyota.find((item) => item.id === req.params.id)) :
		(item = shop.nissan.find((item) => item.id === req.params.id))
	res.json(item)
})

app.post('/logout', (req, res) => {
	shop.cart = []
	shop.name = ''
	shop.cartTotal = 0
	res.redirect('/')
})

app.listen(8080, () => {
	console.log('Listening')
})
