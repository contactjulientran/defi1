import { useEffect, useState, useMemo } from 'react';
import logo from './logo.svg';
import getWeb3 from "./getWeb3";
import Voting from './contracts/Voting.json'
import './App.css';

function App() {
  const [state, setState] = useState({ loading: true, web3: null, accounts: null, contract: null })

  const connectWeb3 = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await getWeb3();
        resolve(web3)
      } catch (e) {
        reject(e)
      }
    })
  }
  const getInstance = () => {
    return new Promise(async (resolve, reject) => {
      // Use web3 to get the user's accounts.
      const accounts = await state.web3?.eth.getAccounts();

      console.log('connecting to blockchain...', state.web3)
      // Get the contract instance.
      const networkId = await state.web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const instance = new state.web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );
      resolve({ accounts, instance })
    })
  }

  const handleOnClick = () => {
    console.log('connecting to blockchain...')
    try {
      getInstance().then(({ accounts, instance }) => {
        console.log(accounts, instance);
        setState({ ...state, accounts, contract: instance, loading: !Boolean(instance) });
        console.log('connected to blockchain')
      })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }


  useEffect(() => {
    connectWeb3().then(web3 => setState({ ...state, web3, loading: !Boolean(!!web3) }))
  }, [])

  const account = useMemo(() => {
    return state.accounts ?? []
  }, [state.accounts])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Contract #:{account}
        </p>

        <button disabled={!state.web3} onClick={handleOnClick} className="btn btn-light btn-lg">Connect to Blockchain</button>
      </header>
    </div>
  );
}

export default App;
