
console.log('Hello from about page');
console.log('API URL:', process.env.API_BASE_URL);
const baseURL = process.env.API_BASE_URL;
fetch(baseURL+"/api/user").then(res => {
  console.log(res.data);
});