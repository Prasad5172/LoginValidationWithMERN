import React from "react";
import { NavLink } from 'react-router-dom';
import {useCookies } from "react-cookie";
const Navbar = (props) => {
    const [cookie, setCookie] = useCookies(["pradeep"])
    // const handelSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const res = await fetch("http://localhost:8000/logout",{
    //             method:"GET",
    //             headers:{
    //                 "Content-Type":"application/json",
    //             },
    //             // body:JSON.stringify(formdata)
    //         })
    //         if(res.ok){
    //             // setMessage("Succesful")
    //             const response = await res.json();
    //             // console.log(response);
    //           } else {
    //             console.log("Request failed");
    //           }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const logoutEvent = async () => {
        var userCookie =1
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split("=");
            if (cookie[0] === "Prasad") {
                userCookie = cookie[1];
            }
        }
        // console.log(userCookie)
        try {
                const res = await fetch("http://localhost:8000/logout",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({token:userCookie})
                })
                } catch (error) {
                    console.log(error)
                }
        props.cookieremove()
    }
    const logoutOfAllEvent = async () => {
        console.log("logoutofallevent")
        var userCookie =1
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split("=");
            if (cookie[0] === "Prasad") {
                userCookie = cookie[1];
            }
        }
        try {
                const res = await fetch("http://localhost:8000/logoutofall",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({token:userCookie})
                })

                console.log(res);
        } catch (error) {
                    console.log(error)
        }
        props.cookieremove()
    }
    return (
        <>

            <div>
                <NavLink to="/"  > Home</NavLink>
                <NavLink to="/signup" > signup</NavLink>
                <NavLink to="/signin" > signin</NavLink>
                <button onClick={logoutEvent}> logout</button>
                <button onClick={logoutOfAllEvent}> logoutOfAll</button>
            </div>
         
        </>
    )
}
export default Navbar;