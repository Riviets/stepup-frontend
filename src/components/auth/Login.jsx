import { useEffect, useState, useRef } from "react";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { eyeClosedIcon, eyeOpenedIcon } from "../../constants";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../profile/LanguageSwitcher";

export default function Login() {
  const initialValues = { email: "", password: "" };
  const [userData, setUserData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [authError, setAuthError] = useState("");
  const emailRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    async function authenticate() {
      if (isSubmit && Object.keys(formErrors).length === 0) {
        try {
          const response = await authService.loginUser(userData);
          const { token } = response;
          localStorage.setItem("accessToken", token);
          navigate("/profile");
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setAuthError(t("login.errors.invalidCredentials"));
          } else {
            setAuthError(t("login.errors.authError"));
          }
          setIsSubmit(false);
        }
      }
    }
    authenticate();
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
    const { email, password } = values;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = t("login.errors.emailRequired");
    } else if (!emailRegex.test(email)) {
      errors.email = t("login.errors.emailInvalid");
    }

    if (!password) {
      errors.password = t("login.errors.passwordRequired");
    } else if (password.length < 6) {
      errors.password = t("login.errors.passwordTooShort");
    }

    return errors;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-white pb-8 pt-15 px-15 rounded-lg my-2 relative">
        <div className="absolute top-3 right-3">
          <LanguageSwitcher />
        </div>
        <p className="text-center mb-10 text-3xl font-bold">
          {t("login.title")}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="email">
              {t("login.emailLabel")}
            </label>
            <input
              className="input"
              type="email"
              value={userData.email}
              id="email"
              name="email"
              onChange={handleChange}
              placeholder={t("login.emailPlaceholder")}
              ref={emailRef}
            />
            <div className="text-red-500 min-h-[1.5rem] max-w-[250px]">
              {formErrors.email}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="password">
              {t("login.passwordLabel")}
            </label>
            <div className="relative">
              <input
                className="input"
                type={isPasswordVisible ? "text" : "password"}
                value={userData.password}
                id="password"
                name="password"
                onChange={handleChange}
                placeholder={t("login.passwordPlaceholder")}
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
            {t("login.submit")}
          </button>
        </form>
        <div className="flex flex-col items-center text-gray-500">
          {t("login.noAccount")}
          <Link to="/register" className="text-purple-600 font-medium">
            {t("login.registerLink")}
          </Link>
        </div>
      </div>
    </div>
  );
}
