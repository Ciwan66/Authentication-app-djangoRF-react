import { useState,useEffect } from "react"
import AxiosInstance from './AxiosInstance'
import { Box } from "@mui/material"

const Home = () =>{
    const [isLoading ,setIsLoading] = useState(true)
    const [myData,setMyData] = useState()

    const GetData = ()=>{
        AxiosInstance.get('user').then((res)=>{
            setMyData(res.data)
            setIsLoading(false)
        })
    }
    useEffect(()=>{
        GetData()
    },[])
    return (
        <div>
            {isLoading? ('Loading..'):myData.map((item , index)=>(
                <Box key={index} sx={{boxShadow:4 , m:2, p:2}}>
                    <div>ID : {item.id}</div>
                    <div>Email : {item.email}</div>
                </Box>
            ))}

        </div>
    )
}

export default Home