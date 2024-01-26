import React from 'react'
import { Grid, Paper, Typography, TextField, Button, Avatar , Link } from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp({toggleSignIn}) {

  const [userName , setUserName] = React.useState("");
  const [email , setEmail] = React.useState("");
  const [password , setPassword] = React.useState("");
  const [confirmPassword , setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3000/user",
        {
          name : userName,
          profilePicture : "tempFile",
          email,
          password,
        },
        config
      );

      console.log(data);

      toast.success('Registration Successful!')
      // localStorage.setItem("userInfo", JSON.stringify(data));
      // setPicLoading(false);
      navigate('/chat');

    } catch (error) {
      toast('Error Occured. Its Not You, Its Us!', {
        icon: '🥹',
      });
      console.log(error)
    }
    return;
  }

  return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <div><Toaster/></div>
        <Paper elevation={4} className="w-full max-w-xs h-[70vh] p-4 w-72 m-5 rounder-lg">
          <Grid align="center" className="mb-4">
            <Avatar style = {{backgroundColor : '#3F51B5' , marginBottom: "10px"}} alignItems="center">
              <LockTwoToneIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
          </Grid>
          <form>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField label="Username" variant="outlined" fullWidth required  
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField type='email' label="Email" variant="outlined" fullWidth required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField type="password" label="Password" variant="outlined" fullWidth required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField type="password" label="Confirm Password" variant="outlined" fullWidth required 
                  value = {confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}/>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                    Already have an account? 
                  <Link onClick={toggleSignIn} >
                    Log In
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
  )
}

export default SignUp;
