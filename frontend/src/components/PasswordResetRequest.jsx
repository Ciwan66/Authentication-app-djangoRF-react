import "../App.css";
import Box from "@mui/material/Box";
import MyTextField from "./froms/MyTextField";
import MyButton from "./froms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import MyMessage from "./Message";
import { useState } from "react";
const PasswordResetRequest = () => {
  const [isDone, setIsDone] = useState(false);
  const { handleSubmit, control } = useForm();

  const submission = (data) => {
    AxiosInstance.post("password_reset/", {
      email: data.email,
    }).then(() => {
      setIsDone(true);
    });
  };
  return (
    <div className={"myBackground"} >
       {isDone ? (
          <MyMessage
            text={
              "If your email exists you have received an email with instructions for resetting the password"
            }
          />
        ) : null}
      <form onSubmit={handleSubmit(submission)}>
       
        <Box className={"myWhiteBox"}>
          <Box className={"itemBox"}>
            <Box className={"title"}>Password Reset </Box>
          </Box>
          <Box className={"itemBox"}>
            <MyTextField label="Email" name="email" control={control} />
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
