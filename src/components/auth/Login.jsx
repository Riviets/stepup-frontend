import { useEffect, useState, useMemo } from "react";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { eyeClosedIcon, eyeOpenedIcon } from "../../constants";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../profile/LanguageSwitcher";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../buttons/Button";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [authError, setAuthError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const schema = z.object({
    email: z.string().email(t("login.errors.invalidEmail")),
    password: z.string().min(8, t("login.errors.passwordTooShort")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = async (data) => {
    try {
      const response = await authService.loginUser(data);
      const { token } = response;
      localStorage.setItem("accessToken", token);
      navigate("/profile");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAuthError(t("login.errors.invalidCredentials"));
      } else {
        setAuthError(t("login.errors.authError"));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center bg-white pb-8 pt-15 px-15 rounded-lg my-2 relative">
        <div className="absolute top-3 right-3">
          <LanguageSwitcher />
        </div>
        <p className="text-center mb-10 text-3xl font-bold">
          {t("login.title")}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="email">
              {t("login.emailLabel")}
            </label>
            <input
              {...register("email")}
              className="input"
              type="text"
              id="email"
              placeholder={t("login.emailPlaceholder")}
            />
            <div className="text-red-500 min-h-[1.5rem] max-w-[250px]">
              {errors.email?.message}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-md" htmlFor="password">
              {t("login.passwordLabel")}
            </label>
            <div className="relative">
              <input
                {...register("password")}
                className="input"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
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
              {errors.password?.message}
            </div>
          </div>
          {authError && <div className="text-red-500">{authError}</div>}

          <Button
            type="submit"
            className={`${
              isSubmitting
                ? "bg-gray-400 hover:bg-gray-500"
                : "bg-purple-600 hover:bg-purple-700"
            } btn mb-5 mt-4  transition duration-300 border-purple-800`}
            isSubmitting={isSubmitting}
          >
            {t("login.submit")}
          </Button>
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
