import React from 'react';
import { connect } from 'react-redux';
import FormTeam from "../../components/Team/FromularioTeam";

const formteam =()=>{

    return(
        <div>
            <FormTeam/>
        </div>)
}
export default connect()(formteam);

