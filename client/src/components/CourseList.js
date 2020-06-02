import React, {Component} from 'react';
import {Grid, TextField} from '@material-ui/core';
import * as contentful from 'contentful';
import Course2 from './Course2';

const SPACE_ID = 'e8drzbikyrej'
const ACCESS_TOKEN = '4e816bc09519ff8d67b0c20d95a0b2c6825d6b91d7e689c10254d0ed34423e9c'

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})

class CourseList extends Component {
    state = {
        courses: [
            {
                title: "React Course",
                imgurl: "https://images.pexels.com/photos/318391/pexels-photo-318391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "C# Course",
                imgurl: "https://images.pexels.com/photos/2530912/pexels-photo-2530912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "TypeScript Course",
                imgurl: "https://images.pexels.com/photos/2568375/pexels-photo-2568375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "React Course",
                imgurl: "https://images.pexels.com/photos/318391/pexels-photo-318391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "C# Course",
                imgurl: "https://images.pexels.com/photos/2530912/pexels-photo-2530912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "TypeScript Course",
                imgurl: "https://images.pexels.com/photos/2568375/pexels-photo-2568375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "React Course",
                imgurl: "https://images.pexels.com/photos/318391/pexels-photo-318391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "C# Course",
                imgurl: "https://images.pexels.com/photos/2530912/pexels-photo-2530912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "TypeScript Course",
                imgurl: "https://images.pexels.com/photos/2568375/pexels-photo-2568375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "React Course",
                imgurl: "https://images.pexels.com/photos/318391/pexels-photo-318391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "C# Course",
                imgurl: "https://images.pexels.com/photos/2530912/pexels-photo-2530912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
            {
                title: "TypeScript Course",
                imgurl: "https://images.pexels.com/photos/2568375/pexels-photo-2568375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                description: "Lorem ipsum yay"
            },
        ],
        searchString: ''
    }

    constructor() {
        super();
        //this.getCourses();
    }

    getCourses = () => {
        client.getEntries({
            content_type: 'courses',
            query: this.state.searchString
        })
        .then((response) => {
            this.setState({courses: response.items})
        })
        .catch((error) => {
            console.log("Error occured while fetching data")
            console.log(error)
        })
    }

    onSearchInputChange = (event) => {
        if(event.target.value) {
            this.setState({searchString: event.target.value});
        } else {
            this.setState({searchString: ''});
        }
        this.getCourses();
    }

    render = () => (
        <div>
            {this.state.courses ? (
                <div>
                    <TextField style={{padding: 24}}
                        id="searchInput"
                        placeholder="Search for Courses"
                        margin="normal"
                        onChange={this.onSearchInputChange} />
                    <Grid container spacing={3} style={{padding:24}} justify="space-evenly"    >
                        {this.state.courses.map(currentCourse => (
                            <Grid item xs={6} sm={4} lg={3} xl={2}>
                                <Course2 course={currentCourse} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : "No courses found" }
        </div>
    )
}

export default CourseList;