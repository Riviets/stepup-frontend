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
          const {token} = response.data
          localStorage.setItem('accessToken', token)
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Введіть ім'я користувача:</label>
          <input
            type="text"
            value={userData.username}
            id="username"
            name="username"
            onChange={handleChange}
            placeholder="Ваше ім'я"
          />
          {formErrors.username && <div>{formErrors.username}</div>}
        </div>
        <div>
          <label htmlFor="email">Введіть email:</label>
          <input
            type="email"
            value={userData.email}
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Ваша електронна пошта"
          />
          {formErrors.email && <div>{formErrors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Введіть пароль:</label>
          <input
            type="password"
            value={userData.password}
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Ваш пароль"
          />
          {formErrors.password && <div>{formErrors.password}</div>}
        </div>
        {authError && <div style={{ color: 'red' }}>{authError}</div>}
        <button type="submit">Зареєструватися</button>
      </form>
      <div>
        Вже зареєстровані? <Link to="/login">Увійти</Link>
      </div>
    </div>
  );
}