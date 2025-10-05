import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Box, Typography, TextField, Button } from "@mui/material";
import API from "../api";
import {useDispatch} from 'react-redux';
import {authActions} from "../redux/store";
import toast from 'react-hot-toast';

const Login = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs,setInputs] =useState({
  
    email: '',
    password: ''
  })

  //handle input change
const handleChange = (e) => {
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};


//form handle
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post("/api/v1/user/login", {
     
      email: inputs.email,
      password: inputs.password,
    });
    if (data.success) {
      localStorage.setItem("userId",data?.user._id);
      dispatch(authActions.login());

      toast.success("User Login Successfully");
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
    <form onSubmit={handleSubmit}>

      <Box
        maxWidth={450}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
      >
        <Typography variant='h4' sx={{ textTransform: "uppercase" }} padding={3} textAlign='center'>Login</Typography>

        <TextField
          placeholder="email"
          value= {inputs.email}
          onChange={handleChange}
          name="email"
          margin="normal"
          type={"email"}
          required
        />

        <TextField
          placeholder="password"
          value= {inputs.password}
          onChange={handleChange}
          name="password"
          margin="normal"
          type={"password"}
          required
        />
        <Button
          type="submit"
          sx={{ borderRadius: 3, marginTop: 3 }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>

        <Button 
          onClick={() => navigate("/register")}
        sx={{ borderRadius: 3, marginTop: 3 }}>
          Not a user? Please Register
        </Button>
      </Box>
      </form>
    </>
  );
};

export default Login;