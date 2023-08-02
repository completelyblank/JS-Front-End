// index.js
// Define an array of quotes
const quotes = [
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    },
    // Add more quotes here...
  ];
  
  // Get references to the HTML elements
  const textElement = document.getElementById("text");
  const authorElement = document.getElementById("author");
  const newQuoteButton = document.getElementById("new-quote");
  const tweetQuoteLink = document.getElementById("tweet-quote");
  
  // Function to display a random quote
  const displayRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    textElement.textContent = randomQuote.text;
    authorElement.textContent = `- ${randomQuote.author}`;
    
    // Set the href attribute of the "Tweet Quote" link
    tweetQuoteLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      randomQuote.text + " - " + randomQuote.author
    )}`;
  };
  
  // Event listener for the "New Quote" button
  newQuoteButton.addEventListener("click", displayRandomQuote);
  
  // Display a random quote on page load
  displayRandomQuote();
  