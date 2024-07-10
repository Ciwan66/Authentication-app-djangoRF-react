import "../App.css";
import Box from "@mui/material/Box";
import MyPassField from "./froms/MyPassField";
import { useState } from "react";
import MyButton from "./froms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useParams , useNavigate} from "react-router-dom";
import MyMessage from "./Message";

const PasswordResetRequest = () => {
  const { token } = useParams();
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm();

  const submission = (data) => {
    AxiosInstance.post(`password_reset/confirm/`, {
      password: data.password,
      token: token,
    }).then(() => {
      setIsDone(true);
      setTimeout(()=>{
        navigate('/')
      },2000)
    });
  };
  return (
    <div className={"myBackground"}>
         {isDone ? (
          <MyMessage
            text={
              "Your password reset was successfull, you will be directed to the login page in a second"
            }
          />
        ) : null}
      <form onSubmit={handleSubmit(submission)}>
        <Box className={"myWhiteBox"}>
          <Box className={"itemBox"}>
            <Box className={"title"}>Password Confirm </Box>
          </Box>
          <Box className={"itemBox"}>
            <MyPassField label="Password" name="password" control={control} />
          </Box>
          <Box className={"itemBox"}>
            <MyPassField
              label="Confirm Password"
              name="password2"
              control={control}
            />
          </Box>

          <Box className={"itemBox"}>
            {" "}
            <MyButton label={"Login"} type="submit" control={control} />
          </Box>
          <Box className={"itemBox"}>
            <Link to="/">Already registered? Please login</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
