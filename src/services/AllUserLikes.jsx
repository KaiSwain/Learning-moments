export const AllUserLikes = (  ) => {
    return fetch("http://localhost:8080/userlikes?_expand=user&_expand=post").then((response) => 
    response.json());
}