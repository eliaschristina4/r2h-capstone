import React from "react"; 
import { ReactComponent as Logo } from '../Images/Login/boa3.svg'
import axios from "axios"

// CSS
import '../Styles/Login.css';

class Login extends React.Component{
    state={
        login_email:'',
        login_password:'',
        loggedIn: false,
        errorMessage: ""
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const x = {
          login_email: this.state.login_email,
          login_password: this.state.login_password
        };
        console.log(x);
        try {
          const response = await axios.post("http://localhost:5000/login", x);
          if (response.data === "Login successful") {
            // handle success
          } else {
            this.setState({ errorMessage: response.data });
          }
        } catch (error) {
          this.setState({ errorMessage: "Username and/or Password not found" });
        }
      };

    render(){
        return(
            <div className='div-login'>
                <div className='boa-logo'>
                    <Logo />
                </div>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <input type ='email' name='login_email' placeholder='Please enter email address...' required onChange={this.handleChange} value={this.state.login_email} />
                        <input type='password' name='login_password' placeholder='Please enter password...' required onChange={this.handleChange} value={this.state.login_password} />
                        <button onClick={this.handleSubmit}>Log-In</button>
                    </form>
                    <div>
                        {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
                    </div>
                    <a href="/signup/business">
                        <button className='register' >Register</button>
                    </a>
                </div>
            </div>
        )
    }
}

export default Login;