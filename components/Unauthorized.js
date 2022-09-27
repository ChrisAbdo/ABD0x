import React from "react";

function Unauthorized({ Web3Handler, account }) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to ABD0x</h1>
          <p className="py-6 text-3xl">
            the gas optimized wallet with no additional transaction fees
          </p>
          <button onClick={Web3Handler} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
