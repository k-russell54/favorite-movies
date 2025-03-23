import "./Footer.css";

export default function Footer() {
  return (
    <>
        <div className="footerBox">
            <div className="footerFlex">
                <p>Data and images provided by</p>
                <a href="https://www.themoviedb.org/" target="_blank">
                <img src="./imgs/TMDB logo.svg" alt="TMDB Logo" width="150" />
                </a>
            </div>
        </div>
    </>
  )  
};