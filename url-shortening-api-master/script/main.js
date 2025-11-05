// JavaScript Connected
console.log('Hello, World')


// Create and define varibles from html by ID (DOM Elements)
const form = document.getElementById('mainForm');
const urlInput = document.getElementById('urlInput');
const resultDiv = document.getElementById('result');

    
// API Base URL

const baseUrl = 'https://cleanuri.com/api/v1/shorten';

// Using Axios (Async Await)

async function shortenUrl( longUrl) {

    try {
        const response = await axios.post(baseUrl, new URLSearchParams({

            url: longUrl})
        );

        const data = await response.data;

        return {
            success: true,
            data: response.data
        };
    } catch (error) {

        return {
            success: false,
            error: error
        };

     }
        
}
console.log('response.data.result_url');
// Handle Form submission
form.addEventListener('submit', async function (e) {
    
// Prevent page from loading
    e.preventDefault(); 

    //  white space (trim)
const longUrl = urlInput.value.trim();
const resultDiv = document.getElementById('result');
    
// Check if input is empty
    if (!longUrl) {
        resultDiv.textContent = 'Please add a link.';
        
        urlInput.style.border = '3px solid hsl(0, 87%, 67%)';
       
        return; 
    }

    // Can use bootstrap for this (spinner)
resultDiv.textContent = 'Shortening URL...';

console.log("sending Post request with:", longUrl);

const result = await shortenUrl (longUrl);

if (result.success) {
    resultDiv.style.color = 'green';
    resultDiv.innerHTML =
    `<p> Shorten URL: <br> ${result.data.result_url}<p>`;
 
} else {
    resultDiv.style.color = 'red';
    resultDiv.textContent = 'Try Again!';

    }
});
