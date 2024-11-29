import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import CustomTextField from "../../components/TextFieldComponents/CustomTextField/CustomTextField";
import CircularProgress from "@mui/material/CircularProgress";
import { login } from "../../services/loginServices";
import CustomLink from "../../components/CustomLink/CustomLink";
import { handleAuthSuccess } from "../../utils/loginHelper";
import { useAuth } from "../../services/authProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .trim(),
  password: Yup.string().required("Password is required").trim(),
  rememberMe: Yup.boolean()
});

function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={async (values, { setSubmitting }) => {
        setServerErrors([]);
        console.log(values)
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
      }}
    >
      {({
        isSubmitting,
        touched,
        errors,
        handleChange,
        handleBlur,
        values,
      }) => (
        <Form className={styles["login-container"]}>
          <Logo />
          <h2>Log in to your account</h2>

          <div className={styles["form-group"]}>
            <CustomTextField
              id="email"
              name="email"
              placeholder="Enter email"
              labelText="Email:"
              textFieldMargin="none"
              TextFieldWidth="full"
              required={true}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </div>

          <div className={styles["form-group"]}>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              labelText="Password:"
              textFieldMargin="none"
              TextFieldWidth="full"
              required={true}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
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
                <Field
                  type="checkbox"
                  name="rememberMe"
                />
                Remember for 30 days
              </label>
              <CustomLink text="Forgot Password" url="/forgot-password" />
            </div>
          </div>

          <button
            className={styles["sign-in-button"]}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={12} color="inherit" />
            ) : (
              "Sign In"
            )}
          </button>
          <div className={styles["sign-up-link"]}>
            Don't have an account? <CustomLink text="Sign up" url="/signup" />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginPage;
