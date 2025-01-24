import "./Home.css";
import { useEffect, useState } from "react";
import { AllPostsService } from "../services/AllPostsService";
import { AllUserLikes } from "../services/AllUserLikes";
import { PostLikes } from "./LikeCount.jsx";
import { AllTopicsService } from "../services/AllTopicsService.jsx";
import { FilterBar } from "./FilterBar.jsx";

import { SearchBar } from "./SearchBar.jsx";

export const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  // allPosts are all my posts in the database
  const [allUserLikes, setAllUserLikes] = useState([]);
  
  const [topics, setTopics] = useState([]);
  const [filteredPostsByTopic, setFilteredPostsByTopic] = useState([]);
  const [topicId, setTopicId] = useState("0");
  const [searchTerm, setSearchTerm] = useState("");

  const renderAllTopics = () => {
    AllTopicsService().then((data) => {
      setTopics(data);
    });
  };

  const renderAllLikes = () => {
    AllUserLikes().then((data) => {
      setAllUserLikes(data);
    });
  };

  const renderAllPosts = () => {
    AllPostsService().then((data) => {
      setAllPosts(data);
      setFilteredPostsByTopic(data);
    });
  };

  const handleTopicChange = (event) => {
    const topicId = event.target.value;
    setTopicId(topicId);
    if (topicId === "0") {
      setFilteredPostsByTopic(allPosts);
    } else {
      const filteredPosts = allPosts.filter(
        (post) => post.topicId === parseInt(topicId)
      );
      setFilteredPostsByTopic(filteredPosts);
    }
  };

  useEffect(() => {
    renderAllTopics();
    renderAllLikes();
    renderAllPosts();
    console.log("useEffect");
  }, []);

  useEffect(() => {
    const filteredPosts = filteredPostsByTopic.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPostsByTopic(filteredPosts);
    
  }, [allPosts, searchTerm]);



  return (
    <>
        <SearchBar setSearchTerm={setSearchTerm} />
      <FilterBar
        topics={topics}
        handleTopicChange={handleTopicChange}
        selectedTopicId={topicId}
      />
      <div className="all-posts">
        <ul>
          {filteredPostsByTopic.map((post) => {
            return (
              <li key={post.id}>
                <div className="each-post">
                  <h2 className="each-post-title">{post.title}</h2>
                  <div className="each-post-author-topic">
                    <p className="each-post-topic">{post.topic.name}</p>
                    <div>
                      <p className="each-post-author">{post.user.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="each-post-body">{post.body}...</p>
                  </div>
                  <div>
                    <PostLikes postObj={post} allUserLikes={allUserLikes} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
