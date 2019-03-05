import React from 'react';
import { connect } from 'react-redux';
import Cityid from "../../components/Cities/Cityid";

const cityId =()=>{

    return(
        <div>
            <Cityid/>
        </div>)
}
export default connect()(cityId);
