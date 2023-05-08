import "./CSS/Footer.css";
import palaLogo from '../images/pala2.png';

export const Footer = (prop) => {
  return (
    <footer className="footerClass">
      <div className="footerContainer">
        <span className="footerText">
          &copy; Cooperativa Fort - 2023
        </span>
        <img className="logo" src={palaLogo} alt="LA PALA" width="25px" />
      </div>
    </footer>
  );
};

export default Footer;
