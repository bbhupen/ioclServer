const express = require('express')
const webPush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
require("./models/sub")
require('dotenv').config()
const app = express()


app.use(express.static(path.join(__dirname, "public")))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const publicVapidKey = process.env.VAPID_PUBLIC_KEY
const privateVapidKey= process.env.VAPID_PRIVATE_KEY
const PORT = process.env.PORT || 5000
const username = process.env.UNAME
const password = process.env.PASSWORD

app.use(cors({origin: 'https://ioclpushclient.herokuapp.com/'}));

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)


const Sub = mongoose.model('Sub')

const uri = `mongodb+srv://${username}:${password}@cluster0.jwows.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true })

mongoose.connection.on("error", function (error) {
  console.log(error)
})

mongoose.connection.on("open", function () {
  console.log("Connected to MongoDB database")
})


app.post("/subscribe", async (req,res) => {
  const subscription = req.body;
  console.log(subscription)


  const isSubbed = await Sub.findOne({subscription: subscription})

  if (!isSubbed){
    const newSub = new Sub({subscription: subscription})

    await newSub.save()
    console.log("Saved in database")
  }
  else {
    console.log("Already saved in database")
  }

})


app.post('/sendNotification', async(req,res)=> {
  const {title, body} = req.body

  const payload = JSON.stringify({
    title: title, 
    body: body,
  })

  console.log(payload)

  const sub = await Sub.find()
  sub.map((obj,i)=> {
    console.log(obj.subscription)
    webPush.sendNotification(obj.subscription, payload)
    .catch(err => console.log(err))
  })
})




app.listen(PORT, ()=> {
  console.log("Server listening on Port", PORT);
})

module.exports = app