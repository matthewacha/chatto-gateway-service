import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from 'morgan';

import routes from './src/routes';
import RabbitQP from './src/rabbitApi/sendApi';


dotenv.config()


const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// let chatExhange = Rabbit.createExchange('chat');
// rabbitConnection.on('ready', () => {
//     chatExhange = Rabbit.createExchange('chat')
// })

const url = process.env.CLOUDAMQP_URL || 'amqp://localhost'

export const Rabbit = new RabbitQP(url);
const rabbitConnection = Rabbit.createConnection(Rabbit.createsChannel);
rabbitConnection

routes(app);

console.log(process.env.CLOUDAMQP_URL, 'llllllllllll')

app.get('*', (req, res) => {
    res.send("Welcome to Chatto!");
  });


// throw errors from the application
app.use((error, req, res) => {
    console.log('kkkkkkkkk',error)
})

// run application to listen from a port

const port = process.env.PORT || 7070;
app.listen(port, () => {
    console.log(`The application is running on port ${port}`)
})

export default { app, Rabbit };