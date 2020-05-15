import React, { Component , useState} from 'react';
import logo from './logo.svg';
import './App.css';

const App2 = () => {
  return(
    <>
     <p>Hello {this.state.name}</p>
        <input type="text" name="name" />
    </>
    )
}
class App extends Component {

  state = {
    name: ''
  }


  render() {
    return (
      <>
        <p>Hello {this.state.name}</p>
        <input type="text" name="name" />
      </>
    )
  }
}


export default App2;
