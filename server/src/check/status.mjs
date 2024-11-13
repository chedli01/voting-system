import { Router } from "express";
const route = Router();

route.get("/api/isconnected",async(req,res)=>{
    /* if(req.cookies.connectionCookie) {return res.json({connected:true})}
    else{
        return res.json({connected:false})
    } */
   return res.json({connected:false})
})

export default route;