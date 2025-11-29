import React from "react";

export default function MainContent() {
  return (
    <div className="main-content">
      <h1>Dashboard</h1>

      {/* Cards */}
      <div className="cards">
        <div className="card">
          <h2>1500</h2>
          <p>Traffic</p>
        </div>
        <div className="card">
          <h2>234</h2>
          <p>Sales</p>
        </div>
        <div className="card">
          <h2>465</h2>
          <p>Pageviews</p>
        </div>
        <div className="card">
          <h2>235</h2>
          <p>Visitors</p>
        </div>
      </div>

      {/* Chatbox */}
      <div className="chatbox">
        <h3>Chat</h3>
        <div className="messages">
          <div className="message"><strong>Alan:</strong> Hello</div>
          <div className="message me"><strong>Me:</strong> Hi there!</div>
        </div>
        <div className="input-box">
          <input placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
