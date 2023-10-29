import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_BASE_PATH } from "../../properties";
import './login.css'


function Login({ setIsLoggedIn }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [type, setType] = useState("employee");

    const URL =
        type === "employee" ?
            `${API_BASE_PATH}/employees` :
            `${API_BASE_PATH}/customers`

    const handleInputChange = (event) => {
        setType(event.target.value);
    };

    async function login(event) {
        event.preventDefault();
        try {
            await axios.post(`${URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
                email: email,
                password: password,
            }).then((res) => {
                console.log(res.data);

                if (res.data.message === "Email not exits") {
                    alert("Email not exits");
                }
                else if (res.data.message !== "Login Failed") {
                    if (type === "employee")
                        navigate('/managerment');
                    else {
                        setIsLoggedIn(true);
                        navigate('/home');
                        localStorage.setItem("customer_id", res.data.message);
                    }

                }
                else {
                    alert("Incorrect Email and Password not match");
                }
            }, fail => {
                console.error(fail); // Error!
            });
        }


        catch (err) {
            alert(err);
        }

    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <h2>Login</h2>
                    <hr />
                </div>

                <div className="row">
                    <div className="col-sm-6">

                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter Name"

                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}

                                />

                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter Password"

                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}

                                />
                            </div>
                            <input type="radio"
                                name="type"
                                checked={type === "employee"}
                                onChange={handleInputChange}
                                id="employee" value='employee' /> Employee
                            <input
                                type="radio"
                                name="type"
                                checked={type === "customer"}
                                onChange={handleInputChange}
                                id="customer" value='customer' /> Customer
                            <br />
                            <br />
                            <button type="submit" className="btn btn-primary" onClick={login} >Login</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;