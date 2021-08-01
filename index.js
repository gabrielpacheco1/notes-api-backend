const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')

app.use(express.json())

app.use(logger)

app.use(cors())

let notes = [
    {
        'id': 1,
        'content': 'Suscribir a canal',
        'date': '29 Julio 2021',
        'importart': false
    },
    {
        'id': 2,
        'content': 'Seguir curso Node',
        'date': '29 Julio 2021',
        'importart': true
    },
    {
        'id': 3,
        'content': 'Seguir curso Node',
        'date': '29 Julio 2021',
        'importart': true
    }
]

/* const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json' });
    response.end(JSON.stringify(notes));
}) */

app.get('/', (request, response) => {
    response.send('<h1>Hola mundo</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    } else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note= request.body 

    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids= notes.map(note => note.id)
    const maxId= Math.max(...ids)

    const newNote= {
        id: maxId+1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes= [...notes, newNote]

    response.status(201).json(newNote)
})

app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})

const port= 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`) 
})


