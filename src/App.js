import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";

const PostStore = createContext();

const PostList = () => {
  const data = useContext(PostStore);
  // console.log(data);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => data.setPostList(json));
  }, []);
  return (
    <div>
      <h4>PostList</h4>
      <ul>
        {data.postList &&
          data.postList.map((post) => (
            <li key={post.id} onClick={() => data.setSelectedId(post.id)}>
              {post.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

const PostDetail = () => {
  const data = useContext(PostStore);
  useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts/" + data.selectedId)
        .then((response) => response.json())
        .then((json) => data.setPostDetail(json));
  }, [data.selectedId]);
  if (data.selectedId === null) return <div>Select a post to see detail</div>;
  return (
    <div>
      <h4>PostDetail</h4>
      <div>{data.postDetail.body}</div>
    </div>
  );
};

function App() {
  const [postList, setPostList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [postDetail, setPostDetail] = useState(null);
  return (
    <div className="App">
      <PostStore.Provider
        value={{
          postList,
          setPostList,
          selectedId,
          setSelectedId,
          postDetail,
          setPostDetail,
        }}
      >
        <PostList />
        <PostDetail />
      </PostStore.Provider>
    </div>
  );
}

export default App;
