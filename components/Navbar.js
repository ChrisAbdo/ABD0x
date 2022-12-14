import React from "react";

function Navbar({ Web3Handler, account }) {
  return (
    <div className="navbar bg-base-100 border-b border-black  sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-xl w-52"
          >
            {account ? (
              <div>
                <li>
                  <a>Send Transaction</a>
                </li>

                <li>
                  <a>View Balance</a>
                </li>
              </div>
            ) : (
              <li>
                <a>Connect Wallet</a>
              </li>
            )}
          </ul>
        </div>
        <a href="/" className="btn btn-primary normal-case text-xl">
          ABD0x
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {account ? (
          <ul className="menu menu-horizontal p-0">
            <li>
              <a>Send Transaction</a>
            </li>
          </ul>
        ) : (
          <ul className="menu menu-horizontal p-0">
            <li></li>
          </ul>
        )}
      </div>
      <div className="navbar-end">
        {account ? (
          <a className="btn btn-outline">
            {account.slice(0, 5) + "..." + account.slice(38, 42)}
          </a>
        ) : (
          <a onClick={Web3Handler} className="btn btn-primary">
            Connect Wallet
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
