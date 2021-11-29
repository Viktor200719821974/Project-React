// import axios from "axios";
// import {REACT_APP_API_KEY,MAIN_API_TRENDING} from "../../constans/constans";
// import {useEffect, useState} from "react";
// import SingleContent from "../SingleContent/SingleContent";
// import CustomPagination from "../Pagination/CustomPagination";
// // import prevButton from "../Pagination/image/prevButton.svg";
// // import nextButton from "../Pagination/image/nextButton.svg";


const Trending = () => {
//     const [page, setPage] = useState(1);
//     const [content, setContent] = useState([]);
//
// // const nextPageChange = (page)=>{
// //     console.log(page);
// //     const num = Number(page);
// //     setPage(num+1);
// //     window.scroll(0,0);
// // }
//     const fetchTrending = async () => {
//         const {data} =await axios(`${MAIN_API_TRENDING}${REACT_APP_API_KEY}&page=${page}`);
//         setContent(data.results);
//     };
//     useEffect(()=>{
//         fetchTrending();
//     },[page])
    return (
        <>
            Trending
        </>
    )
}

export default Trending;