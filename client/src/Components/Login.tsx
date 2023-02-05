import React from "react";
import { ReactComponent as Logo } from '../Images/Login/boa3.svg'
import '../Styles/Login.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [login_email, setLoginEmail] = React.useState("");
  const [login_password, setLoginPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "login_email") {
      setLoginEmail(value);
    } else {
      setLoginPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const x = {
      login_email,
      login_password,
    };
    try {
      const response = await axios.post("http://localhost:5000/login", x);
      if (response.data === "Login successful") {
        navigate("/");
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      setErrorMessage("Username and/or Password not found");
    }
  };

  return (
    <div className="div-login">
      <div className="boa-logo">
        <Logo />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="login_email"
            placeholder="Please enter email address..."
            required
            value={login_email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="login_password"
            placeholder="Please enter password..."
            required
            value={login_password}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Log-In</button>
        </form>
        <div>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
        <a href="/signup/business">
          <button className="register">Register</button>
        </a>
      </div>
    </div>
  );
};

export default Login;