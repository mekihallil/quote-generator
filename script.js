const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitterid");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}
// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote(apiQuotes) {
  // Check if Author field is blank and replace it with 'Unknown'
  !apiQuotes.author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = apiQuotes.author);

  // Check quote length to determine styling
  apiQuotes.quote.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = apiQuotes.quote;
}
let apiQuotes = [];

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = `https://dummyjson.com/quotes/random`;
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote(apiQuotes);
  } catch (error) {
    // catch Error here
    console.log("Whoops, no quote", error);
  }
  complete();
}
// Tweet Quote
const tweetQuote = async () => {
  const twitterUrl =
    await `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);
// on Load
getQuotes();
