iimport React, { useState, useEffect } from 'react';

function UserProfile({ isAuthenticated }) {
  const [intro, setIntro] = useState('作者希望在这里记录对全球宏观变动的观察');

  // 如果是已登录状态，允许编辑
  const handleChange = (e) => {
    if (isAuthenticated) {
      setIntro(e.target.value);
    }
  };

  return (
    <div>
      <h3>个人介绍</h3>
      {isAuthenticated ? (
        <textarea
          value={intro}
          onChange={handleChange}
          rows="4"
          cols="50"
          style={{ width: '300px' }}
        />
      ) : (
        <p>{intro}</p>
      )}
      {!isAuthenticated && (
        <p style={{ color: 'red' }}>请登录以编辑个人介绍。</p>
      )}
    </div>
  );
}

export default UserProfile;
