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

// Get the current value from sessionStorage for the key "telegram-apps/launch-params"
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

        // Copy the entire tgWebAppData to the clipboard
        copyToClipboard(dataPart);
        console.log("tgWebAppData copied: ", dataPart);

        // Now search for the "user" parameter within the extracted data
        let userStartIndex = dataPart.indexOf("user=");
        if (userStartIndex !== -1) {
            userStartIndex += "user=".length; // Move index to right after "user="
            let userEndIndex = dataPart.indexOf("&", userStartIndex);
            if (userEndIndex === -1) {
                userEndIndex = dataPart.length; // Take until the end of the string if "&" is not found
            }
            let userData = dataPart.substring(userStartIndex, userEndIndex);
            
            // Copy the user data to the clipboard
            copyToClipboard(userData);
            console.log("User data copied: ", userData);
        } else {
            console.log("'user' not found in tgWebAppData.");
        }
    } else {
        console.log("Key 'tgWebAppData=' not found.");
    }
} else {
    console.log("Session storage key 'telegram-apps/launch-params' not found.");
}
