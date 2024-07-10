import "../App.css";
import Box from "@mui/material/Box";
import MyTextField from "./froms/MyTextField";
import MyPassField from "./froms/MyPassField";
import MyButton from "./froms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import AxiosInstance from './AxiosInstance'
import { useNavigate } from "react-router-dom";
import MyMessage from "./Message";
import { useState ,useEffect } from "react";

const Login = () => {
  const navigate = useNavigate()
  const [isDone, setIsDone] = useState(false);
  const {handleSubmit , control} = useForm()

  const submission = (data)=>{
    AxiosInstance.post('login/',{
      email:data.email,
      password:data.password
    }).then((response)=>{
      localStorage.setItem('Token',response.data.token)
     navigate("/home")
    })
    .catch(()=>{
      setIsDone(true);
    })
  }
  useEffect(()=>{
    setTimeout(()=>{
      setIsDone(false)
    },5000)
  },[isDone])
  return (
    <div className={"myBackground"}>
        {isDone ? (
          <MyMessage
            text={'Login has failed, please try again, or reset your password'}
          />
        ) : null}
      <form onSubmit={handleSubmit(submission)}>
      <Box className={"myWhiteBox"}>
        <Box className={"itemBox"}>
          <Box className={"title"}>Login </Box>
        </Box>
        <Box className={"itemBox"}>
          <MyTextField label="Email" name="email" control={control}/>
        </Box>
        <Box className={"itemBox"}>
          <MyPassField label="Password" name="password" control={control}/>
        </Box>
        <Box className={"itemBox"}>
          {" "}
          <MyButton label={"Login"} type="submit"control={control} />
        </Box>
        <Box className={"itemBox"} sx={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
          <Link to="/register">No account yet? Please register</Link>
          <Link to="/password-reset">Forget password?</Link>
        </Box>
      </Box>
      </form>
    </div>
  );
};

export default Login;
