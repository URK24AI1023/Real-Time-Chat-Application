import { useEffect, useState, useRef } from "react";
import axios from "axios";
import socket from "./socket";


function Chat({user}) {


const [message,setMessage] = useState("");

const [messages,setMessages] = useState([]);

const messagesEndRef = useRef(null);





const loadMessages = async()=>{


    try{


        const res =
        await axios.get(
            "http://localhost:5000/api/messages/room1"
        );


        setMessages(res.data);



    }
    catch(error){

        console.log(error);

    }


};







useEffect(()=>{


    if(!user?._id)
        return;




    socket.emit(
        "userOnline",
        user._id
    );



    socket.emit(
        "joinRoom",
        "room1"
    );



    loadMessages();





    const receiveMessage=(data)=>{


        setMessages(prev=>[

            ...prev,

            data

        ]);


    };





    socket.on(
        "receiveMessage",
        receiveMessage
    );





    return ()=>{


        socket.off(
            "receiveMessage",
            receiveMessage
        );


    };



},[user._id]);








useEffect(()=>{


    messagesEndRef.current?.scrollIntoView(
        {
            behavior:"smooth"
        }
    );


},[messages]);










const sendMessage=()=>{


    if(!message.trim())
        return;




    socket.emit(
        "sendMessage",
        {

            senderId:user._id,

            receiverId:null,

            message:message,

            roomId:"room1"

        }
    );



    setMessage("");

};









return (

<div style={styles.page}>


<div style={styles.chatBox}>


{/* Header */}

<div style={styles.header}>


<div style={styles.avatar}>

💬

</div>


<div>

<h3 style={styles.title}>
Real-Time Chat
</h3>


<p style={styles.online}>
🟢 Connected
</p>


</div>


</div>






{/* Messages */}

<div style={styles.messages}>


{

messages.map((msg,index)=>{



const senderId =
msg.senderId._id;


const ownMessage =
String(senderId) === String(user._id);




return(


<div

key={index}

style={{

display:"flex",

justifyContent:
ownMessage
?
"flex-end"
:
"flex-start"

}}

>




<div

style={{

...styles.bubble,


background:
ownMessage
?
"linear-gradient(135deg,#667eea,#764ba2)"
:
"rgba(255,255,255,0.15)"


}}


>


{

!ownMessage &&

<p style={styles.sender}>

{
msg.senderId?.username ||
"User"
}

</p>

}





<p style={styles.text}>

{msg.message}

</p>




<span style={styles.time}>

{

msg.createdAt &&

new Date(
msg.createdAt
)
.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
)

}

</span>




</div>



</div>



)


})

}




<div ref={messagesEndRef}/>


</div>







{/* Input */}


<div style={styles.inputArea}>


<input

style={styles.input}

value={message}

onChange={
e=>setMessage(e.target.value)
}


onKeyDown={
e=>{

if(e.key==="Enter")
sendMessage();

}

}


placeholder="Type your message..."

 />





<button

style={styles.button}

onClick={sendMessage}

>

➤

</button>



</div>






</div>


</div>


);



}









const styles={



page:{


height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:
"linear-gradient(135deg,#141e30,#243b55)"

},




chatBox:{


width:"450px",

height:"650px",

background:
"rgba(255,255,255,0.08)",

backdropFilter:"blur(15px)",

borderRadius:"20px",

display:"flex",

flexDirection:"column",

overflow:"hidden",

boxShadow:
"0 20px 50px rgba(0,0,0,0.4)"


},





header:{


padding:"20px",

display:"flex",

alignItems:"center",

gap:"15px",

background:
"rgba(255,255,255,0.12)"


},




avatar:{


width:"50px",

height:"50px",

borderRadius:"50%",

display:"flex",

alignItems:"center",

justifyContent:"center",

background:
"linear-gradient(135deg,#667eea,#764ba2)",

fontSize:"25px"


},





title:{


color:"white",

margin:0


},




online:{


color:"#00ff99",

margin:0,

fontSize:"13px"


},




messages:{


flex:1,

padding:"20px",

overflowY:"auto"


},




bubble:{


maxWidth:"70%",

padding:"12px 15px",

borderRadius:"18px",

marginBottom:"12px",

color:"white"


},




sender:{


fontSize:"12px",

color:"#00ff99",

margin:"0 0 5px 0"


},




text:{


margin:0,

fontSize:"15px"


},




time:{


fontSize:"11px",

opacity:0.6,

display:"block",

textAlign:"right",

marginTop:"5px"


},




inputArea:{


display:"flex",

padding:"15px",

gap:"10px"


},




input:{


flex:1,

borderRadius:"30px",

border:"none",

padding:"14px",

outline:"none"

},




button:{


width:"50px",

height:"50px",

borderRadius:"50%",

border:"none",

cursor:"pointer",

background:
"linear-gradient(135deg,#667eea,#764ba2)",

color:"white",

fontSize:"22px"


}



};



export default Chat;