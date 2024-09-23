// Function to copy text to clipboard using a temporary text area
function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices

    try {
        document.execCommand('copy');
        console.log("Text copied to clipboard successfully.");
    } catch (err) {
        console.error("Failed to copy text to clipboard: ", err);
    }

    document.body.removeChild(textArea);
}

// Function to decode URL-encoded text
function decodeText(text) {
    try {
        return decodeURIComponent(text);
    } catch (err) {
        console.error("Failed to decode text: ", err);
        return null;
    }
}

// Function to extract user data from the decoded part and handle user%3D
function extractUserData(dataPart) {
    // First, replace "user%3D" with "user=" before decoding
    let correctedDataPart = dataPart.replace("user%3D", "user=");
    
    // Decode the data part after correcting "user%3D"
    correctedDataPart = decodeText(correctedDataPart);

    // Use URLSearchParams to parse the corrected part
    const params = new URLSearchParams(correctedDataPart);
    return params.get('user'); // Get the 'user' parameter
}

// Get launch parameters from session storage
let launchParams = sessionStorage.getItem("telegram-apps/launch-params");

if (launchParams) {
    let startIndex = launchParams.indexOf("tgWebAppData=");
    if (startIndex !== -1) {
        startIndex += "tgWebAppData=".length;  // Move index to right after "tgWebAppData="
        let endIndex = launchParams.indexOf("&", startIndex);
        if (endIndex === -1) {
            endIndex = launchParams.length; // Take until the end of the string if "&" is not found
        }

        // Extract the substring after "tgWebAppData="
        let dataPart = launchParams.substring(startIndex, endIndex);

        // Extract user data and copy to clipboard
        const userData = extractUserData(dataPart);  // This will replace and decode "user%3D" to "user="
        if (userData) {
            copyToClipboard(userData);  // Copy 'user' data to clipboard
            console.log("User data copied to clipboard:", userData);
        } else {
            console.log("User data not found.");
        }
    } else {
        console.log("Key 'tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'telegram-apps/launch-params' not found.");
}
