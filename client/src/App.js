import { useEffect, useState, useMemo } from 'react';
import getWeb3 from "./getWeb3";
import Voting from './contracts/Voting.json'
import './App.css';

function App() {
  const [state, setState] = useState({ web3: null, accounts: null, loading: true, contract: null })
  const [contract, setContract] = useState(null)
  const connectWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      setState({ ...state, web3 })
    } catch (e) {
      console.log(e)
    }
  }
  const getInstance = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Use web3 to get the user's accounts.
        const accounts = await state.web3?.eth.getAccounts();
        // Get the contract instance.
        const networkId = await state.web3.eth.net.getId();
        const deployedNetwork = Voting.networks[networkId];
        const instance = new state.web3.eth.Contract(
          Voting.abi,
          deployedNetwork && deployedNetwork.address,
        );
        resolve({ accounts, instance })
      } catch (e) {
        reject(e)
      }
    })
  }
  const connectToBlockchain = async () => {
    console.log('connecting to blockchain...')
    getInstance()
      .then(({ accounts, instance }) => {
        debugger
        setState({ ...state, accounts, loading: !instance, contract: instance });
        debugger

        console.log('connected to blockchain')
      })
      .catch(error => {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      })
  }

  /*
  list of addresses : 
  0x6db64B65E05cFdffcc59aed245B65278E8AaDd79
  0xf0Db310fB274f815AD18E277D3111Fa318A5687A
  0x5c8489FE89d2bF0E4e2D160031bC7C4a32D8846F
  0xe5f117d1a8e114b9a47d1a6490b81c85f8124e6e (owner)
  */

  const addVoter = async () => {
    await state.contract.methods.addVoter('0x6db64B65E05cFdffcc59aed245B65278E8AaDd79').send({ from: state.accounts[0] })
  }
  useEffect(() => {
    connectWeb3()
  }, [])

  const account = useMemo(() => state.accounts && state.accounts[0], [state.accounts])
  const contractDetails = useMemo(() => {
    return {
      voteCount: contract?.methods?.getVotersCount().call(),
    }
  }, [addVoter])
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1"><small>Contract # {account}</small></span>
          <button disabled={!state.web3} style={{ opacity: !state.web3 ? 0.5 : 1 }} className="btn btn-light" onClick={connectToBlockchain}>{
            state.loading ?
              'Connect to Blockchain 🔴' :
              'Connected 🟢'
          }</button>
        </div>
      </nav>
      <button className="btn btn-light mt-5" onClick={addVoter}>add voter</button>
      <p>Number of voters registered : {contractDetails?.voteCount}</p>
    </div >
  );
}

export default App;
