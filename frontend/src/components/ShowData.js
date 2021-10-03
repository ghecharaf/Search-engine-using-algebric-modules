import { fade, makeStyles, withStyles } from '@material-ui/core';
import React, { Component } from 'react'




class ShowData extends Component {
    constructor(props) {
		super(props);
        this.state={
            data : this.props.data
        }
	}

    render() {
        return (
            <div>
                {
                    Object.keys(this.state.data).map((key, i) => (
                        <p key={i}>
                            {key==="value" ? 
                                <div>
                                    <h2>Description</h2>
                                    <span>{this.state.data[key]}</span> 
                                </div>
                                : 
                                ""
                            }
                            
                            
                        </p>
                    ))
                }
            </div>
        )
    }
}



export default ShowData;
