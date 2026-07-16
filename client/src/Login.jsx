import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Login({ setUser }) {


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const navigate = useNavigate();





    const loginUser = async()=>{


        try{


            const res = await axios.post(

                "http://localhost:5000/api/auth/login",

                {
                    email,
                    password
                }

            );



            console.log(res.data);



            // Store user details

            setUser(res.data.user);



            alert(
                "Login successful"
            );



            navigate("/chat");



        }

        catch(error){


            console.log(error.response);


            alert(
                "Login failed"
            );


        }


    };






    return(


        <div style={styles.container}>


            <div style={styles.box}>


                <h2>
                    Login
                </h2>




                <input

                    style={styles.input}

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={
                        (e)=>
                        setEmail(e.target.value)
                    }

                />




                <input

                    style={styles.input}

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={
                        (e)=>
                        setPassword(e.target.value)
                    }

                />





                <button

                    style={styles.button}

                    onClick={loginUser}

                >

                    Login

                </button>





                <p>

                    Don't have an account?

                    {" "}

                    <Link to="/register">

                        Register

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

    width:"350px",

    padding:"40px",

    background:"white",

    borderRadius:"15px",

    textAlign:"center",

    boxShadow:
    "0 10px 30px rgba(0,0,0,0.3)"

},



input:{

    width:"90%",

    padding:"12px",

    margin:"10px",

    borderRadius:"8px",

    border:"1px solid #ccc",

    fontSize:"15px"

},



button:{

    width:"95%",

    padding:"12px",

    marginTop:"15px",

    border:"none",

    borderRadius:"20px",

    background:
    "linear-gradient(135deg,#667eea,#764ba2)",

    color:"white",

    fontSize:"16px",

    cursor:"pointer"

}


};



export default Login;