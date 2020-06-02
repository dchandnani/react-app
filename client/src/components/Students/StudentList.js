import React, { Component } from "react";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import StudentTableRow from './StudentTableRow';
import { Link } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  createLink: {
    margin: "30px"
  }
})

class StudentList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      students: [],
      page: 0,
      rowsPerPage: 10
    };
  }

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value, page: 0});
  };

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        console.log(res);
        this.setState({
          students: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRow = (row) => {
    console.log(row)
    for( var i = 0; i < this.state.students.length; i++){ 
      if ( this.state.students[i]._id === row._id) { 
        console.log(this.state.students[i]._id);
        this.state.students.splice(i, 1)
        this.setState({students: this.state.students}); 
        console.log(this.state.students);
        i--; 
      }
    }
  }


  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Roll Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.students.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, i) => {
                  return (
                    <StudentTableRow obj={row} key={i} callback={this.deleteRow}/>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={this.state.students.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <Link className={classes.createLink} to={"/create-student"}>Create</Link>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StudentList);