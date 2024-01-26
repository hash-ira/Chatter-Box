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

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/login",
        { email, password },
        config
      );

      toast.success("Login Successful")
      navigate("/chat");
    } catch (error) {
      toast('Error Occured. Its Not You, Its Us!', {
        icon: '🥹',
      });
      console.log(error)
    }
  };

  return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Paper elevation={4} className="pb-10 p-4 w-72 m-5 rounder-lg">
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
                <Typography>
                  Don't have an account? 
                  <Link onClick={toggleSignIn}>
                    Sign Up
                  </Link>
                </Typography>
              </Grid>

            </Grid>
          </form>
        </Paper>
      </Grid>
  );
}

export default Login;
