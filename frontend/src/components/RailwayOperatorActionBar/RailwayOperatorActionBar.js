import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';

function RailwayOperatorActionBar(props) {
    return (
        <div>
            <div className="row">
                <div className="col-md-9 col-12">
                    {props.email}
                </div>
                <div className="col-md-3 col-12">
                    <Button variant="contained" onClick={props.logoutMethod} color="primary">Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default RailwayOperatorActionBar;
