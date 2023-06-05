import React from "react";
import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={"/img/kicsit-logo.png"}
              alt="KICSIT Logo"
              className="h-10 mr-2"
            />
            <div></div>
          </div>
          <div className="text-gray-400 text-sm flex flex-col items-center md:flex-row">
            <div className="flex items-center mb-4 md:mb-0">
              <PhoneIcon className="h-5 w-5 mr-2" />
              <span>+92-51-9285059</span>
            </div>
            <div className="flex items-center mb-4 md:mb-0 md:ml-6">
              <PhoneIcon className="h-5 w-5 mr-2" />
              <span>+92-51-9285187</span>
            </div>
            <div className="flex items-center mb-4 md:mb-0 md:ml-6">
              <MailIcon className="h-5 w-5 mr-2" />
              <span>info@kicsit.edu.pk</span>
            </div>
            <div className="flex items-center mb-4 md:mb-0 md:ml-6">
              <PhoneIcon className="h-5 w-5 mr-2" />
              <span>+92-51-9285245</span>
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-center">
          <p className="mb-2">
            Dr. A. Q. Khan Institute of Computer Sciences & Information
            Technology, Sumbal Gah Kahuta, Distt. Rawalpindi, Pakistan.
          </p>
          <p className="mb-4">
            <a
              href="https://www.kicsit.edu.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Visit our website
            </a>
          </p>
          <p>
            &copy; {new Date().getFullYear()} Dr. A. Q. Khan Institute of
            Computer Sciences & Information Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
