const { urlencoded } = require("express")
const exp = require("express")
const fs = require("fs")
const path = require("path")
const app = exp()
const mon = require("mongoose")
mon.connect(`mongodb://localhost/DancePanda`, { useNewUrlParser: true, useUnifiedTopology: true })
const port = 5001
const lchost = '127.0.0.1'

//Express specific stuffs
app.use('/static', exp.static('static'))
app.use(exp.urlencoded());

//pug specific stuffs
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//Mongoose schema and models
const conschema = new mon.Schema({
    name: String,
    phone: Intl,
    email: String,
    address: String
})

const conmodel = mon.model('Data', conschema)

//Endpoints
app.get('/', (req, res) => {
    res.status(200).render('home.pug')
})
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
})

//To save it into a file specific stuff
// app.post('/contact', (req,res)=>{
//     nm=req.body.name
//     ph=req.body.phone
//     eml=req.body.email
//     add=req.body.address

//     let write=`The name is ${nm} his phone number is ${ph} his e-mail id is ${eml} and finally he lives in ${add}`
//     fs.writeFileSync(`output.txt`,write)
//     const msg=`message: Your form is submitted successfully`
//     res.status(200).render('contact.pug', msg)
// })

//Mongoose specific stuff
app.post('/contact', (req, res) => {
    let myData = new conmodel(req.body)
        myData.save().then(() => {
        res.status(200).send("The items are saved into the DataBase")
        }).catch(() => {
        res.status(404).send("Oops!! Something went wrong!")
        })
})
//listening to server
app.listen(port, lchost, () => {
    console.log(`Sir your server is running successfully at ${port} port`)
    console.log(`click here to begun http://${lchost}:${port}/`)
})
