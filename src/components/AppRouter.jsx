import React from 'react';
import {Component} from 'react'
import  {BrowserRouter, Switch, Route, Redirect,Link, NavLink} from 'react-router-dom'
import ideas from '../pages/idea/ideas'
import team from '../pages/team/team'
import user from '../pages/user/user'
import cities from '../pages/cities/cities'
import '../App.css'
import ideapag from "../pages/idea/ideapag";
import teamcard from "../pages/team/teamCards";
import login from "../pages/login";
import home from "../pages/Home";
import cityId from "../pages/cities/cityId";
import editUser from "../pages/user/editUser";
import formteam from "../pages/team/formteam";
import createIdea from "../pages/idea/fromularioIdea";
import {addUser, modIdea, chanegUrl} from "../actions/actions";
import {store}from '../Redux/create'
import {connect} from "react-redux";
import Login from "./Login";



class AppRouter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            state:localStorage.getItem('accesToken')
        }

    }

    clickEx=()=>{
        localStorage.setItem('accesToken', false)
        store().push('')
        this.setState({state:'false'})
    }



    render(){
        if(this.state.state === 'false' ||this.state.state === null || this.state.state === 'null'  ){
            console.log('approuter ', localStorage.getItem('accesToken'))
            return(<Login/>)

        }else
        return(

<BrowserRouter>
    <div className={"linea"} >
        {console.log('approuter 2 ', localStorage.getItem('accesToken'))}
        <header>
            <nav className={"navbar navbar-dark"}>
               <h1 className={"text-white"}>Demium</h1>
                <div className={"col-md-6 text-right"}>
                <span className={"badge badge badge-light col-sm-1"}>
                     <NavLink activeClassName={"is-active "} to={"/cities"}  >cities</NavLink>
                </span>
                    <span  className={"badge badge-light ml-3 col-sm-1 "}>
                      <Link to={"/user"}>user</Link>
                    </span>
                    <span className={"badge badge-light ml-3 col-sm-1"}>
                      <Link to={"/team"}>team</Link>
                    </span>
                    <span className={"badge badge-light ml-3 col-sm-1"}>
                       <Link to={"/ideas"}>ideas</Link>
                    </span>
                    <span className="text-right ">
                        <a href="">
                        <Link to={"/login"} onClick={()=>{
                            this.clickEx()
                        }} className={' col-sm-1 badge badge-light text-light ml-3 bg-primary'}>Exit</Link></a>
                    </span>
                </div>
            </nav>
        </header>
        <Switch>
            <Route path={'/ideas'} component={ideas} exact={true}/>
            <Route path={'/user'} component={user} exact={true}/>
            <Route path={'/cities'} component={cities} exact={true}/>
            <Route path={'/team'} component={teamcard} exact={true}/>
            <Route path={'/ideaspag'} component={ideapag} exact={true}/>
            <Route path={'/teamcard'} component={teamcard} exact={true}/>
            <Route path={'/welcome'} component={home}  exact={true} />
            <Route path={'/teamedit'} component={team}  exact={true} />
            <Route path={'/city/:id'} component={cityId}  exact={true} />
            <Route path={'/user/:id'} component={editUser}  exact={true} />
            <Route path={'/formteam'} component={formteam}  exact={true} />
            <Route path={'/createIdea'} component={createIdea}  exact={true} />
            <Redirect to={'/welcome'}/>
        </Switch>
        <div className=" footer footer-copyright text-center py-3 mt-4">© 2018 Copyright:Demium, All rights reserved</div>
</div>
</BrowserRouter>)
}
}

const dispastchToProps=(dispatch)=>{
    return{
        changeUrl:(url)=> dispatch (chanegUrl(url)),


    }
}

export default connect(null,dispastchToProps)(AppRouter);

