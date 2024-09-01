import { Box, Typography } from "@mui/material";

export function Bottom() 
{
    return(
        <Box sx={{ position: 'fixed', bottom: '0', bgcolor: 'background.paper', p: 2, mt: 4 }} component="footer">
            <Typography variant="body2" color="textSecondary" align="center">
                © 2024 Book Store
            </Typography>
        </Box>
    )
}