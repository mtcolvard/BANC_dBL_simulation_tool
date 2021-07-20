import React from 'react';
import { render } from 'react-dom';
import NameForm from './NameForm.js';

import {
  RAudioContext,
  RCycle,
  RDelay,
  RExtensible,
  RGain,
  RMediaElementSource,
  RPipeline,
  RSplit
} from '../index.js';


class DelayLine extends RExtensible {
  renderGraph() {
    return (
      <RCycle>
        <RPipeline>
          <RGain gain={this.props.gain}/>
        </RPipeline>
      </RCycle>
    );
  }
}

const example = location.hash.slice(1);
const audioExamples = {'White Noise': '/assets/audio/whiteNoise3.wav'};

const onExampleChange = e => {
  location.hash = e.target.value;
  location.reload();
};

export default class CustomNodeExample extends React.Component {
  constructor(props) {
    super(props);
    this.audio = new Audio('/assets/audio/whiteNoise3.wav');
    this.audio.autoplay = true;
    this.audio.loop = true;
    this.state = {
      value: '0',
      transmissionLoss: '0',
      gainValue: '2',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  calculateTransmissionLoss(event) {
    const adjustedGainValue = (2- Math.fround(Math.pow(10, event / 20)));
    this.setState({gainValue: adjustedGainValue});
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    // this.setState({
    //   value: event.target.value,
    // });
    this.calculateTransmissionLoss(event);
    event.preventDefault();
  }

  render() {
    return (
      <RAudioContext debug={true}>
        <article>
          <h1><strong>Transmission Loss Simulator</strong></h1>
          <h2>Lee Brenner, Bay Area Noise Control</h2>
        </article>

        <label htmlFor="example-select">Select an example: </label>
        <select id="example-select" onChange={onExampleChange} value={example}>
          <option value="" disabled>Choose an example</option>
          {
            Object.keys(audioExamples).map((ex, ei) => <option key={ei} value={ex}>{ex}</option>)
          }
        </select>

        <form onSubmit={this.handleSubmit}>
          <label>
            Transmission Loss (dB):<span> </span>
            <input type="number" id="dbl" className="control-dbl" data-action="dbl" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <RPipeline>
          <RMediaElementSource element={this.audio} />
          <RGain gain={(Math.pow(10, (this.state.value / 20))).toFixed(2)} />
        </RPipeline>
      </RAudioContext>
    );
  }
}
