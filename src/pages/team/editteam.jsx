import React from 'react';
import { connect } from 'react-redux';
import Team from "../../components/Team/Team";

const team =()=>{

    return(
        <div>
            <Team/>
        </div>)
}
export default connect()(team);

