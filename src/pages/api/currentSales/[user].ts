
import Controller from '@/controller/mainController';
import type { NextApiRequest, NextApiResponse } from 'next'


interface CustomApiRequest extends NextApiRequest {
  query: {
    user: string;
  };
}


export default async function  handler(
  req: CustomApiRequest,
  res: NextApiResponse
) {
  const { user } = req.query;
  const dateIni = req.body.dateIni;
  const dateFim =  req.body.dateFim;
  const admin:boolean = req.body.admin
  const limit:number = req.body.limit;
  const page:number = req.body.page

  if(!dateIni || !dateFim || admin == null || admin == undefined) return res.status(401).json({error:'erro'});

  const controller = new Controller(user)
  const data = await controller.getSales(dateIni,dateFim,admin,page,limit);

  if(data == 402){
    return res.status(402).json({erro: 'erro ao consultar no banco de dados'})
  }

  return res.status(200).json(data);
}
