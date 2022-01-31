import "../../header/Header.css";

function NotFound() {
    return (
            <div className={'div_NotFound_main'}>
                <div>
                <div className={'div_NotFound_error'}>404</div>
                <div className={'div_NotFound_page'}>Page not found.</div>
            </div>
            </div>
    );
}

export default NotFound;