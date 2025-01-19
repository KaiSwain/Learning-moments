export const AllTopicsService = () => {
  return fetch(`http://localhost:8088/topics`).then((response) => 
    response.json());
};
