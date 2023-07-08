import React, { useState } from "react";


const SignupPage = () => {
    const [formdata,setformData]= useState({
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        age:"",
        gender:"",
        password:"",
        confirmpassword:""
    });
    const [message,setMessage] = useState("Not Succesful");


    const InputEvent = (event) => {
        // console.log(formdata)
        const {name,value} = event.target;
        setformData((preval) => ({
            ...preval,
            [name]:value,
        }))
    }


    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            })

            if(res.ok){
                setMessage("Succesful")
                const response = await res.json();
                // console.log(response);
              }else{
                console.log("Request failed");
              }
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <>
      
    <div id="form">
        <div class="container">
            <div class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-md-8 col-md-offset-2">
            <div id="userform">
                <ul class="nav nav-tabs nav-justified" role="tablist">
                <li class="active"><a href="#signup"  role="tab" data-toggle="tab">Sign up</a></li>
                </ul>
                <div class="tab-content">
                <div class="tab-pane fade active in" id="signup">
                    <h2 class="text-uppercase text-center"> Sign Up for Free</h2>
                        <form  onSubmit= {handelSubmit}>
                            <div class="row">
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="form-group">
                                            <label>First Name<span class="req">*</span> </label>
                                            <input type="text" class="form-control" name="firstname" autocomplete="on" onChange={InputEvent} value={formdata.firstname}/>
                                            <p class="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="form-group">
                                            <label> Last Name<span class="req">*</span> </label>
                                            <input type="text" class="form-control" name="lastname"  autocomplete="on" onChange={InputEvent}  value={formdata.lastname}/>
                                            <p class="help-block text-danger"></p>
                                        </div>
                                    </div>
                            </div>

                        
                                <div class="form-group">
                                    <label> Your Email<span class="req">*</span> </label>
                                    <input type="email" class="form-control" name="email"  autocomplete="on" onChange={InputEvent} value={formdata.email}/>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="form-group">

                                    <label> Your Phone<span class="req">*</span> </label>
                                    <input type="tel" class="form-control" name="phone"  autocomplete="on" onChange={InputEvent} value={formdata.phone}/>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="form-group">
                                        <label>Age<span class="req">*</span> </label>
                                        <input type="Number" class="form-control" name="age"  autocomplete="on" onChange={InputEvent} value={formdata.age}/>
                                        <p class="help-block text-danger"></p>
                                </div>
                                <div>
                                    <input type="radio" name="gender" value={"male"} onChange={InputEvent} /> Male
                                    <input type="radio" name="gender" value={"female"} onChange={InputEvent}/> Female

                                </div>
                                <div class="form-group">
                                    <label> Password<span class="req">*</span> </label>
                                    <input type="password" name="password" class="form-control" value={formdata.password} autocomplete="on" onChange={InputEvent}/>
                                    <p class="help-block text-danger"></p>
                                </div>
                            <div class="form-group">
                                <label> Checkpassword<span class="req">*</span> </label>
                                <input type="password" class="form-control" name="confirmpassword" value={formdata.confirmpassword} autocomplete="on" onChange={InputEvent}/>
                                <p class="help-block text-danger"></p>
                            </div>
                            <div class="mrgn-30-top">
                                <button type="submit" class="btn btn-larger btn-block">
                                Sign up
                                </button>
                            </div>
                        </form>
                </div>




                
                
                </div>
            </div>
            </div>
        </div>

</div>
            <div>
                {message}
            </div>
        </>
    )
}
export default SignupPage;