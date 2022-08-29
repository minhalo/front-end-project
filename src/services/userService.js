import axios from "../axios"

const handleLogin = (email,password) =>
{
    return axios.post('http://localhost:8081/api/login', {email,password}, {
        headers: {
          'Authorization': `Bearer 123123` 
        }})
}

const handleRegister = (email, password,cpassword) =>
{
    return axios.post('http://localhost:8081/api/register', {email, password, cpassword})
}


export {handleLogin,handleRegister}
