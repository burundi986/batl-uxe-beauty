fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => {
    console.log(data); // API response
  })
  .catch(error => {
    console.error("Error:", error);
  });