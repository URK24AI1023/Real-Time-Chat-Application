import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Register(){


const [username,setUsername]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const navigate=useNavigate();





const registerUser=async()=>{


try{


await axios.post(

"http://localhost:5000/api/auth/register",

{

username,

email,

password

}

);



alert(
"Registration successful"
);



navigate("/");



}

catch(error){


console.log(error.response);


alert(
"Registration failed"
);


}



};






return(


<div style={styles.container}>


<div style={styles.box}>


<h2>
Create Account
</h2>



<input

style={styles.input}

placeholder="Username"

value={username}

onChange={
e=>setUsername(e.target.value)
}

/>



<input

style={styles.input}

placeholder="Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>



<input

style={styles.input}

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>




<button

style={styles.button}

onClick={registerUser}

>

Register

</button>




<p>

Already have account?


<Link to="/">

 Login

</Link>


</p>



</div>


</div>


);


}





const styles={


container:{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:
"linear-gradient(135deg,#141e30,#243b55)"

},


box:{

background:"white",

padding:"40px",

borderRadius:"15px",

width:"350px",

textAlign:"center"

},


input:{

width:"90%",

padding:"12px",

margin:"10px",

borderRadius:"8px",

border:"1px solid gray"

},


button:{

padding:"12px 30px",

border:"none",

borderRadius:"20px",

background:"#667eea",

color:"white",

cursor:"pointer"

}


};



export default Register;