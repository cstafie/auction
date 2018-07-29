import React, { Component } from 'react';

class Input extends Component {
  state = {text: ''};
  handleText = ({target}) => this.setState({text: target.value});
  handleSubmit() {
    if (this.state.text) {
      this.props.handleSubmit(this.state.text);
    }
  }

  render() {
    return (
      <div>
        {this.props.labelText}
        <input 
          name='text' 
          value={this.state.text}
          onChange={this.handleText}
          type='text' />
        <button onClick={() => this.handleSubmit()}>
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

export default Input;

