import React from 'react';
import {Link} from 'react-router-dom';
import { withAuth } from './../context/auth-context';

function Home(props) {
    return (
        <div>
            <h1>HomePage</h1>
            <p>description of what the app is about, cool pictures and stuff</p>
            {props.isLoggedIn 
            ? <div>My Dashboard</div>
            : <Link to='/login'><div>Get Started</div></Link>}
        </div>
    )
}

export default withAuth(Home);
