const contractAddress = "0xa18a5720Ffe9e2bdEa21c0ddaD7913E82b05FF96";
const abi = [
    "function count() view returns (uint)",
    "function increment() public"
];

// Function to display count as images (e.g., apples)
function displayCount(count) {
    const countSpan = document.getElementById("count");
    countSpan.innerHTML = ""; // Clear previous content
    for (let i = 0; i < count; i++) {
        countSpan.innerHTML += "🍎 "; // Add an apple emoji for each count
    }
    if (count === 0) {
        countSpan.innerHTML = "No apples yet!";
    }
}

async function updateCount() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const count = await contract.count();
    displayCount(Number(count)); // Convert BigNumber to number
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
    updateCount(); // Refresh count with images
}

// Load count when page opens
window.onload = updateCount;