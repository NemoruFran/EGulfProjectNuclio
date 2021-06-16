const mongoose = require("mongoose");


const NotificationsSchema = new mongoose.Schema({
    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    auctionId:[{
        type:mongoose.Schema.Types.ObjectId,
        
    }],
    name:String,
    seen:Boolean,
    TimeStamp:{type:Date,default:Date.now},
});


const NotificationsModel = mongoose.model('notifications',NotificationsSchema);

const getAll = async (notification) =>{
    const notifications = await NotificationsModel.find();
    return notifications;
}


const create = async (notification) => {
    const notificationCreated = await NotificationsModel.create(notification);
    return notificationCreated;
}

const getById = async (id) => {
    const notificationById = await NotificationsModel.findById;
    return notificationById;
}

const updateById = async (id,body) => {
    updateNotificationById = await NotificationsModel.findByIdAndUpdate(id,body);
    return updateNotificationById;
}

const deleteById = async (id) => {
    const deleteNotificationById = await NotificationsModel.findByIdAndDelete(id)
    return deleteNotificationById;
}








module.exports = {
    getAll,
    create,
    getById,
    updateById,
    deleteById,


}