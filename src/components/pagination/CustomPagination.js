import {Pagination, ThemeProvider} from "@mui/material";
import { createTheme } from '@material-ui/core/styles';

const CustomPagination = ({setPage, numOfPages}) => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    count={numOfPages || 10}
                    onChange={(e)=>  handlePageChange(e.target.textContent)}
                    color="primary"
                    hidePrevButton
                    hideNextButton
                    style={{marginTop: "20px", justifyContent: "center"}}

                />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination;