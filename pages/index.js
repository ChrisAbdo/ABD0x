import Head from "next/head";
import Web3 from "web3";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Wallet from "../build/contracts/Wallet.json";
import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import Footer from "../components/Footer";
import Unauthorized from "../components/Unauthorized";

const Home = () => {
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

  return (
    <div className="min-h-screen" data-theme="black">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar Web3Handler={Web3Handler} account={account} />

      {account ? (
        <Landing Web3Handler={Web3Handler} account={account} />
      ) : (
        <Unauthorized Web3Handler={Web3Handler} account={account} />
      )}

      <Footer />

      {/* <button className="button outline" onClick={Web3Handler}>
        Connect
      </button>
      {account && <p>Account: {account}</p>}

      <button className="button outline" onClick={getBalance}>
        Get Balance
      </button>
      {balance && <p>Balance: {balance} ETH</p>}

      <button className="button outline" onClick={Withdraw}>
        Withdraw
      </button>

      <input type="text" id="amount" placeholder="Amount" /> */}
    </div>
  );
};

export default Home;
