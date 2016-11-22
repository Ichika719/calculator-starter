import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: '=',
      pending: 0,
      number: 0,
      reset: false,
    };
    this.addDigit = this.addDigit.bind(this);
    this.setOperator = this.setOperator.bind(this);
  }

  setOperator(operator) {
    return () => {
      if (this.state.reset) {
        this.setState({
          operator: operator,
        });
      } else {
        if (this.state.operator === '=') {
          if (operator !== '=') {
            this.setState({
              pending: this.state.number,
              operator: operator,
              reset: true,
            });
          }
        } else {
          let result = 0;
          const {pending, number} = this.state;
          if (this.state.operator === '+') { result = pending + number; }
          else if (this.state.operator === '-') { result = pending - number; }
          else if (this.state.operator === '*') { result = pending * number; }
          else if (this.state.operator === '/') { result = pending / number; }
          this.setState({
            pending: result,
            number: result,
            operator: operator,
            reset: true,
          });
        }
      }
    };
  }

  addDigit(digit) {
    return () => {
      const next = this.state.reset ? digit : this.state.number * 10 + digit;
      this.setState({
        number: next,
        reset: false,
      });
    };
  }

  resetState() {
    this.setState({
      operator: '=',
      pending: 0,
      number: 0,
      reset: false,
    });
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.number}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperator('/')}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.addDigit(7)}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.addDigit(8)}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.addDigit(9)}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperator('*')}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.addDigit(4)}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.addDigit(5)}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.addDigit(6)}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperator('-')}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.addDigit(1)}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.addDigit(2)}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.addDigit(3)}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperator('+')}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.addDigit(0)}>0</CalcButton>
            <CalcButton className="calc-number" onClick={this.addDigit(9)}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperator('=')}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
