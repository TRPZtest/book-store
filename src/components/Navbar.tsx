import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export function Navbar()
{
    return( <
        AppBar position="static" color={'info'}>
            <Toolbar>
                <Button component={Link} to="/"  color="inherit">
                    Home
                </Button>
                <Button component={Link} to="/books/add/"  color="inherit">
                    Add New Book
                </Button>
            </Toolbar>
        </AppBar>
    )
}