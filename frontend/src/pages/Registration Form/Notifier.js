import React from 'react';
import {Alert, AlertTitle} from '@material-ui/lab';

function Notifier(props) {
    if (props.errorMessages === null ||
        props.errorMessages === undefined ||
        props.errorMessages.length === 0) {
        return (
            <div></div>
        );
    }
    else {
        return (
            <div style={{ margin: "10px" }}>
                <Alert severity="error" style={{borderRadius: "10px"}}>
                    <AlertTitle><strong>Error</strong></AlertTitle>
                    <ul>
                        {
                            props.errorMessages.map((data, index) => {
                                return (<li key={index}>{data}</li>);
                            })
                        }
                    </ul>
                </Alert>

            </div>
        );
    }
}
export default Notifier;