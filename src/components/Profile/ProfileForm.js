import React, {useContext,useRef} from 'react';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../../store/AuthContext';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory()
 const authctx = useContext(AuthContext)
 const passwordref = useRef()
  const submithandler = async (event)=>{
    event.preventDefault()
    const newenteredpassword = passwordref.current.value;
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_AUTHKEY}`,{
      method:'POST',
      body:JSON.stringify({
        idToken:authctx.token,
        password:newenteredpassword,
        returnSecureToken:false
      }),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = res.json()
    history.replace('/')
    console.log(data)
  }
  return (
    <form className={classes.form} onSubmit={submithandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
