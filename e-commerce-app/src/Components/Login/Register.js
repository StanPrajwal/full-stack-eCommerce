import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "./Login.css"
import Left from './left';
import Axios from "axios"
import { useState } from 'react';
function Register() {
    const [success,setSuccess] = useState()
    const [error,setError] = useState()
    const registerSchema = Yup.object().shape({
        first_name:Yup.string().required("Filed require"),
        last_name:Yup.string().required("Filed require"),
        email: Yup.string().email("Invalid email id").required("Field required"),
        password: Yup.string().required("Field required").min(6).max(12)
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data) => {
        console.log(data)
        Axios.post(`http://localhost:4000/user/register`,data)
            .then((res)=>{
                // console.log(res)
                reset()
                setSuccess(res.data.message)
                setTimeout(()=>{
                    setSuccess()
                },3000)
            })
            .catch((err)=>{
                // console.log(err)
                setError(err.response.data.message)
                setTimeout(()=>{
                    setError()
                },3000)
                
            })
    }
    return <>
    {success && <p id='success' className='success'>{success}</p>}
    {error && <p id='fail' className='fail'>{error}</p>}
    <div className='login-container'>
        <Left />
        <form onSubmit={handleSubmit(onSubmit)} id="register">
            <div className='input-box'>
                <label>First Name</label>
                <input
                    {...register('first_name')}
                    autoComplete="off"
                    placeholder='First name'
                />
                <p className='error'>{errors.first_name?.message}</p>
            </div>
            <div className='input-box'>
                <label>Last Name</label>
                <input
                    {...register('last_name')}
                    autoComplete="off"
                    placeholder='Last name'
                />
                <p className='error'>{errors.last_name?.message}</p>
            </div>
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
                <button>Register</button>
            </div>

        </form>
    </div>
    </>
    
}
export default Register