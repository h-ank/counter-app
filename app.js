const contractAddress = "0xa18a5720Ffe9e2bdEa21c0ddaD7913E82b05FF96";
const abi = [
    "function count() view returns (uint)",
    "function increment() public"
];

async function updateCount() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const count = await contract.count();
    document.getElementById("count").innerText = count.toString();
}

async function increment() {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Connect MetaMask
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.increment();
    await tx.wait(); // Wait for transaction to mine
    updateCount(); // Refresh count
}

// Load count when page opens
window.onload = updateCount;