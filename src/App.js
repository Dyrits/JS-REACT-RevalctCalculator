import React, {Component} from 'react';
import Button from "./components/Button";
import "./styles/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "0", // Hold the current value.
      operation: "", // Hold the current operation.
      nextIsReset: false // Next input reset the current value if "true".
    }
  }

  // Reset the calculator:
  reset = () => {
    this.setState({current: "0", operation: "", nextIsReset: false});
  }

  // Adding a number (or dot) to the current value:
  addToCurrent = (symbol) => {
    // If the current value is 0, the number added replaces it (or "0."):
    if(this.state.current === "0" || this.state.nextIsReset) {
      symbol === "." ? this.setState({current: "0.", nextIsReset: false}) : this.setState({current: symbol, nextIsReset: false});
    } 
    // If there is already a dot included in the current value, it is impossible to add a new one:
    else if (symbol === "." && this.state.current.includes(".")) { return }
    else {
      this.setState({current: this.state.current + symbol})
    }
    ;
  }

  // Adding the current value and the operator to the current operation:
  addToOperation = (symbol) => {
    let {operation} = this.state;
    operation += (this.state.current + symbol);
    this.setState({operation, nextIsReset: true})
  }

  // Replace the current value with the result:
  calculate = () => {
    let {current, operation} = this.state
    if(operation.length) {
      current = eval(String(operation + current));
      this.setState({current, operation: "", nextIsReset: true});
    }
  }

  render () {

    // Array of buttons:
    const buttons = [
      {symbol: "A/C", cols: 3, action: this.reset},
      {symbol: "/", cols: 1, action: this.addToOperation},
      {symbol: "7", cols: 1, action: this.addToCurrent},
      {symbol: "8", cols: 1, action: this.addToCurrent},
      {symbol: "9", cols: 1, action: this.addToCurrent},
      {symbol: "*", cols: 1, action: this.addToOperation},
      {symbol: "4", cols: 1, action: this.addToCurrent},
      {symbol: "5", cols: 1, action: this.addToCurrent},
      {symbol: "6", cols: 1, action: this.addToCurrent},
      {symbol: "-", cols: 1, action: this.addToOperation},
      {symbol: "1", cols: 1, action: this.addToCurrent},
      {symbol: "2", cols: 1, action: this.addToCurrent},
      {symbol: "3", cols: 1, action: this.addToCurrent},
      {symbol: "+", cols: 1, action: this.addToOperation},
      {symbol: "0", cols: 2, action: this.addToCurrent},
      {symbol: ".", cols: 1, action: this.addToCurrent},
      {symbol: "=", cols: 1, action: this.calculate}
    ];
    
    return (
      <div>
        {this.state.operation.length ? 
          <div className="operation">{this.state.operation}</div> : null
        }
        <input type="text" className="result" value={this.state.current}/>
        {buttons.map((button, index) => {
          return <Button key={index} symbol={button.symbol} cols={button.cols} action={(symbol) => button.action(symbol)} />
        })}
      
     </div>
    );

  }
}

export default App;