const express = require ('express');
const router = express.Router();
const notificationsControllers = require ('./notifications.controllers');




router
   .route('/')
     .get(notificationsControllers.all)
     .post(notificationsControllers.create)



router
   .route('/:id')
     .get(notificationsControllers.getOne)
     .delete(notificationsControllers.remove)
     .put(notificationsControllers.update);


router
   .route('/user/:userId')
      .get(notificationsControllers.getNotificationsByUserId);
    




module.exports = router;