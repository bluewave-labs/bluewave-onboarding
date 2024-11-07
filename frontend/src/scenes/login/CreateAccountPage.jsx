import React, { useState } from "react";
import styles from "./Login.module.css";
import CustomTextField from "../../components/TextFieldComponents/CustomTextField/CustomTextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { signUp } from "../../services/loginServices";
import CustomLink from "../../components/CustomLink/CustomLink";
import { handleAuthSuccess } from "../../utils/loginHelper";
import { useAuth } from "../../services/authProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z'-]+$/, "Name can only contain letters, hyphens and apostrophes")
    .trim(),
  surname: Yup.string()
    .required("Surname is required")
    .matches(/^[A-Za-z'-]+$/, "Surname can only contain letters, hyphens and apostrophes")
    .trim(),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
    )
    .required("Email is required")
    .trim(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>=\-_]/, "Password must contain at least one special character"),
});

function CreateAccountPage() {
  const { loginAuth } = useAuth();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema,
    validateOnMount: false,
    onSubmit: async (values, { setSubmitting }) => {
      setServerErrors([]);
      try {
        const response = await signUp(values);
        handleAuthSuccess(response, loginAuth, navigate);
      } catch (error) {
        if (error.response?.data?.errors) {
          setServerErrors(error.response.data.errors);
        } else if (error.response?.data?.error) {
          setServerErrors([error.response.data.error]);
        } else {
          setServerErrors(["An error occurred. Please check your network connection and try again."]);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const isFormEmpty =
    !formik.values.name &&
    !formik.values.surname &&
    !formik.values.email &&
    !formik.values.password;

  const hasMinLength = formik.values.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>=\-_]/.test(formik.values.password);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
        Object.keys(formik.values).forEach(key => {
          formik.setFieldTouched(key, true, false);
        });
      }}
      className={styles["login-container"]}
    >
      <Logo />
      <h2>Create an account</h2>

      <div className={styles["form-group"]}>
        <CustomTextField
          id="name"
          name="name"
          type="text"
          labelText="Name*:"
          checkCircleIconVisible={true}
          displayCheckCircleIcon={formik.touched.name && !formik.errors.name}
          placeholder="Enter your name"
          textFieldMargin="none"
          TextFieldWidth="full"
          required={true}
          value={formik.values.name}
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </div>

      <div className={styles["form-group"]}>
        <CustomTextField
          id="surname"
          name="surname"
          type="text"
          labelText="Surname*:"
          checkCircleIconVisible={true}
          displayCheckCircleIcon={formik.touched.surname && !formik.errors.surname}
          placeholder="Enter your surname"
          textFieldMargin="none"
          TextFieldWidth="full"
          required={true}
          value={formik.values.surname}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched('name', true, false);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.surname && formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />
      </div>

      <div className={styles["form-group"]}>
        <CustomTextField
          id="email"
          type="email"
          name="email"
          labelText="Email*:"
          checkCircleIconVisible={true}
          displayCheckCircleIcon={formik.touched.email && !formik.errors.email}
          placeholder="Enter your email"
          textFieldMargin="none"
          TextFieldWidth="full"
          required={true}
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched('surname', true, false);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>

      <div className={styles["form-group"]}>
        <CustomTextField
          id="password"
          type="password"
          name="password"
          labelText="Password*:"
          checkCircleIconVisible={true}
          displayCheckCircleIcon={formik.touched.password && !formik.errors.password}
          placeholder="Create your password"
          textFieldMargin="none"
          TextFieldWidth="full"
          required={true}
          value={formik.values.password}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched('email', true, false)
            formik.setFieldTouched('password', true, false);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>

      <div className={styles["password-constraints"]}>
        <CheckCircleIcon
          style={{
            color: hasMinLength ? "green" : "#D0D5DD",
            fontSize: "20px",
            marginRight: "5px",
          }}
        />
        Must be at least 8 characters
      </div>
      <div className={styles["password-constraints"]}>
        <CheckCircleIcon
          style={{
            color: hasSpecialChar ? "green" : "#D0D5DD",
            fontSize: "20px",
            marginRight: "5px",
          }}
        />
        Must contain one special character
      </div>

      {serverErrors.length > 0 && (
        <div className={styles["error-message"]}>
          {serverErrors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      <button
        className={styles["create-account-button"]}
        type="submit"
        disabled={isFormEmpty || formik.isSubmitting}
      >
        {formik.isSubmitting ? (
          <CircularProgress size={12} color="inherit" />
        ) : (
          "Get started"
        )}
      </button>
      <div className={styles["sign-up-link"]}>
        Already have an account? <CustomLink text="Log in" url="/" />
      </div>
    </form>
  );
}

export default CreateAccountPage;