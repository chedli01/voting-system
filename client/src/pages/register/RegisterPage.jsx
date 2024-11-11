import "./RegisterPage.css"
import enter from "../../assets/enter.png"
import jeiLogo from "../../assets/jei2.png"

export default function RegisterPage(){
    return(
        <div className="register-form-container">
            <img src={jeiLogo} alt="JEILogo" width="100px" height="50px"/>
            <div className="title-container">
                <h1 className="title-1">Hack for good</h1>
                <h1 className="title-2">3.0</h1>
            </div>
            <h2 style={{fontSize:'1em', color:'rgba(255,255,255,0.55)'}}>Voting System</h2>
            <form >
                <input type="text" name="unique-code" id="unique-code" placeholder="Enter your code" />
                <button id="register-form-submit" type="submit"><img src={enter} width='24px' height='30px'/></button>
            </form>
        </div>
    )
}