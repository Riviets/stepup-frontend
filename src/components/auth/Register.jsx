import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { authService } from "../../services/authService";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../profile/LanguageSwitcher";
import { eyeClosedIcon, eyeOpenedIcon } from "../../constants";

export default function Register() {
  const initialValues = { username: "", email: "", password: "" };
  const [userData, setUserData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    async function registerUser() {
      if (isSubmit && Object.keys(formErrors).length === 0) {
        try {
          const response = await authService.registerUser(userData);
          const { token } = response.data;
          localStorage.setItem("accessToken", token);
          navigate("/profile");
        } catch (err) {
          setAuthError(t("register.errors.authError"));
          setIsSubmit(false);
        }
      }
    }
    registerUser();
  }, [isSubmit, formErrors, t]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(userData);
    setAuthError("");
    setFormErrors(errors);
    setIsSubmit(true);
  }

  function validate(values) {
    const errors = {};
    const { username, email, password } = values;

    if (!username) {
      errors.username = t("register.errors.usernameRequired");
    } else if (username.length < 3) {
      errors.username = t("register.errors.usernameTooShort");
    } else if (username.length > 16) {
      errors.username = t("register.errors.usernameTooLong");
    }

    if (!email) {
      errors.email = t("register.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t("register.errors.emailInvalid");
    }

    if (!password) {
      errors.password = t("register.errors.passwordRequired");
    } else if (password.length < 6) {
      errors.password = t("register.errors.passwordTooShort");
    }

    return errors;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-white pb-8 pt-15 px-15 rounded-lg my-2 relative">
        <p className="text-center mb-10 text-3xl font-bold">
          {t("register.title")}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="username">
              {t("register.usernameLabel")}
            </label>
            <input
              className="input"
              type="text"
              value={userData.username}
              id="username"
              name="username"
              onChange={handleChange}
              placeholder={t("register.usernamePlaceholder")}
            />
            <div className="text-red-500 min-h-[1.5rem] max-w-[250px]">
              {formErrors.username}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="email">
              {t("register.emailLabel")}
            </label>
            <input
              className="input"
              type="email"
              value={userData.email}
              id="email"
              name="email"
              onChange={handleChange}
              placeholder={t("register.emailPlaceholder")}
              ref={emailRef}
            />
            <div className="text-red-500 min-h-[1.5rem] max-w-[250px]">
              {formErrors.email}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="password">
              {t("register.passwordLabel")}
            </label>
            <div className="relative">
              <input
                className="input"
                type={isPasswordVisible ? "text" : "password"}
                value={userData.password}
                id="password"
                name="password"
                onChange={handleChange}
                placeholder={t("register.passwordPlaceholder")}
              />
              <button
                type="button"
                className="absolute top-0 right-0 z-10 bg-purple-950 text-white h-full px-3 rounded-tr-md rounded-br-md cursor-pointer w-12"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? eyeOpenedIcon : eyeClosedIcon}
              </button>
            </div>
            <div className="text-red-500 min-h-[1.5rem] max-w-[250px]">
              {formErrors.password}
            </div>
          </div>
          {authError && <div className="text-red-500">{authError}</div>}
          <button
            type="submit"
            className="btn mb-5 mt-4 bg-purple-600 hover:bg-purple-700 transition duration-300 border-purple-800"
          >
            {t("register.submit")}
          </button>
        </form>
        <div className="flex gap-2 items-center text-gray-500">
          {t("register.alreadyRegistered")}
          <Link to="/login" className="text-purple-600 font-medium">
            {t("register.loginLink")}
          </Link>
        </div>
        <div className="absolute top-3 right-3">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
