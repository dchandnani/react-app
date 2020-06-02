import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Grid} from '@material-ui/core';



const Course2 = (props) => {
    const {classes} = props;
    return (
        <Card>
        <CardMedia style={{height: 0, paddingTop: '56.25%'}}
        image={props.course.imgurl}
        title={props.course.title}
        />
        <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
                {props.course.title}
            </Typography>
            <Typography component="p">
                {props.course.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" color="primary" href={props.course.url} target="_blank">
                Go To Course
            </Button>
        </CardActions>
    </Card>
    )
}

export default Course2;