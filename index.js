console.log("hello world")
const form = document.querySelector("#submit");
if (window.ethereum) {
  console.log('MetaMask is installed!');
} else {
    console.log(window)
}
const urlParams = new URLSearchParams(location.search)
const formElements = document.getElementById("submit")
// const toElem = document.getElementById("toText")
urlParams.forEach((val,key) => {
    formElements.elements[key].value =val
}
)
// formElements.elements[key].value = val
form.addEventListener('submit',(event) => {
    console.log("clicked submit")
    event.preventDefault()
    const formElements = document.getElementById("submit")
    const to = formElements.elements['to'].value
    const from = formElements.elements['from'].value
    const txData = formElements.elements['txData'].value
    const value = formElements.elements['value'].value
    const chainId = formElements.elements['chainId'].value
    console.log("🚀 ~ file: index.js ~ line 8 ~ form.addEventListener ~ to, from,txData, value, chainId", to, from,txData, value, chainId)

})