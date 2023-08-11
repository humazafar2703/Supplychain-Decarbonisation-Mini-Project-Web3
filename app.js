// Assuming you are using MetaMask or another web3 provider
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    alert("Please install MetaMask!");
}

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your deployed contract's address
const abi = []; // Replace with your contract's ABI

const contract = new web3.eth.Contract(abi, contractAddress);

async function addProduct() {
    const productName = document.getElementById("productName").value;
    const carbonFootprint = document.getElementById("carbonFootprint").value;
    const accounts = await web3.eth.getAccounts();

    contract.methods.addProduct(productName, carbonFootprint).send({ from: accounts[0] })
    .on('receipt', function(receipt){
        alert(`Product added: ${productName} with carbon footprint: ${carbonFootprint}`);
    })
    .on('error', console.error);
}

async function transferProduct() {
    const productId = document.getElementById("productId").value;
    const newOwner = document.getElementById("newOwner").value;
    const accounts = await web3.eth.getAccounts();

    contract.methods.transferProduct(productId, newOwner).send({ from: accounts[0] })
    .on('receipt', function(receipt){
        alert(`Product with ID ${productId} transferred to ${newOwner}`);
    })
    .on('error', console.error);
}
