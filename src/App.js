import React, { createContext, useContext, useState } from "react";
import "./App.css";

const PostStore = React.createContext();

const PostList = () => {
  const data = useContext(PostStore);
  console.log(data);
  return <div onClick={()=>data.setText('aviral')}>PostList</div>;
};

const PostDetail = () => {
  return <div>PostDetail</div>;
};

function App() {
  const [text, setText] = useState('default');
  return (
    <div className="App">
      <PostStore.Provider value={{ text, setText }}>
        <PostList />
      </PostStore.Provider>
      <PostDetail />
    </div>
  );
}

export default App;
