import { Router } from "express";
const route = Router();

route.get("/isconnected",async(req,res)=>{
    if(req.cookies.connectionCookie) {return res.json({connected:true})}
    else{
        return res.json({connected:false})
    }
})

export default route;