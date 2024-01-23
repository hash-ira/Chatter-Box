import React from 'react'
import { Grid, Paper, Typography, TextField, Button, Avatar , Link } from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';

function SignUp({toggleSignIn}) {
  return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Paper elevation={4} className="h-[60vh] p-4 w-72 m-5 rounder-lg">
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
                <TextField label="Username" variant="outlined" fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField type='email' label="Email" variant="outlined" fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField type="password" label="Password" variant="outlined" fullWidth required />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField type="password" label="Confirm Password" variant="outlined" fullWidth required />
              </Grid> */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
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
