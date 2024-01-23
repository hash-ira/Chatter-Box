import React from 'react';
import { Grid, Paper, Typography, TextField, Button, Avatar, Link } from '@mui/material';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

function Login({toggleSignIn}) {
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
                <TextField label="Email" type="email" variant="outlined" fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Password" type="password" variant="outlined" fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
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
