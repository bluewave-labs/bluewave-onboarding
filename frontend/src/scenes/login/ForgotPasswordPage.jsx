import React, { useState } from "react";
import styles from "./Login.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { forgotPassword } from "../../services/loginServices"; // Make sure this function is properly implemented
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../components/TextFieldComponents/CustomTextField/CustomTextField";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "../../components/Logo/Logo";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Enter a valid email address"
  )
  .required("Email is required")
  .trim()
})

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setServerErrors([]);
      try {
        const response = await forgotPassword(values);
        navigate("/check-email", { state: { values } });
      } catch (error) {
        setServerErrors(error.response.data.error);
      } finally {
        setSubmitting(false);
      }
    },
  });
console.log('hekki')
console.log(formik.errors.email)
console.log('yeah')

  const isFormEmpty = !formik.values.email;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
        formik.setFieldTouched("email", true, false);
      }}
      className={styles["login-container"]}
    >
      <Logo />
      <h2 style={{ marginBottom: "0px" }}>Forgot password?</h2>
      <h3>No worries, we'll send you reset instructions.</h3>
      <div className={styles["form-group"]}>
        <CustomTextField
          id="email"
          name="email"
          type="email"
          labelText="Email"
          checkCircleIconVisible={true}
          displayCheckCircleIcon={formik.touched.email && !formik.errors.email}
          placeholder="Enter your email"
          textFieldMargin="none"
          TextFieldWidth="full"
          required={true}
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched('email', true, false)
          }}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {serverErrors.length > 0 && (
          <div className={styles["error-message"]}>{serverErrors}</div>
        )}
      </div>
      <button
        style={{ marginTop: "0px" }}
        className={styles["reset-password-button"]}
      >
        {formik.isSubmitting ? (
          <CircularProgress size={12} color="inherit" />
        ) : (
          "Reset password"
        )}
      </button>
      <button
        className={styles["back-to-login-button"]}
        type="submit"
        disabled={isFormEmpty || formik.isSubmitting}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon style={{ fontSize: "18px", marginRight: "5px" }} />
        Back to log in
      </button>
    </form>
  );
};

export default ForgotPasswordPage;
