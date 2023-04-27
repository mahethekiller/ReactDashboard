import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [emps, setEmployees] = useState([]);

  const { auth } = useAuth();

  useEffect(() => {
    try {
      const response = axios
        .get("/employees/getActiveEmployeesEMP", {
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + auth.accessToken },
          // withCredentials: true,
        })
        .then((response) => {
          setEmployees(response.data.employees);
          console.log(emps);
        });

      // const accessToken = response?.data?.accessToken;
      // const user = response?.data?.user;

      //   console.log(response.data.employees);

      // setSuccess(true);

      // console.log(JSON.stringify(response?.data));
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
      //   errRef.current.focus();
    }
  }, []);
  //   "user_id", "first_name", "last_name", "contact_no", "date_of_birth"
  const columns = [
    { field: "user_id", headerName: "ID" },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    //   flex: 1,
    // },

    {
      field: "contact_no",
      headerName: "Phone No",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "date_of_birth",
      headerName: "DOB",
      flex: 1,
      type: "date",
    },
    {
      field: "date_of_joining",
      headerName: "DOJ",
      flex: 1,
      type: "date",
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box width="60%" m="0 auto" p="5" display="flex" justifyContent="center" backgroundColor={access === "admin" ? colors.greenAccent[600] : colors.greenAccent[700]} borderRadius="4px">
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Employees" subtitle="Managing Employees"></Header>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderTop: "none",
          },
        }}
      >
        <DataGrid rows={emps} getRowId={(row) => row.user_id} columns={columns} />
      </Box>
    </Box>
  );
};

export default Employees;
