const quotes = [
    "Your health is your wealth. Take care of it.",
    "A healthy outside starts from the inside.",
    "The greatest wealth is health.",
    "Take care of your body. It's the only place you have to live.",
    "Health is not just about what you're eating. It's also about what you're thinking and saying."
];

let currentQuoteIndex = 0;
const quoteElement = document.getElementById("quote");
const nextButton = document.getElementById("next-quote");

// Function to change the quote
function changeQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteElement.textContent = quotes[currentQuoteIndex];
}

// Change quote every 3 seconds
setInterval(changeQuote, 3000);

// Button click to change the quote
nextButton.addEventListener("click", changeQuote);
