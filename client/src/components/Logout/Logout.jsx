import { NavLink } from "react-router-dom"
import s from './Logout.module.scss';

const Logout = (props) => {
    return (<button>
        <NavLink to="/user">
            Go to profile
        </NavLink>
    </button>)
};

export default Logout
