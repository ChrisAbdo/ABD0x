import React from "react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Wallet from "../build/contracts/Wallet.json";
import Web3 from "web3";

function Landing() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balanceInEther, setBalanceInEther] = useState(null);

  useEffect(() => {
    loadBlockchainData();
  }, [account]);

  const Web3Handler = async () => {
    const notification = toast.loading("Connecting...");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      console.log(accounts[0]);
      toast.success("Connected!", {
        id: notification,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error connecting! Please try again.", {
        id: notification,
      });
    }
  };

  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }

      const networkId = await web3.eth.net.getId();
      const networkData = Wallet.networks[networkId];

      if (networkData) {
        const transaction = new web3.eth.Contract(
          Wallet.abi,
          networkData.address
        );
        const balance = await transaction.methods.getBalance().call();
        setBalance(balance);
        setLoading(false);
      } else {
        window.alert("Smart contract not deployed to detected network.");
      }

      // Event listeners...
      window.ethereum.on("accountsChanged", function (accounts) {
        setAccount(accounts[0]);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }
  };

  const getBalance = async () => {
    const notification = toast.loading("Getting balance...");
    try {
      const balance = await web3.eth.getBalance(account);
      const balanceInEther = web3.utils.fromWei(balance, "ether");
      setBalance(balanceInEther);
      toast.success("Balance retrieved!", {
        id: notification,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error getting balance! Please try again.", {
        id: notification,
      });
    }
  };

  const Withdraw = async () => {
    const notification = toast.loading("Transferring...");
    try {
      const amount = document.getElementById("amount").value;
      const withdrawing = await web3.eth.sendTransaction({
        from: account,
        to: "0x185D78dda4404F080470A78456cb9C810546d08C",
        value: web3.utils.toWei(amount, "ether"),
      });
      console.log(withdrawing);
      toast.success("Transferred!", {
        id: notification,
      });

      // reset id="form" value
      document.getElementById("form").reset();
    } catch (error) {
      console.log(error);
      toast.error("Error transferring! Please try again.", {
        id: notification,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Send Transaction</h2>
          <form id="form">
            <input
              type="text"
              placeholder="Recipient Address"
              min={0}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="number"
              placeholder="Amount"
              id="amount"
              min={0}
              className="input input-bordered w-full max-w-xs mt-2"
            />
          </form>
          <div className="card-actions justify-end">
            <button onClick={Withdraw} className="btn btn-primary">
              Send
            </button>
            <label
              htmlFor="my-modal-6"
              className="btn btn-outline modal-button"
              onClick={getBalance}
            >
              View Balance
            </label>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-2xl">
                  Your balance is {balance} Ether
                </h3>
                <div className="modal-action">
                  <label htmlFor="my-modal-6" className="btn">
                    close
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
