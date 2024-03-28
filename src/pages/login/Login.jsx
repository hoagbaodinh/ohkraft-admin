import { Form, useNavigate } from 'react-router-dom';
import './login.scss';
import axios from 'axios';
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      window.alert('You must enter all required fields');
      return;
    }
    const userData = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        userData
      );

      // Check user co phai la tu van vien hay admin hay khong
      if (res.data.userDetails.isAdmin || res.data.userDetails.isConsultant) {
        window.alert('Login successfully');
        // luu thong tin user vao localStorage
        localStorage.setItem(
          'currentUser',
          JSON.stringify(res.data.userDetails)
        );
        return navigate('/');
      } else {
        window.alert("You don't have permission!");
        return;
      }
    } catch (error) {
      if (error.response) {
        window.alert('Something went wrong');
        console.log(error.response);
        return;
      }
    }
  };

  return (
    <Form className="loginForm" onSubmit={submitHandler}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn-primary">
        Login
      </button>
    </Form>
  );
};

export default LoginPage;
