const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')

app.use(morgan('dev'))

if (process.argv.length < 3){
    console.log("give password as an arg")
    process.exit(1)
}

const password =  process.argv[2]
const url = `mongodb+srv://nathanielW:${password}@helsinkifullstack.m8ocglr.mongodb.net/?appName=helsinkiFullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url,{family:4})

const userSchema = new mongoose.Schema({
    usersId:Number,
    usersName:String,
    usersPhoneNumber:Number
})

const Users = mongoose.model('Users',userSchema)



if (process.argv.length === 3){
    console.log('phonebook')
    Users.find({}).then(res =>{
    res.forEach(user =>{
        console.log(user.usersName,user.usersPhoneNumber)
    })
    mongoose.connection.close()
})
} else if (process.argv.length > 3){
    const id = Math.floor(Math.random() * 10000)
    const name  = process.argv[3]
    const number = process.argv[4]

    const user = new Users({
        usersId:id,
        usersName:name,
        usersPhoneNumber:number
    })

    user.save().then(res => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

