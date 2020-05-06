export const fetching = (url) => {
    return fetch(`https://jsonplaceholder.typicode.com/${url}`)
        .then(response => response.json());
}