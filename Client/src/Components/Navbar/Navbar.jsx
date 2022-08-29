import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const {user , setUser} = React.useContext(LoginContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/login");
    }

    return (
        <div style={{display:"flex" , justifyContent:"space-around" , padding:"10px"}}>
            <Link to='/'>Homepage</Link>
            {
                user ? <Link to = '/notes'>NOTES</Link>:null
            }
            {
                user ? <button onClick={handleLogout}>Logout</button> : <Link to='/login'>Login</Link>
            }
        </div>
    )
}

export default Navbar;