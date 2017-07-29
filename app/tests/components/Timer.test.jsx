var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Timer = require('Timer');

describe('Timer', ()=> {
  it('should exist', () => {
    expect(Timer).toExist();
  });

  it('should start on started', (done)=> {
    var timer = TestUtils.renderIntoDocument(<Timer/>);
    timer.handleStatusChange('started');

    setTimeout(() => {
      expect(timer.state.count).toBe(2);
      done();
    }, 2001);
  });

  it('should pause on paused status', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer/>);
    timer.setState({count: 3});
    timer.handleStatusChange('paused');

    setTimeout(()=>{
      expect(timer.state.count).toBe(3);
      done();
    }, 2001);
  });
});
