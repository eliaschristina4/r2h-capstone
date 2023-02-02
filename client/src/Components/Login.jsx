import React from "react"; 
import { ReactComponent as Logo } from '../Images/Login/boa3.svg'
import '../Styles/Login.css';
import axios from "axios"


class Login extends React.Component{
    state={
        login_email:'',
        login_password:'',
        loggedIn: false,
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const x = {
            email: this.state.login_email,
            password: this.state.login_password
        }
        axios.post("http://localhost:5000/login", x)
        // const [rows, fields] = await conn.query('SELECT * FROM mentors WHERE user_logins = ?', [this.state.login_email]);
        // if (rows.length > 0 && rows[0].password === this.state.login_password) {
        //     this.setState({loggedIn: true})
        // } else {
        //     this.setState({loggedIn: false})
        // }
    }

    handleLogout = () => {
        // perform log-out logic here, such as clearing local storage or resetting state
        this.setState({login_email: '', login_password: '', loggedIn: false})
    }

    render(){
        return(
            <div className='div-login'>
                <div className='boa-logo'>
                    <Logo />
                </div>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <input type ='email' name='login_email' placeholder='Please enter email address...' required onChange={this.handleChange} value={this.state.login_email} />
                        <input type='password' name='login_password' placeholder='Please enter password...' required onChange={this.handleChange} value={this.state.login_pwd} />
                        <button onClick={this.handleSubmit}>Log-In</button>
                        {this.state.login_email && this.state.login_password && <button onClick={this.handleLogout}>Sign Out</button>}
                    </form>
                    
                    {this.state.loggedIn && <p className="log-in-message">Log-in successful!</p>}
                </div>
            </div>
        )
    }
}

export default Login;