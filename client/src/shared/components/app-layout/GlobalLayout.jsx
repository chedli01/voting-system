import { Outlet } from "react-router-dom";
import "./GlobalLayout.css"
export default function GlobalLayout(){
    return(
        <div className="layout-container">
            <div className="top-shadow"></div>
            <div className="bottom-shadow"></div>
            <div className="content-container">
                <Outlet></Outlet>
            </div>
        </div>
    )
}