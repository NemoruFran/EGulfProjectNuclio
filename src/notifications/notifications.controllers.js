const NotificationsModel = require("./notifications.model");



const all = async (request,response) =>{
    const notification = await NotificationsModel.getAll();
    if (notification){
        return response.satus(200).json(notification);
    } else {
        return response.status(404).json('not found!');
    }
}

const getNotificationsByUserId = async (request,response) =>{
    const userId = request.params.userId;
    const notification = await NotificationsModel.filter({userId:userId});//userId clarito=parametro de schema de notificacion,userId mas oscurito viene de la constante de arriba
    if (notification){
        return response.status(200).json(notification);
    } else {
        return response.status(404).json('not found!');
    }
}


const create = async (request,response) => {
    const notification = await NotificationsModel.create(request.body);
    response.status(201).json(notification);
}

const getOne = async (request,response) => {
    const notificationById = await NotificationsModel.getById(request.params.id);
    if (notificationById){
        return response.status(200).json(notificationById)
    } else {
        return response.status(404).json('not found!')
    }
}

const update= async (request,response) =>{
    const id = request.params.id;
    const body =request.body;

    const updateNotification = await NotificationsModel.updateById(id,body)
    if (updateNotification){
        return response.status(200).json('Done!')
    }else{
        return response.satus(404).json('oops something went wrong!')
    }

}

const remove = async(req,res) => {
    const deleteNotificationById = await NotificationsModel.remove(req.params.id);
    if (deleteNotificationById){
      return response.status(200).json('deleted');
    }
      return res.status(404).json("oops not deleted");
  };




  module.exports = {
      all,
      getNotificationsByUserId,
      create,
      getOne,
      update,
      remove,
  }