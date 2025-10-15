import React from 'react';
import WorldMap from './components/WorldMap';
import UserProfile from './components/UserProfile';
import Editor from './components/Editor';
import ImageUploader from './components/ImageUploader';

function App() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* World Map */}
      <WorldMap />
     

      
      {/* Page Content */}
         <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
        <h1>个人记录宏观信息</h1>
      </div>
      
      <div style={{ position: 'absolute', top: '100px', left: '20px', color: 'white' }}>
        <h2>个人介绍</h2>
        <UserProfile />
      </div>
      
      <div style={{ position: 'absolute', top: '300px', left: '20px', color: 'white' }}>
        <h2>宏观解读</h2>
        <Editor />
      </div>
      
      <div style={{ position: 'absolute', top: '500px', left: '20px', color: 'white' }}>
        <h2>上传图片</h2>
        <ImageUploader />
      </div>
    </div>
  );
}

export default App;
