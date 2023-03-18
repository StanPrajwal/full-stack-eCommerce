import { useNavigate } from "react-router-dom"

function Left(){
    const navigate = useNavigate()
    return <div id="left">
        <h4>JUST</h4>
        <h1>My Roots</h1>
        <p className="link" onClick={()=>navigate("/register")}>New User? <span>Register</span></p>
        <p className="link" onClick={()=>navigate("/login")}>Already have account? <span>SingIn</span></p>
    </div>
}
export default Left