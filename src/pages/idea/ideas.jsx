import React from 'react';
import TargetIdea from "../../components/Idea/TargetIdea";
import  {Link} from 'react-router-dom'
const ideas =()=>{

    return(
        <div>
            <TargetIdea/>
            <div className={'text-right mr-3 '}
            ><Link to="/createIdea"><h1>Add</h1></Link></div>

        </div>)
}
export default ideas;

