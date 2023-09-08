import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to={`/`}>
          <p className="header-text">Verifex</p>
        </Link>
        <Link to={`/`}>
          <img src="../v2.jpg" alt="verifex logo" className="logo" />
        </Link>
      </div>
    </>
  );
};

export default Header;
