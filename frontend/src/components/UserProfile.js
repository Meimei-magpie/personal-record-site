import React, { useState } from 'react';

function UserProfile() {
  const [intro, setIntro] = useState('这是我的个人介绍。');

  const handleChange = (e) => {
    setIntro(e.target.value);
  };

  return (
    <div>
      <textarea
        value={intro}
        onChange={handleChange}
        rows="4"
        cols="50"
        style={{ width: '300px' }}
      />
    </div>
  );
}

export default UserProfile;