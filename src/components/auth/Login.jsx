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
                    const {token} = response?.data                    
                    localStorage.setItem('accessToken', token)
                    navigate('/profile')
                }
                catch(err){
                    if(err.response && err.response.status === 401){
                        setAuthError('Неправильний email чи пароль!')
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
        <div>
           <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Введіть email:</label>
                    <input type="email" value={userData.email} id="email" name="email"
                            onChange={handleChange} placeholder="Ваша електронна пошта"
                    />
                    {formErrors.email && <div>{formErrors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password">Введіть пароль:</label>
                    <input type="password" value={userData.password} id="password" name="password"
                            onChange={handleChange} placeholder="Ваш пароль"
                    />
                    {formErrors.password && <div>{formErrors.password}</div>}
                </div>
                {authError && <div>{authError}</div>}
                <button type="submit">Підтвердити</button>
           </form>
           <div>
                Не маєте аккаунту?
                <Link to='/register'>Зареєструватись</Link>
           </div>
        </div>
    )
}