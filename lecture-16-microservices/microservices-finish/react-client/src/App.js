import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div dangerouslySetInnerHTML={{__html: `
        <h1>Demo microservices</h1>
        <h2>Double a number</h2>
        <input typ="number" id="double_input" />
        <button onclick="double()">Double!</button>
        <div id="double_results"></div>
      
        <h2>Square a number</h2>
        <input typ="number" id="square_input" />
        <button onclick="square()">Square!</button>
        <div id="square_results"></div>
        `}}></div>
      </header>
    </div>
  );
}

export default App;
