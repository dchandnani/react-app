import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import { getDefaultNormalizer } from '@testing-library/react';

const styles = (theme) => ({
    dgrid: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "red",
        marginBottom: 50
    },
    item1: {
        flex: "auto",
        backgroundColor: "#aaa"
    },
    item2: {
        backgroundColor: "yellow"
    }
});

class Flex extends React.Component {
    constructor() {
        super();
        this.state = {
            courses: []
        }
        this.getData();
    }

    getData() {
        for(var i=0;i<10;i++)
        {
            this.state.courses.push({title:"Course " + i})
        }
        console.log(this.state.courses);
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <h1>Flex</h1>
                <div className={classes.dgrid}>
                    <div className={classes.item1}>
                        This is an image!
                    </div>
                    <div style={{backgroundColor:"blue", flexDirection:"column", display: "flex"}}>
                        <div style={{backgroundColor:"yellow"}}>
                            React Course!
                        </div>
                        <div style={{backgroundColor:"lightgreen"}}>
                            description of the course
                        </div>
                    </div>
                </div>
    
                <Grid container direction="row" spacing={2} style={{backgroundColor:"red", marginBottom:50}}>
                    <Grid item xs style={{backgroundColor:"#ccc"}}>
                        This is an image!
                    </Grid>
                    <Grid item xs="auto">
                        <Grid container direction="column">
                            <Grid item style={{backgroundColor:"yellow"}}>
                                React Course!
                            </Grid>
                            <Grid item style={{backgroundColor:"lightgreen"}}>
                                description of the course
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginBottom:50}}>
                    {this.state.courses.map(course => (
                        <Grid item xs="6" sm="4" lg="3" xl="2">
                            <GridItem course={course}/>
                        </Grid>
                    ))}
                </Grid>

            </React.Fragment>
        );
    }
}

const GridItem = (props) => (
    <Grid container direction="row" spacing={2} style={{backgroundColor:"red", marginBottom:50}}>
    <Grid item xs style={{backgroundColor:"#ccc"}}>
        This is an image!
    </Grid>
    <Grid item xs="auto">
        <Grid container direction="column">
            <Grid item style={{backgroundColor:"yellow"}}>
                {props.course.title}
            </Grid>
            <Grid item style={{backgroundColor:"lightgreen"}}>
                description of the course
            </Grid>
        </Grid>
    </Grid>
</Grid>
);

export default withStyles(styles)(Flex);

