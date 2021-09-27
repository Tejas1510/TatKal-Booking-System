import React from 'react';
import greenTick from'../../images/greentick.png';
import './Success.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Success(props) {
    
    return (
        <div>
            <div style={{padding: "20px", margin: "10px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
                <div className="row">
                    <div className="col-12 text-center col-md-2 offset-md-1 text-md-left">
                        <img src={greenTick} className="greenTickResp"/>
                    </div>
                    <div className="col-12 text-center col-md-6 text-md-left">
                        <br/><br/>
                        <div className="h2">Form Submitted Successfully</div>
                    </div>
                </div>
                

            </div>
        </div>
            
    );
}
export default Success;