function startCamera() {
    alert("Accessing camera... Please center the e-waste item within the green brackets.");
    // In a real app, you would use navigator.mediaDevices.getUserMedia()
}

function handleFile(input) {
    if (input.files && input.files[0]) {
        alert("Analyzing " + input.files[0].name + " using AI Detection...");
        // You would send the image to your Flask/XGBoost backend here
    }
}