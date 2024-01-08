import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading] = useState(false)
  const emailInputref = useRef()
  const passwordInputref = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler =async (event) =>{
    setIsLoading(true)
    event.preventDefault()
    const enteredEmail = emailInputref.current.value;
    const enteredPassword = passwordInputref.current.value;

    if(isLogin){

    }else{
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPpCS5fLqAZ2TYWYHrfIIg4fNr7WQDS-Y',{
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(res.ok){

      }else{
        const data = await res.json()
        alert(data.error.message)
        console.log(data)
      }
      setIsLoading(false)
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputref}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputref}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button type='submit'>{isLogin ? 'Login': 'Create Account'}</button>}
          {isLoading && <p style={{color:'white'}}>{isLogin?'Logging In...':'Creating User'}</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
