import React from "react";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import introJs from "intro.js/intro";

export default () => {
  return (
    <nav
      style={{ margin: "1rem" }}
      className="relative flex items-center justify-between sm:h-10 md:justify-center"
    >
      <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" aria-label="Home">
            <img className="h-8 w-auto sm:h-10" src={Logo} alt="paytm stats" />
            Paytm stats
          </Link>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              id="main-menu"
              aria-label="Main menu"
              aria-haspopup="true"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:space-x-5">
        <Link
          to="/calendar"
          href="#"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md   bg-white    transition duration-150 ease-in-out btn"
        >
          Calendar view
        </Link>
        <a
          href="https://www.buymeacoffee.com/fxnoob"
          target="_blank"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md   bg-white    transition duration-150 ease-in-out btn"
        >
          Donate
        </a>
        <button
          onClick={() => {
            introJs().start();
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md   bg-white    transition duration-150 ease-in-out btn"
        >
          Help
        </button>
        <Link
          to="/about"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md   bg-white    transition duration-150 ease-in-out btn"
        >
          About
        </Link>
      </div>
      <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
        <span className="inline-flex rounded-md shadow">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md   bg-white    transition duration-150 ease-in-out"
          >
            Close
          </a>
        </span>
      </div>
    </nav>
  );
};
