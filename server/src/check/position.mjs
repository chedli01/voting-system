import { Router } from "express";

const route = Router();

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth’s mean radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

route.post("/api/verifyPosition",async(req,res)=>{
    const eventLatitude = 36.843155665949375; // replace with your event's latitude
    const eventLongitude = 10.197701558429161; // replace with your event's longitude
    const eventAccuracy=50;

    const userLatitude=parseFloat(req.body.latitude);
    const userLongitude=parseFloat(req.body.longitude);
    const accuracy=parseFloat(req.body.accuracy)
    /* const radius = 10; */
    //high radius for testing purposes
    const radius = 10
    const adjustedRadius=radius+Math.abs(accuracy-eventAccuracy)

    const distance= await getDistance(userLatitude,userLongitude,eventLatitude,eventLongitude)

    if(distance<=adjustedRadius){

        res.status(201).json({valid:true})

    }
    else{

        res.status(201).json({valid:false})

    }

})

export default route;