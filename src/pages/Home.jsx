import React from 'react';
import {business, cities, role, roles, users, ideas, teams, urls,} from '../index'
import './home.css'

const home =()=>{
    urls();
    cities();
    business();
    ideas();
    roles();
    teams();
    users();


    return(
        <div>
            <h1 className={' home text-primary text-center '}>Welcome to Demium Startups!</h1>

        </div>)
}
export default home;
