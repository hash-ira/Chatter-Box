import React from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';



function HomePage() {
  const [signIn , setSignIn] = React.useState(true);
  

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
