import React, { useState } from 'react';

function UserProfile() {
  const [intro, setIntro] = useState('作者希望记录对全球宏观的观察');

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