import { Box, Tooltip, Typography, useTheme, Grid, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { mockDataTeam } from "../../data/mockData";
import { Link } from "react-router-dom";

const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [emps, setEmployees] = useState([]);

  const { auth } = useAuth();

  useEffect(() => {
    try {
      const response = axios
        .get(`${process.env.REACT_APP_MAIN_API_URL}/employees`, {
          headers: {
            "Content-Type": "application/json",
            //   Authorization: "Bearer " + auth.accessToken
          },
          // withCredentials: true,
        })
        .then((response) => {
          setEmployees(response.data);
          //   console.log(response.data);
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
  const columns = [
    {
      field: "user_id",
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Link to={`/employees/edit/${params.value}`} state={{ user_id: params.value }}>
            <IconButton size="small" color="warning" variant="outlined">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        );
      },
    },
    { field: "employee_id", headerName: "ID" },

    {
      field: "profile_picture",
      headerName: "Image",

      renderCell: (params) => <img width="50px;" height="50px;" src={`https://i2u2.i2k2.in/uploads/profile/${params.value}`} />, // renderCell will render the component
    },
    {
      field: "emp_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
    },

    {
      field: "name",
      headerName: "Company",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
    },

    {
      field: "manager",
      headerName: "Manager",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "contact_no",
      headerName: "Phone No",
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
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
      field: "role_name",
      headerName: "Role",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "designation_name",
      headerName: "Designation",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "blood_group",
      headerName: "Blood Gp",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { is_active } }) => {
        return (
          <>
            {/* <Box width="60%" m="0 auto" p="5" display="flex" justifyContent="center" backgroundColor={is_active == 1 ? colors.greenAccent[600] : colors.greenAccent[700]} borderRadius="4px"> */}
            {is_active == 0 && <HourglassBottomIcon />}
            {is_active == 1 && <CheckCircleIcon />}
            {/* </Box> */}
          </>
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={emps} getRowId={(row) => row.user_id} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Employees;
