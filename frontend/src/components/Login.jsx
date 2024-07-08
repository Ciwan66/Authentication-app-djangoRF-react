import "../App.css";
import Box from "@mui/material/Box";
import MyTextField from "./froms/MyTextField";
import MyPassField from "./froms/MyPassField";
import MyButton from "./froms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import AxiosInstance from './AxiosInstance'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  const {handleSubmit , control} = useForm()

  const submission = (data)=>{
    AxiosInstance.post('login/',{
      email:data.email,
      password:data.password
    }).then((response)=>{
      localStorage.setItem('Token',response.data.token)
     navigate("/home")
    })
    .catch((error)=>{
      console.error("Error during login",error)
    })
  }
  return (
    <div className={"myBackground"}>
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
        <Box className={"itemBox"}>
          <Link to="/register">No account yet? Please register</Link>
        </Box>
      </Box>
      </form>
    </div>
  );
};

export default Login;
