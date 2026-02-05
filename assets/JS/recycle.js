const basePrices = {
    mobile: 500,
    laptop: 1200,
    tv: 1500,
    charger: 100,
    battery: 300,
    other: 200
  };
  
  const conditionMultiplier = {
    working: 1,
    damaged: 0.6,
    dead: 0.3
  };
  
  const usageMultiplier = {
    "1>": 1,
    "1-3": 0.8,
    ">3": 0.5
  };
  
  // Main calculator
  function calculateEstimate() {

    
    const type = document.getElementById("type").value;
  
    const normalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    const condition = document.querySelector(
      'input[name="condition"]:checked'
    )?.value;
    

    const usage = document.querySelector(
      'input[name="usage"]:checked'
    )?.value;
  
    const quantity = Number(document.getElementById("quantity").value) || 1;
  
    // If anything missing → reset display
    if (!type || !condition || !usage) {
        document.getElementById("estimatedPrice").innerText = "—";
        document.getElementById("estimatedPoints").innerText = "—";
        return;
      }
  
    const price =
  basePrices[type] *
  conditionMultiplier[condition] *
  usageMultiplier[usage] *
  quantity;
  
    const points = Math.round(price / 10);
  

    document.getElementById("estimatedPrice").value = ` ${price.toFixed(0)}`;
    document.getElementById("estimatedPoints").value = `${points}`;

    console.log(
        "LOOKUP TEST →",
        basePrices[type],
        conditionMultiplier[condition],
        usageMultiplier[usage]
      );
  }
  
  /* 🔁 AUTO-LISTENERS */
  
  // Type dropdown
  document.getElementById("type").addEventListener("change", calculateEstimate);
  
  // Condition radios
  document.querySelectorAll('input[name="condition"]').forEach(radio => {
    radio.addEventListener("change", calculateEstimate);
  });
  
  // Usage radios
  document.querySelectorAll('input[name="usage"]').forEach(radio => {
    radio.addEventListener("change", calculateEstimate);
  });
  
  // Quantity input
  console.log("type:", document.getElementById("type"));
    console.log("quantity:", document.getElementById("quantity"));

  document.getElementById("quantity").addEventListener("input", calculateEstimate);
  

//
function toggleOtp() {
  document.getElementById("otpForm").style.display="block"
  
}