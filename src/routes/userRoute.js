import  RabbitQP  from '../rabbitApi/sendApi';
import { Rabbit } from '../../index';


export default class UserControllerApi {
    static async getUsers(req, res) {
        try{
            const users = await RabbitQP.handleEvent({ exchange: 'jobs', routingKey: '', content: { msg: 'Great this works', task: 'publish' }})
        }catch(error){}
        res.status(200).json({msg: 'This is successful'})
    }

    static async postUser(req, res) {
        const { body, method, url } = req;
        const payload = {
            url,
            method,
            userName: body.userName,
            email: body.email,
            password: body.password,
        }
        try{
            // passport.authenticate('local', { session:false}, (error, user, info) => {
            //     if (error || !user) {
            //       return res.status(400).json({
            //         message: 'Something is not correct',
            //         user: user
            //       });
            //     }
            //     req.login(user, {session: false}, (error) => {
            //       if (error) {
            //         res.send(error);
            //       }
            //       var token = generateJWTToken(user.toJSON());
            //       return res.json({ user, token }); // aka {user: user, token: token}
            //     });
            //   })(req, res);
            await Rabbit.publishExchange(body.exchange, body.routingKey, payload)
            res.status(201).json({ msg: 'Successfully signed up'})
        } catch(error) {
            res.status(404).json(error.message)
        }
    }
}