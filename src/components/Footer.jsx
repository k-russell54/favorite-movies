import "./Footer.css";

export default function Footer() {
  return (
    <>
        <div className="footerBox">
            <div className="footerFlex">
                <p>Data and images provided by</p>
                <a href="https://www.themoviedb.org/" target="_blank">
                <img src="/images/tmdb-logo.svg" alt="TMDB Logo" className="tmdbLogo" />
                </a>
            </div>
        </div>
    </>
  )  
};