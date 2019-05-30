import  RabbitQP  from '../rabbitApi/sendApi';
import { Rabbit } from '../../index';


export default class ChatControllerApi {
    static async getUsers(req, res) {
        try{
            const users = await RabbitQP.handleEvent({ exchange: 'jobs', routingKey: '', content: { msg: 'Great this works', task: 'publish' }})
        }catch(error){}
        res.status(200).json({msg: 'This is successful'})
    }

    static async postChat(req, res) {
        const { body, method, url } = req;
        const payload = {
            url,
            method,
            id: 'hhjjdu7',
            body: body.content,
            sentBy: body.sentBy,
            sendTo: body.sendTo,
            exchange: body.exchange
        }
        try{
            const result = await Rabbit.publishExchange(body.exchange, body.routingKey, payload)
            res.status(201).json({ msg: 'Successfully sent message' })
        } catch(error) {
            res.status(404).json(error.message)
        }
    }
}