document.addEventListener('DOMContentLoaded', ready);

function ready() {
  const quoteContainer = document.getElementById('quote-container'),
    quoteText = document.getElementById('quote'),
    authorText = document.getElementById('author'),
    twitterBtn = document.getElementById('twitter'),
    newQuoteBtn = document.getElementById('new-quote'),
    loader = document.getElementById('loader');
  let apiQuotes = [];

  function showLoadingSpiner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }

  function removeLoadingSpiner() {
    if (!loader.hidden) {
      quoteContainer.hidden = false;
      loader.hidden = true;
    }
  }

  // Show New Quote
  function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (quote.author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = quote.quoteAuthor;
    }
    // Dynamically reduce font size for long quotes
    if (quote.text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author;
  }

  // Get quotes from API:
  async function getQuotes() {
    showLoadingSpiner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const responce = await fetch(apiUrl);
      apiQuotes = await responce.json();
      newQuote();
      removeLoadingSpiner();
    } catch (error) {
      removeLoadingSpiner();
      twitterBtn.hidden = true;
      newQuoteBtn.hidden = true;
      quoteText.textContent = `Someting went wrong :(`;
      console.log(error.message);
    }
  }

  // Tweet Quote
  function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
  }

  // Event Listeners
  newQuoteBtn.addEventListener('click', newQuote);
  twitterBtn.addEventListener('click', tweetQuote);

  // On Load
  getQuotes();
}
