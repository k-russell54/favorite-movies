import "./Footer.css";

// export default function Footer() {
//   return (
//     <div className="footerBox">
//         <div className="footerFlex">
//             <p>Data and images provided by</p>
//             <a href="https://www.themoviedb.org/" target="_blank">
//             {/* <img
//                 src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
//                 alt="TMDB logo"
//             /> */}
//             <img 
//                 src="https://via.placeholder.com/100" 
//                 alt="Placeholder test" 
//                 style={{ width: "100px", height: "auto", display: "block" }}

//             />

//             </a>
//         </div>
//     </div>
// )  
// };

export default function Footer() {
    return (
      <div className="footerBox">
        <div className="footerFlex">
            <p>Data and images provided by</p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB logo"
              />
            </a>
        </div>
      </div>
    );
  }
  