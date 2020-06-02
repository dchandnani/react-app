import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import { FormControl, Button, InputLabel, Input, FormHelperText, Container, Checkbox, TextField, FormLabel, FormGroup, FormControlLabel, Radio, RadioGroup, Switch } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    }
})


const Forms = (props) => {
    const {classes} = props;

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    name: ""
  });


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
      console.log(event);
  }

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;


    return (
        <React.Fragment>
            <h2>Forms</h2>
            
            <Container style={{margin:50}}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <Checkbox
                        value="checkedA"
                        inputProps={{ 'aria-label': 'Checkbox A' }}
                    />
            </Container>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div>
                    <TextField required id="standard-required" label="Name" name="fname" onInput={(e)=>state.name=e.target.value}/>
                    <TextField label="Lastname" />
                    <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    />
                    <TextField
                    id="standard-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                    <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField id="standard-search" label="Search field" type="search" />
                    <TextField
                    id="standard-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    />
                </div>
                <div>
                    <TextField error id="standard-error" label="Name" defaultValue="Hello World" />
                    <TextField
                    error
                    id="standard-error-helper-text"
                    label="Name"
                    defaultValue="Hello World"
                    helperText="Incorrect entry."
                    />
                </div>

                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Assign responsibility</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                        label="Gilad Gray"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                        label="Jason Killian"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                        label="Antoine Llorca"
                    />
                    </FormGroup>
                    <FormHelperText>Be careful</FormHelperText>
                </FormControl>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                    </RadioGroup>
                </FormControl>

                <FormControlLabel value="setting" control={<Switch />} label="Setting" />

                <FormControlLabel control={<TextField label="Name"/>} />
                
                <Button type="submit">Submit</Button>
            </form>

        </React.Fragment>
    )
}

export default withStyles(styles)(Forms)