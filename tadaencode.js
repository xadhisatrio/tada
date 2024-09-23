// Function to copy text to clipboard using a temporary text area
function copyToClipboard(text) {
    // Create a temporary text area element
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    // Select the text in the text area
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to clipboard
    try {
        document.execCommand('copy');
        console.log("Text copied to clipboard successfully.");
    } catch (err) {
        console.error("Failed to copy text to clipboard: ", err);
    }

    // Remove the temporary text area element
    document.body.removeChild(textArea);
}

// Get the value from sessionStorage for the key "telegram-apps/launch-params"
let launchParams = sessionStorage.getItem("telegram-apps/launch-params");

// Ensure the key exists in sessionStorage
if (launchParams) {
    // Find the index of "tgWebAppData=" and start after it
    let startIndex = launchParams.indexOf("tgWebAppData=");
    if (startIndex !== -1) {
        startIndex += "tgWebAppData=".length;  // Move index to right after "tgWebAppData="
        let endIndex = launchParams.indexOf("&", startIndex);
        if (endIndex === -1) {
            endIndex = launchParams.length; // Take until the end of the string if "&" is not found
        }

        // Extract the substring after "tgWebAppData="
        let dataPart = launchParams.substring(startIndex, endIndex);

        // Trim any surrounding quotes or whitespace from dataPart
        dataPart = dataPart.trim().replace(/^"|"$/g, "");

        // Copy the decoded result to clipboard
        copyToClipboard(dataPart);
    } else {
        console.log("Key 'tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'telegram-apps/launch-params' not found.");
}
