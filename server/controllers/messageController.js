const Message = require("../models/Message");


const getMessages = async(req,res)=>{

    try{


        const messages =
        await Message.find({
            roomId:req.params.roomId
        })
        .populate(
            "senderId",
            "username"
        )
        .sort({
            createdAt:1
        });



        res.json(messages);



    }
    catch(error){


        console.log(error);


        res.status(500)
        .json({
            message:error.message
        });


    }

};



module.exports = {
    getMessages
};