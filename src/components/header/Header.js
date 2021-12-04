import "./Header.css";

const Header = () => {

    return (
        <div className={'header'}>
            <span className={'header_span'} onClick={() => window.scroll(0, 0)}>
               {/*<img className={'img_header'} src={} alt="clapperboard"/>*/}
                ЗНАЙДИ СОБІ ЖИТЛО
                {/*<img className={'img_header'} src={} alt="videoCamera"/>*/}
           </span>
                {/*<Auth/>*/}
        </div>
    );
}

export default Header;