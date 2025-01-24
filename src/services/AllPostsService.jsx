export const AllPostsService = () => {
    return fetch("http://localhost:8080/posts?_expand=user&_expand=topic").then((response) => 
    response.json());
    
}