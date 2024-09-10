
import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin, FaVoicemail, FaGoogle } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By CareerBridge.</div>
      <div>
        <Link to={"abs1822021614@gmail.com"} target="_blank">
          <FaGoogle />
        </Link>
        <Link to={"https://github.com/abhishekgautam18220/CareerBridge"} target="_blank">
          <FaGithub />
        </Link>
        <Link to={"https://www.linkedin.com/in/abhishek-gautam-235965251/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/abhishekgautam18220/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
