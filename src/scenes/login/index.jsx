import { Box, Button, ButtonBaseActions, Container, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

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

  const { setauth } = useContext(AuthContext);

  const errRef = useRef();

  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFormSubmit = async (values) => {
    console.log(values.userId);

    try {
      const response = await axios.post(
        "/login/",
        JSON.stringify({
          username: values.userId,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box m="20px">
      <Container component="main" maxWidth="xs">
        <Header title="Login" subtitle="Enter Your Credentials" />

        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                sx={{
                  "& >div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
