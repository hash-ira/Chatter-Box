import React from 'react';
import { Grid, Paper, Typography, TextField, Button, Avatar, Link } from '@mui/material';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function Login({toggleSignIn}) {
  const [email , setEmail] = React.useState("");
  const [password , setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password) {
      toast.error("Please enter a password.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast.success("Login Successful");
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chat");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error('An error occurred. Please try again later.');
        console.log(error);
      }
    }
  };

  const handleGuestUser1 = (e) =>{
    e.preventDefault();
    setEmail("guest@chatter.com");
    setPassword("guest123");
  }

  const handleGuestUser2 = (e) =>{
    e.preventDefault();
    setEmail("guest2@chatter.com");
    setPassword("qwerty");
  }

  return (
    <>
      <div><Toaster/></div>
    <Grid container direction="row" justifyContent="center" alignItems="center">
        <Paper elevation={4} className="pb-10 p-4 m-5 rounder-lg w-80">
          <Grid align="center" className="mb-4">
            <Avatar style={{ backgroundColor: '#3F51B5', marginBottom: '10px' }}>
              <LockOpenTwoToneIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Log In
            </Typography>
          </Grid>
          <form>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField label="Email" type="email" variant="outlined" fullWidth required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Password" type="password" variant="outlined" fullWidth required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                  Log In
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="error" fullWidth onClick={handleGuestUser1}>
                  Get 1st Guest User Credentials
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="error" fullWidth onClick={handleGuestUser2}>
                  Get 2nd Guest User Credentials
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  Don't have an account?{' '}
                  <Link component="button" onClick={toggleSignIn}>
                    Sign Up
                  </Link>
                </Typography>
              </Grid>

            </Grid>
          </form>
        </Paper>
    </Grid>
    </>
  );
}

export default Login;
