import { useEffect, useState } from "react"
import {authService} from '../../services/authService'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Login(){
    const initialValues = {email: '', password: ''}
    const [userData, setUserData] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [authError, setAuthError] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        async function authenticate(){
            if(isSubmit && Object.keys(formErrors).length === 0){
                try{
                    const response = await authService.loginUser(userData)
                    const {token} = response                    
                    localStorage.setItem('accessToken', token)
                    navigate('/profile')
                }
                catch(err){
                    if(err.response && err.response.status === 401){
                        setAuthError('Неправильний email чи пароль!')
                    }
                    else{
                        setAuthError('Виникла помилка при авторизації')
                    }
                    setIsSubmit(false)
                }
            }
        }
        authenticate()
    }, [isSubmit, formErrors])

    function handleChange(event){
        const {name, value} = event.target
        setUserData({...userData, [name]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        const errors = validate(userData)
        setAuthError('')
        setFormErrors(errors)
        setIsSubmit(true)
    }

    function validate(values) {
        const errors = {};
        const { email, password } = values;
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!email) {
            errors.email = 'Введіть email!';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Некоректний формат email!';
        }
    
        if (!password) {
            errors.password = 'Введіть пароль!';
        } else if (password.length < 6) {
            errors.password = 'Пароль має бути не менше 6 символів!';
        }
    
        return errors;
    }
    

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center bg-white py-8 px-10 rounded-lg my-2">
                    <p className="text-center mb-5 text-2xl font-bold">Login</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-md" htmlFor="email">Введіть email:</label>
                                <input className="input" type="email" value={userData.email} id="email" name="email"
                                        onChange={handleChange} placeholder="Ваша електронна пошта"
                                />
                                {formErrors.email && <div className="text-red-500">{formErrors.email}</div>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-md" htmlFor="password">Введіть пароль:</label>
                                <input className="input" type="password" value={userData.password} id="password" name="password"
                                        onChange={handleChange} placeholder="Ваш пароль"
                                />
                                {formErrors.password && <div className="text-red-500">{formErrors.password}</div>}
                            </div>
                            {authError && <div className="text-red-500">{authError}</div>}
                            <button type="submit" className="btn mb-5 mt-4 bg-purple-600 hover:bg-purple-700 transition duration-300 border-purple-800">Підтвердити</button>
                    </form>
                    <div className="flex flex-col items-center text-gray-500">
                            Не маєте аккаунту?
                            <Link to='/register' className="text-purple-600 font-medium">Зареєструватись</Link>
                    </div>
                </div>
        </div>
    )
}