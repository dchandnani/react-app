import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles'
import {TextField, Button, Container} from '@material-ui/core';
import axios from 'axios';

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

class EditStudent extends Component {

  constructor(props) {
    super(props)

    console.log(props);

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

  componentDidMount() {
    axios.get('http://localhost:4000/students/edit-student/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

    axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res)
        console.log('Student successfully updated')
        // Redirect to Student List 
        this.props.history.push('/student-list')
      }).catch((error) => {
        console.log(error)
      })

  }

  render() {
      const {classes} = this.props;
    return (
        <Container>
            <form className={classes.root} onSubmit={this.onSubmit} >
                <TextField label="Name" value={this.state.name} onChange={this.onChangeStudentName}/>
                <TextField label="Email" type="email" value={this.state.email} onChange={this.onChangeStudentEmail}/>
                <TextField label="Roll Number" type="number" value={this.state.rollno} onChange={this.onChangeStudentRollno}/>
                <div><Button type="submit" className={classes.submitButton}>Update</Button></div>
            </form>
        </Container>
    );
  }
}

export default withStyles(styles)(EditStudent);