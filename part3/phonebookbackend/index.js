const express = require('express')
const app = express()
const PORT = 8080

let hardCodedValues = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
    res.json(hardCodedValues)
})

app.get('/info',(req,res)=>{
    let len = hardCodedValues.length
    let time = new Date

    res.send(`
        <p>phonebook has info for ${len} people</p>
        <p>${time}</p>
        `)
})

app.get('/api/persons/:id',(req, res)=>{
    const id = req.params.id 
    
    
    if(!id){
        res.status(404)
    }

    res.json(hardCodedValues.find(item => item.id === id))
})

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})