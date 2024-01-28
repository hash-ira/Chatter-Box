import React, { useEffect} from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';



function HomePage() {
  const [signIn , setSignIn] = React.useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(userInfo){
          navigate('/chat');
        }
  } , [navigate]);
  

  const toggleSignIn = () => {
    setSignIn((prevSignIn) => !prevSignIn);
  };

  return (
    <div className="h-[100vh] flex">
      { signIn ? <SignUp toggleSignIn = {toggleSignIn} /> : <Login toggleSignIn = {toggleSignIn}/> }
    </div>
  );
}

export default HomePage;
