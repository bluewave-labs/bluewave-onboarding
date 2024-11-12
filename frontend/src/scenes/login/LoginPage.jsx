import React, { useState } from "react";
import styles from "./Login.module.css";
import CustomTextField from "../../components/TextFieldComponents/CustomTextField/CustomTextField";
import CircularProgress from "@mui/material/CircularProgress";
import { login } from "../../services/loginServices";
import CustomLink from "../../components/CustomLink/CustomLink";
import { handleAuthSuccess } from "../../utils/loginHelper";
import { useAuth } from "../../services/authProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .trim(),
  password: Yup.string().required("Password is required").trim(),
});

function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const { loginAuth } = useAuth();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnMount: false,
    onSubmit: async (values, { setSubmitting }) => {
      setServerErrors([]);
      try {
        const response = await login(values);
        handleAuthSuccess(response, loginAuth, navigate);
      } catch (error) {
        if (error.response?.data?.errors) {
          setServerErrors(error.response.data.errors);
        } else if (error.response?.data?.error) {
          setServerErrors([error.response.data.error]);
        } else {
          setServerErrors([
            "An error occurred. Please check your network connection and try again.",
          ]);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const isFormEmpty = !formik.values.email && !formik.values.password;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
        Object.keys(formik.values).forEach((key) => {
          formik.setFieldTouched(key, true, false);
        });
      }}
      className={styles["login-container"]}
    >
      <Logo />
      <h2>Log in to your account</h2>
      <div className={styles["form-group"]}>
        <CustomTextField
          id="email"
          placeholder="Enter email"
          labelText="Email:"
          textFieldMargin="none"
          TextFieldWidth="full"
          required={true}
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>
      <div className={styles["form-group"]}>
        <CustomTextField
          id="password"
          placeholder="Enter password"
          labelText="Password:"
          textFieldMargin="none"
          TextFieldWidth="full"
          type="password"
          required={true}
          value={formik.values.password}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched("email", true, false);
            formik.setFieldTouched("password", true, false);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {serverErrors.length > 0 && (
          <div className={styles["error-message"]}>
            {serverErrors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
      </div>
      <div className={styles["form-group"]}>
        <div className={styles["form-group-2"]}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember for 30 days
          </label>
          <CustomLink text="Forgot Password" url="/forgot-password" />
        </div>
      </div>
      <button
        className={styles["sign-in-button"]}
        type="submit"
        disabled={isFormEmpty || formik.isSubmitting}
      >
        {formik.isSubmitting ? (
          <CircularProgress size={12} color="inherit" />
        ) : (
          "Sign In"
        )}
      </button>
      <div className={styles["sign-up-link"]}>
        Don't have an account? <CustomLink text="Sign up" url="/signup" />
      </div>
    </form>
  );
}

export default LoginPage;
