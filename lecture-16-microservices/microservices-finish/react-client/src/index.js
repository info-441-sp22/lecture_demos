import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  function(){
    window.double = async function(){
      let num = document.getElementById("double_input").value
      let results = await fetch("/api/double?num=" + num)
      let resultsText = await results.text()
      document.getElementById("double_results").innerText = resultsText
    }

    window.square = async function(){
      let num = document.getElementById("square_input").value
      let results = await fetch("/api/square?num=" + num)
      let resultsText = await results.text()
      document.getElementById("square_results").innerText = resultsText
    }
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
