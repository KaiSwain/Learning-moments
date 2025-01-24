export const AllTopicsService = () => {
  return fetch(`http://localhost:8080/topics`).then((response) => 
    response.json());
};
