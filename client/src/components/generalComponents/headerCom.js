import {NavLink} from 'react-router-dom';
export default function(){
    return (
        <div>
            <h1>Header</h1>
            <NavLink to='/signUp'>SignUp</NavLink>
            <NavLink to='/signIn'>SignIn</NavLink>
        </div>
    )
}