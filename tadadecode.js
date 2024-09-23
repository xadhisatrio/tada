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

// Function to extract user data
function extractUserData(dataPart) {
    const userStart = dataPart.indexOf("user=");
    if (userStart !== -1) {
        // Extract the substring starting from "user="
        const userPart = dataPart.substring(userStart);
        const userEnd = userPart.indexOf("&"); // Check if there's any "&" after "user="
        return userEnd !== -1 ? userPart.substring(0, userEnd) : userPart;
    }
    return null;
}

// Find the index of "tgWebAppData=" and start after it
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
		
        // Decode the dataPart
        let decodedDataPart = decodeText(dataPart);
		
        // Extract user data and copy to clipboard
        if (decodedDataPart) {
            const userData = extractUserData(decodedDataPart);
            if (userData) {
                copyToClipboard(userData);
                console.log("User data copied to clipboard:", userData);
            } else {
                console.log("User data not found.");
            }
        }
    } else {
        console.log("Key 'tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'telegram-apps/launch-params' not found.");
}
