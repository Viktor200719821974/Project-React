import {Pagination, ThemeProvider} from "@mui/material";
import { createTheme } from '@material-ui/core/styles';
// import prevButton from "./image/prevButton.svg";
// import nextButton from "./image/nextButton.svg";

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
    // const nextPageChange = (page)=>{
    //     console.log(page);
    //     setPage(page+1);
    //     window.scroll(0,0);
    // }
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                {/*<img className={'button_pagination'} src={prevButton} alt="prevButton"/>*/}
                <Pagination

                    count={numOfPages || 10}
                    onChange={(e)=>  handlePageChange(e.target.textContent)}
                    color="primary"
                    hidePrevButton
                    hideNextButton
                    style={{marginTop: "20px"}}

                />
                {/*<img className={'button_pagination'}*/}
                {/*    onClick={(e)=> nextPageChange(e)}*/}
                {/*    src={nextButton} alt="nextButton"/>*/}
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination;