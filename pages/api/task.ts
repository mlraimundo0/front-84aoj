import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { connectDb} from '../../middlewares/connectDb';
import { jwtValidator} from '../../middlewares/jwtValidator';
import { TaskRequest } from '../../types/TaskRequest';
import moment from 'moment';
import { TaskModel } from '../../models/TaskModel';

const taskEndpoint = async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    if(req.method === 'POST'){
        const {userId} = req.body || req.query;
        const body = req.body as TaskRequest;

        if(!userId){
            return res.status(400).json({ error : 'Usuario não informado'});
        }

        if(!body.name || body.name.length < 2 ){
            return res.status(400).json({ error : 'Nome inválido'});
        }

        if(!body.previsionDate){
            return res.status(400).json({ error : 'Data inválida'});
        }

        const previsionDate = moment(body.previsionDate);
        const now = moment();
        now.set({hour:0,minute:0,second:0,millisecond:0})
        if(previsionDate.isBefore(now) ){
            return res.status(400).json({ error : 'Data não pode ser menor que hoje'});
        }

        const task = {
            name : body.name,
            userId,
            previsionDate : previsionDate.toDate()
        }

        await TaskModel.create(task);
        return res.status(200).json({ msg : 'Tarefa Criada'});
    }

    return res.status(405).json({ error : 'Metodo infomado não é valido'});
}

export default connectDb(jwtValidator(taskEndpoint));