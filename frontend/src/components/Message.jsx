import { Box } from "@mui/material";
export const MyMessage = ({ text }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#2f293b",
        color: "#FFFFFF",
        width: "90%",
        height: "40px",
        position: "absolute",
        top: "30px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      }}
    >
      {text}
    </Box>
  );
};
export default MyMessage;
