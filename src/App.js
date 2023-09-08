import { useEffect, useState } from "react";

const color = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

//let newColor = changeColor();
let newColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color-quote')

function changeColor() {
  return color[Math.floor(Math.random() * color.length)]
}

function App() {
  const [quoteInfo, setQuoteInfo] = useState({})

  useEffect(() => {
    getQuote()
  }, [])

  const getQuote = () => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        let i = Math.floor(Math.random() * data.quotes.length);
        //console.log(i, data.quotes.length);
        setQuoteInfo({
          text: data.quotes[i].quote,
          author: data.quotes[i].author
        })
      })
      .then(() => {
        document.documentElement.style.setProperty('--text-color-quote', changeColor())
      })
  }

  return (
    <div className="App">
      <div id="quote-box">
        <div id="quote">
          <i className="fa-solid fa-quote-left"></i>
          <h1 className="text-center" id="text">{quoteInfo.text}</h1>
          <i className="fa-solid fa-quote-right"></i>
        </div>
        <p className="text-normal" id="author">- {quoteInfo.author}</p>
        <div className="flex" id="action-bar">
          <div className="social-icons flex text-small">
            <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + quoteInfo.author + quoteInfo.text} id="tweet-quote" target="_blank">
              <i className="fa-brands fa-square-twitter"></i>
            </a>
            <a href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + quoteInfo.author + '&content=' + quoteInfo.text + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'} id="post-quote" target="_blank">
              <i className="fa-brands fa-square-tumblr"></i>
            </a>
          </div>
          <div className="flex">
            <button className="text-small" onClick={getQuote} id="new-quote">New Quote</button>
          </div>
        </div>
      </div>
      <div className="text-center" id="reference">
        <p className="text-small">by <a href="https://github.com/andreaslohbrunner" target="_blank">andreaslohbrunner</a></p>
      </div>
    </div>
  );
}

export default App;
