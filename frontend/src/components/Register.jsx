import "../App.css";
import Box from "@mui/material/Box";
import MyTextField from "./froms/MyTextField";
import MyPassField from "./froms/MyPassField";
import MyButton from "./froms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import AxiosInstance from './AxiosInstance'
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const schema = yup
  .object({
    email: yup.string().email().required("Email field is required"),
    password: yup.string().required("Password field is required").min(8,"This password is too short. It must contain at least 8 characters."),
    password2: yup.string().required("Confirm password field is required").oneOf([yup.ref('password'),null],"Password Does not match"),
  })
  .required()
const Register = () => {
  const navigate = useNavigate()

  const {handleSubmit , control} = useForm({
    resolver: yupResolver(schema),
  })

  const submission = (data)=>{
    AxiosInstance.post('register/',{
      email:data.email,
      password:data.password
    }).then(()=>{
     navigate("/")
    })
  }
  return (
    <div className={"myBackground"}>
      <form onSubmit={handleSubmit(submission)}>

      <Box className={"myWhiteBox"}>
        <Box className={"itemBox"}>
          <Box className={"title"}>User Registration </Box>
        </Box>
        <Box className={"itemBox"}>
          <MyTextField label="Email" name="email" control={control}/>
        </Box>
        <Box className={"itemBox"}>
          <MyPassField label="Password" name="password" control={control} />
        </Box>
        <Box className={"itemBox"}>
          <MyPassField label="Confirm Password" name="password2" control={control}/>
        </Box>
        <Box className={"itemBox"}>
          <MyButton label={"Register"} type="submit" />
        </Box>
        <Box className={"itemBox"}>
          <Link to="/">Already registered? Please login</Link>
        </Box>
      </Box>
      </form>

    </div>
  );
};

export default Register;
