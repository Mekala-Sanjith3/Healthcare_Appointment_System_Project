import React, { useState } from 'react';
import './ITSupportPortal.css';

const ITSupportPortal = ({ onClose }) => {
  const [ticket, setTicket] = useState({
    category: '',
    severity: 'medium',
    title: '',
    description: '',
    attachments: [],
  });
  const [step, setStep] = useState(1);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const categories = [
    'Login Issues',
    'System Access',
    'Technical Problems',
    'Account Management',
    'Other'
  ];

  const severities = [
    { value: 'low', label: 'Low - Minor Issue' },
    { value: 'medium', label: 'Medium - Standard Issue' },
    { value: 'high', label: 'High - Urgent Issue' },
    { value: 'critical', label: 'Critical - System Down' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to create the ticket
    console.log('Submitting ticket:', ticket);
    setStep(2); // Move to chat view
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setTicket(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatMessages(prev => [...prev, {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }]);
    setMessage('');

    // Simulate IT support response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'support',
        content: 'Thank you for your message. Our IT support team will assist you shortly.',
        timestamp: new Date().toISOString()
      }]);
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={(e) => {
      // Close when clicking the overlay background
      if (e.target.className === 'modal-overlay') {
        onClose();
      }
    }}>
      <div className="it-support-portal">
        <div className="support-wrapper">
          <div className="support-left">
            <div className="welcome-content">
              <i className="fas fa-headset logo-icon"></i>
              <h1>IT Support Portal</h1>
              <p>Get technical assistance and resolve your issues quickly</p>
            </div>
            
            <div className="features">
              <div className="feature-item">
                <i className="fas fa-ticket-alt"></i>
                <span>Create Support Tickets</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-comments"></i>
                <span>Live Chat Support</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-clock"></i>
                <span>24/7 Technical Assistance</span>
              </div>
            </div>
          </div>

          <div className="support-right">
            <div className="support-box">
              <div className="support-header">
                <h2>Submit a Support Request</h2>
                <p>Step {step} of 2</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: step === 1 ? '50%' : '100%' }}></div>
                </div>
              </div>

              {step === 1 ? (
                <form onSubmit={handleSubmit} className="ticket-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-folder"></i>
                      Category
                    </label>
                    <select
                      value={ticket.category}
                      onChange={(e) => setTicket(prev => ({ ...prev, category: e.target.value }))}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <i className="fas fa-exclamation-circle"></i>
                      Severity Level
                    </label>
                    <select
                      value={ticket.severity}
                      onChange={(e) => setTicket(prev => ({ ...prev, severity: e.target.value }))}
                      required
                    >
                      {severities.map(sev => (
                        <option key={sev.value} value={sev.value}>{sev.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <i className="fas fa-heading"></i>
                      Title
                    </label>
                    <input
                      type="text"
                      value={ticket.title}
                      onChange={(e) => setTicket(prev => ({ ...prev, title: e.target.value }))}
                      required
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <i className="fas fa-align-left"></i>
                      Description
                    </label>
                    <textarea
                      value={ticket.description}
                      onChange={(e) => setTicket(prev => ({ ...prev, description: e.target.value }))}
                      required
                      placeholder="Please provide detailed information about the issue"
                      rows="4"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <i className="fas fa-paperclip"></i>
                      Attachments (Optional)
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="file-input"
                    />
                    {ticket.attachments.length > 0 && (
                      <div className="attachments-list">
                        {ticket.attachments.map((file, index) => (
                          <div key={index} className="attachment-item">
                            <i className="fas fa-file"></i>
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="submit-button">
                    <i className="fas fa-arrow-right"></i>
                    Continue to Chat
                  </button>
                </form>
              ) : (
                <div className="chat-interface">
                  <div className="chat-messages">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`message ${msg.type}`}>
                        <div className="message-content">{msg.content}</div>
                        <div className="message-timestamp">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={sendMessage} className="chat-input">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <button type="submit">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </form>
                </div>
              )}

              <div className="support-footer">
                <div className="support-options">
                  <div className="option">
                    <i className="fas fa-phone"></i>
                    <span>Emergency: 1-800-XXX-XXXX</span>
                  </div>
                  <div className="option">
                    <i className="fas fa-envelope"></i>
                    <span>support@healthcare.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default ITSupportPortal; 