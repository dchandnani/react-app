import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core';

const styles = (theme) => ({
    imgGrid: {
        minHeight:"100%",
        minWidth:"100%",
        height:500,
        objectFit:"cover"
    }
})


const Images = (props) => {
    const {classes} = props;
    return (
        <React.Fragment>
            <h2>Image fun</h2>
            <div style={{position:"relative"}}>
                <img className={classes.imgGrid} src='https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'/>
                <div style={{position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)"}}>
                    <Typography variant="h2">Hello</Typography>
                </div>
                <div style={{position:"absolute", top:"70%", left:"50%", transform:"translate(-50%,-50%)"}}>
                    <Typography variant="h6">This is so cool!</Typography>
                </div>
            </div>


            <Grid container xs={3} style={{backgroundColor:"red", position:"relative"}}>
                <img className={classes.imgGrid} src='https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'/>
                <div style={{position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)"}}>
                    <Typography variant="h2">Hello</Typography>
                </div>
                <div style={{position:"absolute", top:"70%", left:"50%", transform:"translate(-50%,-50%)"}}>
                    <Typography variant="h6">This is so cool!</Typography>
                </div>
            </Grid>

        </React.Fragment>
    )
}

export default withStyles(styles)(Images)