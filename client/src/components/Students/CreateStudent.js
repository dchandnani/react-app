import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles'
import {TextField, Button, Container} from '@material-ui/core';
import axios from 'axios';
import { url } from '../../server-conn';

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        },
        marginTop: "50px"
    },
    submitButton: {
        marginTop: "30px"
    },
})

class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }

  onChangeStudentName(e) {
    this.setState({name: e.target.value})
  }

  onChangeStudentEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeStudentRollno(e) {
    this.setState({rollno: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
        name: this.state.name,
        email: this.state.email,
        rollno: this.state.rollno
      };

    console.log(studentObject);

    axios.post(url + '/students/create-student', studentObject)
      .then(res => {
        console.log(res.data)

        // Redirect to Student List 
        this.props.history.push('/student-list')
      });

    this.setState({name: '', email: '', rollno: ''})
  }

  render() {
      const {classes} = this.props;
    return (
        <Container>
            <form className={classes.root} onSubmit={this.onSubmit} >
                <TextField label="Name" onChange={this.onChangeStudentName}/>
                <TextField label="Email" type="email" onChange={this.onChangeStudentEmail}/>
                <TextField label="Roll Number" type="number" onChange={this.onChangeStudentRollno}/>
                <div><Button type="submit" className={classes.submitButton}>Submit</Button></div>
            </form>
        </Container>
    );
  }
}

export default withStyles(styles)(CreateStudent);