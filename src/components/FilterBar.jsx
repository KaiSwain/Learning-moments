export const FilterBar = ({ topics, handleTopicChange, selectedTopicId }) => {
  return (
    <>
      <div className="filter-bar">
        <select onChange={handleTopicChange}
        value={ selectedTopicId }
        >
            <option value="0">All Topics</option>
          {topics?.map((topic) => {
            return (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
