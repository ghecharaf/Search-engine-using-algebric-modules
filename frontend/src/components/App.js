import React , {Component} from "react";
import {render} from 'react-dom';
import ShowData from "./ShowData";
import Button from "@material-ui/core/Button";
import { FormControl, Grid, InputBase, makeStyles, TextField, withStyles } from "@material-ui/core";


const styles = makeStyles()


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request : "",
            model : 
            {
                test:"button",
                data : []
            }
        }
    }    


    UpdateRequest=(event)=> {
        this.setState({request : event.target.value})
    }

    getData=()=> {
        fetch("/api/bool"+"?request="+this.state.request)
        .then((response) =>{
            if (!response.ok) {
                return {};
            } else {
                return response.json();
            }
        })
        .then((data)=>{
            this.setState({
                model: {
                    data : []
                }
            })
            this.setState({
                model: {
                    test: this.state.model.test,
                    data : data
                }
            },
            () => {console.log(this.state.model.data)});
        });
    }

    showState=()=> {
        console.log(this.state.model)
    }
    
    render() {
        return (
            <div style={{paddingTop:"10px"}}>
                <Grid container >
                    <Grid item xs={6} align="center">
                        <TextField
                            align="center"
                            style={{width:"70%"}}
                            id="outlined-basic" 
                            label="Search for request" 
                            variant="outlined" 
                            required={true}
                            type="text"
                            defaultValue=""
                            onChange={this.UpdateRequest}
                        />
                    </Grid>
                    <Grid item xs={6} align="center">
                        <Button size="large" tyle={{width:"100%"}} color="primary" variant="contained" className="center" onClick={this.getData}>
                            Search
                        </Button>
                    </Grid>
                    
                </Grid>
                
                <p>
                    {this.state.model.data.map(data=>
                        <ShowData data={data}/>
                    )}
                </p>
                
            </div>
        )
            
    }
}

export default withStyles(styles, { withTheme: true })(App);

const appDiv = document.getElementById("app");
render(<App />, appDiv);