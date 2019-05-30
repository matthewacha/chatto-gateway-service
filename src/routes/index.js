import UserControllerApi from './userRoute';
import ChatControllerApi from './chatRoute';


export default (app) => {
    app.get('/users', UserControllerApi.getUsers);
    app.post('/user', UserControllerApi.postUser);
    app.post('/chat', ChatControllerApi.postChat);
}