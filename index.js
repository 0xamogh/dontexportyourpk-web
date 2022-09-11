console.log("hello world")
const form = document.querySelector("#submit");

const metamaskCheck = checkIfMetamaskExists()
let currentAccount, currentChainId
if(metamaskCheck) connect()
populateFormFromQuery()

// formElements.elements[key].value = val
// form.addEventListener('submit',(event) => {
async function sendTransaction(){ 
console.log("clicked submit")
    // event.preventDefault()
    formElements = document.getElementById("submit")
 
    const params = {
        to : formElements.elements['to'].value,
        from : formElements.elements['from'].value,
        txData : formElements.elements['txData'].value,
        value : formElements.elements['value'].value,
        chainId : formElements.elements['chainId'].value,
    }
     
    if(!currentAccount){ 
        await connect()
    }

    if(params.from != currentAccount){
        console.log("From address is not the same as connected address")
        return
    }
    if("0x" + parseInt(params.chainId,10).toString(16) != currentChainId){
        console.log("You are connected to the wrong network :", currentChainId)
        requestChainSwitch("0x" + parseInt(params.chainId,10).toString(16))
        return
    }

    ethereum.request({
      method: 'eth_sendTransaction',
      params: [params],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
}

ethereum.on('accountsChanged', function (accounts) {
    currentAccount = accounts[0]
});

function handleAccountsChanged(){
    currentAccount = ethereum.selectedAddress
}


async function connect(){
    if(currentAccount){
        console.log(`Metamask is already connected with address : ${currentAccount}`)
        return
    }

      ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error("requreAccounts : ",error);
      }
    });

}

async function requestChainSwitch(chainId){
 try {
  await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: chainId }],
  });
} catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainId,
            chainName: '...',
            rpcUrls: ['https://matic.slingshot.com'] /* ... */,
          },
        ],
      });
    } catch (addError) {
      // handle "add" error
    }
  }
}
}
function populateFormFromQuery(){
    const urlParams = new URLSearchParams(location.search)
    let formElements = document.getElementById("submit")
    urlParams.forEach((val,key) => {
        formElements.elements[key].value =val
        }
    )
}

function checkIfMetamaskExists(){
    if (window.ethereum) {
        return true
    } else {
        console.log("Please install Metamask!")
        return false
    }

}

ethereum.on('connect', handler => {
    currentChainId = handler.chainId
});
