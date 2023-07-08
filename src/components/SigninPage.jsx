import React, { createContext, useState } from "react";

import {useCookies } from "react-cookie";

const SinginPage = ({setCook}) => {
  const [signInData,setSignInData] = useState({
    email:"",
    password:"",
  });
  // const [cookies, setCookie] = useCookies(["user"]);
  const [message,setMessage] = useState("Not Succesful");

  const inputEvent = (event) => {
    // console.log(cookies.prasad)
    const {name,value} = event.target;
    setSignInData((preval) => ({
        ...preval,
        [name]:value
    }))
  }


  // const removeCookie = async () => {
  //   console.log(cookies.prasad)
  //   document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // }


  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const res = await fetch("http://localhost:8000/signin",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(signInData)
        })
        const data =  await res.json();
        // console.log(data);
        if(res.ok){
          setMessage("succesful")
          // console.log(await res.json());
          setCook("Prasad",data.token,{ path: "/" })
          // localStorage.setItem("jwt",data.token)
        }else{
          console.log("Request failed");
        }
      }catch (error){
        console.log(error);
      }
  }
    return (
        <>

         
            <div class="outer-box">
    <div class="inner-box">

        <header class="signup-header">
          <h1>Signin</h1>
          <p>It just take 30 seconds</p>
        </header>
       <main class="signup-body">
        <form onSubmit={handleSubmit} class="form">
          <p>
            <label for="fname" class="field">Enter Your Email</label>
            <input type="email" class="fname" name="email" value={signInData.email} onChange={inputEvent}/>
          </p>
          <p>
            <label for="fname" class="field"  >Password</label>
            <input type="password" class="fname" name="password" value={signInData.password} onChange={inputEvent} />
          </p>
          <p>

            <input type="submit" id="submit" value="create Account"/>
          </p>
        </form>
       </main>
       <footer class="signup-footer">
        <p>Alerady have an account? <a href="#">login</a></p>
       </footer>

    </div>
    <div class="circle c1"></div>
    <div class="circle c2"></div>
  </div>
            <div>
                {message}
            </div>
        </>
    )
}
export default SinginPage;