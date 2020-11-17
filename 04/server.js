const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var messages = [
    {name:'Ted', message: 'hello'},
    {name:'Bill', message: 'hi'}
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body)
    res.sendStatus(200);
})

io.on('connection', (socket => {
    console.log("A User Connected");
}))

var server = http.listen(8080, () => {
    console.log('Listening on port ', server.address().port);
});