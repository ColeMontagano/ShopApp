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
			description : 'From the MKIV Supra',
			price       : 10000,
			img         : '/images/2jz.jpg'
		},
		{
			name        : '1JZ - GTE',
			description : 'From the JDM MKIII Supra',
			price       : 7000,
			img         : '/images/1jz.jpg'
		},
		{
			name        : '7M - GTE',
			description : 'From the USDM MKIII Supra',
			price       : 3800,
			img         : '/images/7mgte.jpg'
		},
		{
			name        : '4A - GE',
			description : 'From the 87 Corolla',
			price       : 1200,
			img         : '/images/4age.jpg'
		},
		{
			name        : '3S - GTE',
			description : 'From the MR2 Turbo',
			price       : 3000,
			img         : '/images/3sgte.jpg'
		}
	],
	nissan    : [
		{
			name        : 'RB26',
			description : 'From the R34GTR',
			price       : 9000,
			img         : '/images/rb26.jpg'
		},
		{
			name        : 'RB25',
			description : 'From the R32GTR',
			price       : 8000,
			img         : '/images/rb25.jpg'
		},
		{
			name        : 'SR20DET',
			description : 'From the Silvia',
			price       : 2500,
			img         : '/images/sr20.jpg'
		},
		{
			name        : 'VQ35DE',
			description : 'From the 350Z',
			price       : 3600,
			img         : '/images/vq35.jpg'
		},
		{
			name        : 'VG30DETT',
			description : 'From the 300ZX',
			price       : 3200,
			img         : '/images/vg30.jpg'
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

app.post('/logout', (req, res) => {
	shop.cart = []
	shop.name = ''
	shop.cartTotal = 0
	res.redirect('/')
})

app.listen(8080, () => {
	console.log('Listening')
})
