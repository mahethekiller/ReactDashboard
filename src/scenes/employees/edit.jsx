import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const EditEmployee = () => {
  const { user_id } = useParams(); // employee id

  const [emp, setEmployee] = useState({});
  const [Companies, setCompanies] = useState([]);
  const [Departments, setDepartments] = useState([]);
  const [Designations, setDesignations] = useState([]);
  const [CompanyId, setCompanyId] = useState(null);
  const [DepartmentId, setDepartmentId] = useState(null);
  const [DesignationId, setDesignationId] = useState(null);

  const { auth } = useAuth();

  //   get companies
  const GetCommonData = () => {
    axios.get(`${process.env.REACT_APP_MAIN_API_URL}/common/get_comp_dep_desig/`).then(function (res) {
      try {
        var result = res.data;
        console.log(result);
        setCompanies(result.companies);
        setDepartments(result.departments);
        setDesignations(result.designations);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    GetCommonData();
  }, []);

  useEffect(() => {
    try {
      const response = axios
        .get(`${process.env.REACT_APP_MAIN_API_URL}/employees/` + user_id, {
          headers: {
            "Content-Type": "application/json",
            //   Authorization: "Bearer " + auth.accessToken
          },
          // withCredentials: true,
        })
        .then((response) => {
          setEmployee(response.data[0]);
          setCompanyId(response.data[0].company_id);
          setDepartmentId(response.data[0].department_id);
          setDesignationId(response.data[0].designation_id);
          //   console.log(response.data[0].department_id);
        });
    } catch (err) {
      console.log(err);

      if (!err?.response) {
        console.log("No server Response");
      } else if (!err?.response?.status === 400) {
        console.log("Missing username or password");
      } else if (!err?.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
  }, []);

  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const userSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    contact_no: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
    // address1: yup.string().required("required"),
    // address2: yup.string().required("required"),
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log("VALUES");
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="Editing" subtitle={`${emp.first_name} ${emp.last_name} ( ${emp.employee_id} )`}></Header>

      <Formik enableReinitialize={true} onSubmit={handleFormSubmit} initialValues={emp} validationSchema={userSchema}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                "& >div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="First Name"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                sx={{ gridColumn: "span 1" }}
                size="small"
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Last Name"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                sx={{ gridColumn: "span 1" }}
                size="small"
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Email"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 1" }}
                size="small"
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Phone"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact_no}
                name="contact_no"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1" }}
                size="small"
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Username"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                readOnly
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1" }}
                size="small"
              />

              <FormControl fullWidth>
                <InputLabel id="company_id_lbl">Company</InputLabel>
                <Select
                  labelId="company_id_lbl"
                  name="company_id"
                  fullWidth
                  id="demo-simple-select"
                  value={CompanyId || ""}
                  label="Company"
                  onChange={(e) => {
                    setCompanyId(e.target.value);

                    axios.get(`${process.env.REACT_APP_MAIN_API_URL}/common/departments_by_company_id/${e.target.value}`).then(function (res) {
                      try {
                        var result = res.data;
                        // console.log(result);
                        // setCompanies(result.companies);
                        setDepartments(result);
                        // setDesignations(result.designations);
                      } catch (error) {
                        console.log(error);
                      }
                    });
                  }}
                  size="small"
                >
                  {Companies.map((company) => (
                    <MenuItem key={company.company_id} value={company.company_id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="department_id_lbl">Department</InputLabel>
                <Select
                  labelId="department_id_lbl"
                  name="department_id"
                  fullWidth
                  id="demo-simple-select"
                  value={DepartmentId || ""}
                  label="Department"
                  onChange={(e) => {
                    setDepartmentId(e.target.value);
                    axios.get(`${process.env.REACT_APP_MAIN_API_URL}/common/designations_by_department_id/${e.target.value}`).then(function (res) {
                      try {
                        var result = res.data;
                        // console.log(result);
                        // setCompanies(result.companies);
                        setDesignations(result);
                        // setDesignations(result.designations);
                      } catch (error) {
                        console.log(error);
                      }
                    });
                  }}
                  size="small"
                >
                  {Departments.map((department) => (
                    <MenuItem key={department.department_id} value={department.department_id}>
                      {department.department_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="designation_id_lbl">Designation</InputLabel>
                <Select
                  labelId="designation_id_lbl"
                  name="designation_id"
                  fullWidth
                  id="demo-simple-select"
                  value={DesignationId || ""}
                  label="Designation"
                  onChange={(e) => {
                    setDesignationId(e.target.value);
                  }}
                  size="small"
                >
                  {Designations.map((designation) => (
                    <MenuItem key={designation.designation_id} value={designation.designation_id}>
                      {designation.designation_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Address 1"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Address 2"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditEmployee;
