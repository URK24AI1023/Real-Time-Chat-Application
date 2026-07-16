const Message = require("../models/Message");
const User = require("../models/User");


const chatSocket = (io) => {

    io.on("connection", (socket) => {


        console.log(
            "User Connected:",
            socket.id
        );



        // User online
        socket.on("userOnline", async(userId)=>{

            try{

                const user =
                await User.findByIdAndUpdate(
                    userId,
                    {
                        status:"online"
                    },
                    {
                        new:true
                    }
                );


                if(user){

                    io.emit(
                        "userStatus",
                        {
                            userId:user._id,
                            status:"online"
                        }
                    );


                    console.log(
                        user.username,
                        "is online"
                    );

                }


            }
            catch(error){

                console.log(error);

            }


        });





        // Join Room
        socket.on(
            "joinRoom",
            (roomId)=>{


                socket.join(roomId);


                console.log(
                    "Joined room",
                    roomId
                );


            }
        );







        // Send Message
        socket.on(
            "sendMessage",
            async(data)=>{


                try{


                    const newMessage =
                    await Message.create({

                        senderId:data.senderId,

                        receiverId:data.receiverId || null,

                        message:data.message,

                        roomId:data.roomId

                    });





                    // Get sender username
                    const populatedMessage =
                    await Message.findById(
                        newMessage._id
                    )
                    .populate(
                        "senderId",
                        "username"
                    );






                    // Send to everyone in room
                    io.to(data.roomId)
                    .emit(
                        "receiveMessage",
                        populatedMessage
                    );



                }
                catch(error){

                    console.log(error);

                }



            }
        );







        // Disconnect
        socket.on(
            "disconnect",
            ()=>{

                console.log(
                    "User Disconnected:",
                    socket.id
                );

            }
        );



    });


};



module.exports = chatSocket;