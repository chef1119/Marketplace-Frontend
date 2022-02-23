import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  componentDidMount() {
    this.getTimeUntil(this.props.deadline);
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }
  leading0(num) {
    return num < 10 ? "0" + num : num;
  }
  async getTimeUntil(deadline) {
    let utcCurrent  = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
    const time = Date.parse(deadline) - Date.parse(utcCurrent);
    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }

  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
  }
  render() {
    const isEnded = !this.state.days && !this.state.hours && !this.state.minutes && !this.state.seconds;
    return (
      <div>
        {/* <span>{new Date().getTime}</span> */}
        { isEnded ? (
          <span>Auction Ended</span>
        ) : (
          <>
            <div className="Clock-days">{this.leading0(this.state.days)}d</div>
            <div className="Clock-hours">
              {this.leading0(this.state.hours)}h
            </div>
            <div className="Clock-minutes">
              {this.leading0(this.state.minutes)}m
            </div>
            <div className="Clock-seconds">
              {this.leading0(this.state.seconds)}s
            </div>
              (UTC)
          </>
        )}
        
      </div>
    );
  }
}
export default Clock;
