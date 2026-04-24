const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const buttonBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Show New Quote
function newQuote(apiQuotes) {
  // Check if Author field is blank and replace it with 'Unknown'
  if (!apiQuotes.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = apiQuotes.author;
  }
  // Check quote length to determine styling
  if (apiQuotes.quote.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = apiQuotes.quote;
}
let apiQuotes = [];

// Get Quotes From API
const getQuotes = async () => {
  const apiUrl = "https://dummyjson.com/quotes/random";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote(apiQuotes);
  } catch (error) {
    // catch Error here
  }
};

// on Load
getQuotes();
