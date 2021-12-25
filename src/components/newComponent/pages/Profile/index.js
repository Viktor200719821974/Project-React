import { Grid,  Container, Typography } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         padding: theme.spacing(3),
//     },
// }));

function NotFound() {
    // const classes = useStyles();

    return (
        <Container maxWidth="sm" >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        Page not found.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default NotFound;