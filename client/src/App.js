import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Chat from "./Chat";

import { useState } from "react";


function App() {


  const [user,setUser] = useState(null);



  return (

    <BrowserRouter>


      <Routes>


        {/* Login Page */}

        <Route

          path="/"

          element={
            <Login setUser={setUser}/>
          }

        />



        {/* Register Page */}

        <Route

          path="/register"

          element={
            <Register/>
          }

        />



        {/* Chat Page */}

        <Route

          path="/chat"

          element={
            
            user ?

            <Chat user={user}/>

            :

            <Login setUser={setUser}/>

          }

        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;