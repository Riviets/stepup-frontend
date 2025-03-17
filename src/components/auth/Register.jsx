import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function Register() {
  const initialValues = { username: '', email: '', password: '' };
  const [userData, setUserData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function registerUser() {
      if (isSubmit && Object.keys(formErrors).length === 0) {
        try {
          const response = await authService.registerUser(userData);
          const { token } = response.data;
          localStorage.setItem('accessToken', token);
          navigate('/profile');
        } catch (err) {
          console.error("Помилка:", err.message);
          setAuthError(err.message);
          setIsSubmit(false);
        }
      }
    }
    registerUser();
  }, [isSubmit, formErrors, userData, navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(userData);
    setAuthError('');
    setFormErrors(errors);
    setIsSubmit(true);
  }

  function validate(values) {
    const errors = {};
    const { username, email, password } = values;

    if (!username) {
      errors.username = "Введіть ім'я користувача!";
    } else if (username.length < 3) {
      errors.username = "Ім'я має містити мінімум 3 символи!";
    }

    if (!email) {
      errors.email = "Введіть email!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Некоректний email!";
    }

    if (!password) {
      errors.password = "Введіть пароль!";
    } else if (password.length < 6) {
      errors.password = "Пароль має містити мінімум 6 символів!";
    }

    return errors;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-white py-8 px-10 rounded-lg shadow-lg my-2">
        <p className="text-center mb-5 text-2xl font-bold">Register</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-72">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-md" htmlFor="username">Введіть ім'я користувача:</label>
            <input className="input" type="text" value={userData.username} id="username" name="username" onChange={handleChange} placeholder="Ваше ім'я" />
            {formErrors.username && <div className="text-red-500">{formErrors.username}</div>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-md" htmlFor="email">Введіть email:</label>
            <input className="input" type="email" value={userData.email} id="email" name="email" onChange={handleChange} placeholder="Ваша електронна пошта" />
            {formErrors.email && <div className="text-red-500">{formErrors.email}</div>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-md" htmlFor="password">Введіть пароль:</label>
            <input className="input" type="password" value={userData.password} id="password" name="password" onChange={handleChange} placeholder="Ваш пароль" />
            {formErrors.password && <div className="text-red-500">{formErrors.password}</div>}
          </div>
          {authError && <div className="text-red-500">{authError}</div>}
          <button type="submit" className="btn mb-5 mt-4 bg-purple-600 hover:bg-purple-700 transition duration-300 border-purple-800">Зареєструватися</button>
        </form>
        <div className="flex flex-col items-center text-gray-500">
          Вже зареєстровані?
          <Link to="/login" className="text-purple-600 font-medium">Увійти</Link>
        </div>
      </div>
    </div>
  );
}
