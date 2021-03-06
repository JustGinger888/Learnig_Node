const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = Promise

var dbURL = "mongodb+srv://user:user@cluster0.0yyio.mongodb.net/LearningNode?retryWrites=true&w=majority";

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body);

        var savedMessage = await message.save();

        console.log('saved');

        var censored = await Message.findOne({ message: 'badword' });

        if (censored) 
            await Message.remove({ _id: censored.id })
        else
            io.emit('message', req.body)

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500);
        return console.error(error);
    } finally {
        console.log("Post Called");
    }

        

})

io.on('connection', (socket => {
    console.log("A User Connected");
}))

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log("Mongo Connection", err);
})

var server = http.listen(8080, () => {
    console.log('Listening on port ', server.address().port);
});
