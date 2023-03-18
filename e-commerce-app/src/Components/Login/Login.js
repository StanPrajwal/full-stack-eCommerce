import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./Login.css"
import Left from './left';
import Axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    const [error,setError] = useState()
    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email id").required("Field required"),
        password: Yup.string().required("Field required").min(6).max(12)
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (data) => {
        console.log(data)
        Axios.post(`http://localhost:4000/user/login`,data)
        .then((res)=>{
            console.log(res.data.token)
            localStorage.setItem("token",res.data.token)
            reset()
            navigate("/product")
            
        })
        .catch((err)=>{
            console.log(err)
            setError(err.response.data.message)
                setTimeout(()=>{
                    setError()
            },3000)
                
        })
    }
    return <> 
    {error && <p id='fail' className='fail'>{error}</p>}
    <div className='login-container'>
        <Left/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-box'>
                <label>Email</label>
                <input
                    {...register('email')}
                    autoComplete="off"
                    placeholder='eg: john@gmail.com'
                />
                <p className='error'>{errors.email?.message}</p>
            </div>
            <div className='input-box'>
                <label>Password</label>
                <input
                    {...register('password')}
                    autoComplete="off"
                    placeholder='Password'
                />
                <p className='error'>{errors.password?.message}</p>
            </div>
            <div className='input-box'>
                <button>Login</button>
            </div>

        </form>
    </div>
    </>
}
export default Login