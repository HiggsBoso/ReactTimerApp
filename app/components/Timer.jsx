var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  handleStatusChange: function (newStatus) {
    this.setState({
      countdownStatus: newStatus
    });
  },
  handleStartButtonClick: function () {
    this.setState({
      countdownStatus: 'started'
    });
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          // start the timer
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount
      });
    }, 1000);
  },
  render: function () {
    var {count, countdownStatus} = this.state;

    var renderControlsArea = () => {
        if (countdownStatus === 'stopped') {
          return <button className="button expanded" onClick={this.handleStartButtonClick}>Start</button>;
        }
        else {
          return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
        }
    };

    return (
      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds={count}/>
        {renderControlsArea()}
      </div>
    );
  }
});

module.exports = Timer;
