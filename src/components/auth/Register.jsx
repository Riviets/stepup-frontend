import { useEffect, useState, useRef } from "react";
import { authService } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../profile/LanguageSwitcher";
import { eyeClosedIcon, eyeOpenedIcon } from "../../constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [authError, setAuthError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const usernameRef = useRef(null);

  const schema = z.object({
    username: z
      .string()
      .nonempty(t("register.errors.usernameRequired"))
      .min(3, t("register.errors.usernameTooShort"))
      .max(16, t("register.errors.usernameTooLong")),
    email: z.string().email(t("register.errors.invalidEmail")),
    password: z.string().min(6, t("register.errors.passwordTooShort")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    clearErrors,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: "", email: "", password: "" },
    mode: "onChange",
  });

  // Watch the username value to clear errors when it changes
  const username = watch("username");

  useEffect(() => {
    // Focus on username field when component mounts
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  // Clear username error when user types
  useEffect(() => {
    if (username && errors.username) {
      clearErrors("username");
    }
  }, [username, errors.username, clearErrors]);

  const onSubmit = async (data) => {
    try {
      const response = await authService.registerUser(data);
      const { token } = response.data;
      localStorage.setItem("accessToken", token);
      navigate("/profile");
    } catch (err) {
      setAuthError(t("register.errors.authError"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-white pb-8 pt-15 px-15 rounded-lg my-2 relative">
        <p className="text-center mb-10 text-3xl font-bold">
          {t("register.title")}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="username">
              {t("register.usernameLabel")}
            </label>
            <input
              {...register("username")}
              className="input"
              type="text"
              id="username"
              placeholder={t("register.usernamePlaceholder")}
              ref={(e) => {
                register("username").ref(e);
                usernameRef.current = e;
              }}
            />
            <div className="text-red-500 min-h-[1.5rem] max-w-[250px]">
              {touchedFields.username && errors.username?.message}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="email">
              {t("register.emailLabel")}
            </label>
            <input
              {...register("email")}
              className="input"
              type="email"
              id="email"
              placeholder={t("register.emailPlaceholder")}
            />
            <div className="text-red-500 min-h-[1.5rem] max-w-[250px]">
              {errors.email?.message}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="password">
              {t("register.passwordLabel")}
            </label>
            <div className="relative">
              <input
                {...register("password")}
                className="input"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
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
              {errors.password?.message}
            </div>
          </div>
          {authError && <div className="text-red-500">{authError}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
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
