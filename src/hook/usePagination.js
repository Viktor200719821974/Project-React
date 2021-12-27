function usePagination(setPage, numOfPages) {

    function next(page) {
        setPage(page => Math.min(page + 1, numOfPages));
    }

    function prev() {
        setPage(page => Math.max(page - 1, 1));
    }
    function jump(page) {
        const pageNumber = Math.max(1, page);
        setPage(page => Math.min(pageNumber, numOfPages));
    }

    return { next, prev, jump};
}

export {usePagination};