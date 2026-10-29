import React from 'react';

function Profile() {
  return (
    <div className="screen-container profile-page">
      <div className="profile-card">
        <div className="profile-avatar-lg">AR</div>
        <h2>Alex Rivera</h2>
        <p className="profile-id">Student ID: 0212-99018</p>
        <hr className="divider" />
        <div className="profile-info-grid">
          <div>
            <span>MAJOR</span>
            <p>Computer Science</p>
          </div>
          <div>
            <span>ROLE</span>
            <p>Undergraduate Student</p>
          </div>
          <div>
            <span>ACTIVE REPORTS</span>
            <p>4 Tickets</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;