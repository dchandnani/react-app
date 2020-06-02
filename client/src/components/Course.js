import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
    gr: {
        direction: "column",
        backGround: "blue"
    },
    imgGrid: {
        minWidth:'100%',
        minHeight: '100%',
        maxHeight: 200,
        objectFit: "cover"
    },
    txt: {
        overflow: 'hidden'
    }
});


const Course = (props) => {
    const {classes} = props;
    return (
        <Grid container direction="column" spacing={2} wrap="nowrap" justify="center">
            <Grid item container justify="center">
                <img className={classes.imgGrid} src={props.course.imgurl}/>
            </Grid>
            <Grid item container spacing={0}>
                <Grid item container justify="center">
                    <Typography variant="h4" className={classes.txt}>{props.course.title}</Typography>
                </Grid>
                <Grid item  container justify="center">
                    <Typography variant="body2" className={classes.txt}>{props.course.description}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Course);