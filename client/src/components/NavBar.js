import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

/*
const styles = (theme) => ({
    myappbar: {
        backgroundColor: 'red'
    }
})
*/

const styles = (theme) => ({
    myappbar: {
        backgroundColor: '#222'
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3),
    },
});


const NavBar = (props) => {
    const {classes} = props;
    return (
    <div>
        <AppBar position="static" className={classes.myappbar}>
            <Toolbar>
                <Typography variant="h6" color="inherit">Skill Share</Typography>
                <div className={classes.right}>
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        className={classes.rightLink}
                        href="/"
                    >
                        {'Home'}
                    </Link>
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        className={classes.rightLink}
                        href="/learn/"
                    >
                        {'Learn'}
                    </Link>
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        className={classes.rightLink}
                        href="/images"
                    >
                        {'Images'}
                    </Link>
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        className={classes.rightLink}
                        href="/flex"
                    >
                        {'Flex'}
                    </Link>
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        className={classes.rightLink}
                        href="/forms"
                    >
                        {'Forms'}
                    </Link>                
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        className={classes.rightLink}
                        href="/tables"
                    >
                        {'Tables'}
                    </Link>                
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        className={classes.rightLink}
                        href="/student-list"
                    >
                        {'Students'}
                    </Link>                
                </div>
            </Toolbar>
        </AppBar>
    </div>
    )
}

export default withStyles(styles)(NavBar);