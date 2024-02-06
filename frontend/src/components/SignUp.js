import React, { useEffect } from 'react'
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
  const [profilePicture , setProfilePicture] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hasShownToast = sessionStorage.getItem("hasShownToast");
    if (!hasShownToast) {
      toast(
        "Headout to login page to get guest user credentials",
        {
          duration: 5000,
          icon: '💡',
        }
      );
      sessionStorage.setItem("hasShownToast", "true");
    }
  }, []);
  
  

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
        "/api/user",
        {
          name : userName,
          email,
          password,
          profilePicture,
        },
        config
      );

      toast.success('Registration Successful!');

      sessionStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/chat');

    } catch (error) {
      toast('Error Occured. Its Not You, Its Us!', {
        icon: '🥹',
      });
      console.log(error)
    }
    return;
  }

  const postProfilePicture = (pic) => {
    if (pic === undefined) {
      toast.error("Please Select an Image!")
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "ChatterBox");
      data.append("cloud_name", "kingsman2702");
      axios.post("https://api.cloudinary.com/v1_1/kingsman2702/image/upload", data)
        .then((response) => {
          setProfilePicture(response.data.url.toString());
        })
        .catch((error) => {
          console.log("Cloudinary error:", error);
        });
    }
  }

  return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <div><Toaster/></div>
        <Paper elevation={4} className="w-full max-w-xs h-[75vh] p-4 w-72 m-5 rounder-lg pb-9">
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => postProfilePicture(e.target.files[0])}
                  />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                    Already have an account?{' '}
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
