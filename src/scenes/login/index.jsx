import {
  Alert,
  Box,
  Button,
  ButtonBaseActions,
  Container,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const initialValues = {
  userId: "",
  password: "",
};

const userSchema = yup.object().shape({
  userId: yup.string().required("required"),
  password: yup.string().required("required"),
  //   email: yup.string().email("Invalid email").required("required"),
  //   contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  //   address1: yup.string().required("required"),
  //   address2: yup.string().required("required"),
});

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (values) => {
    const password = values.password;
    const userId = values.userId;

    try {
      const response = await axios.post(
        "/login/",
        JSON.stringify({
          username: userId,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;

      console.log(user);

      setAuth({ user, password, accessToken });
      setUser("");
      navigate(from, { replace: true });
      // setSuccess(true);

      // console.log(JSON.stringify(response?.data));
    } catch (err) {
      console.log(err);

      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (!err?.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (!err?.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Box m="20px">
      <Container component="main" maxWidth="xs">
        <Header title="Login" subtitle="Enter Your Credentials" />

        {errMsg ? (
          <Alert ref={errRef} severity="error">
            {errMsg}
          </Alert>
        ) : (
          ""
        )}

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                sx={{
                  "& >div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="User Id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userId}
                  name="userId"
                  error={!!touched.userId && !!errors.userId}
                  helperText={touched.userId && errors.userId}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Login;
