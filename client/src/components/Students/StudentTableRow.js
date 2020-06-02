import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, TableRow, TableCell } from '@material-ui/core';
import axios from 'axios';

export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        axios.delete('http://localhost:4000/students/delete-student/' + this.props.obj._id)
        .then(res => {
          console.log(res);
          console.log('Student successfully deleted!')
          this.props.callback(this.props.obj)
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.obj.name}</TableCell>
                <TableCell>{this.props.obj.email}</TableCell>
                <TableCell>{this.props.obj.rollno}</TableCell>
                <TableCell>
                    <Link className="edit-link" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteStudent}>Delete</Button>
                </TableCell>
            </TableRow>
        );
    }
}


