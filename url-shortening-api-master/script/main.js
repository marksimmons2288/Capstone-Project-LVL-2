// JavaScript Connected
console.log('Hello, World')


// DOM Elements
const form = document.getElementById('mainForm');
const urlInput = document.getElementById('urlInput');
const resultMessage = document.getElementById('result-message');

// URL Validation Function w/ built in Constructor(new URL) w/ str parameter.
function isValidUrl(str) {
    try{
        new URL(str);
        return true;
    } catch {
        return false;
    }
  }

  // API Base URL
const baseUrl = 'https://cleanuri.com/api/v1/shorten';

 // Shorten URL Function---- Using Axios (Async Await)
async function shortenUrl( longUrl) {
  try {
    console.log('Sending URL to API:' , longUrl);
    
    const response = await axios.post(
        baseUrl, 
        new URLSearchParams({url: longUrl})
     );

     console.log('API Response:', response.data)
        const data = await response.data;

        return {
         success: true,
         data: response.data
     };
    
    } catch (error) {
      console.error('API Error:', error);
    //   Get Status code
    let statusCode = error.response ? error.response.status : null;
    let statusText = error.response ? error.response.statusText : error.message;
      return {
        success: false,
        error: error,
        statusCode: statusCode,
        statusText: statusText
     };
   }
 }

//  Reset input & message when user types
urlInput.addEventListener('input' , () => {
    urlInput.style.border = '2px solid hsl(0, 0%, 80%)';
    urlInput.classList.remove('error');
    resultMessage.textContent = '';
    resultMessage.style.color = '';
    console.log('User is typing...');
});
   
// Boolean,Valid,Success,
// Handle Form submission (const form = mainFormId)
// 1st parameter submit = button type
form.addEventListener('submit', async function (e) {
    
// Stop Page Reload (2nd parameter in ())
e.preventDefault(); 

// When naming varibles what is the goal? const = emptyInput
//  white space (trim)
const longUrl = urlInput.value.trim();

// Check if input is empty (if !longUrl)
    if (!longUrl) {
         resultMessage.textContent = 'Please add a link.';
         urlInput.classList.add('error');
         urlInput.style.border = '3px solid hsl(0, 87%, 67%)';
         return;
      }else {
        urlInput.classList.remove('error');
      }   

          
// Conditional for not valid URL syntax
    if (!isValidUrl(longUrl)) {
    
// Message to validate URL syntax
        resultMessage.textContent = "Invalid URL, e.g. https://www.example.com";
        resultMessage.style.color = 'hsl(0, 87%, 67%)';
        urlInput.style.border = '3px solid hsl(0, 87%, 67%)';return; 
    }
console.log(isValidUrl(longUrl));

// Valid URL (Reset styles)
urlInput.style.border = '2px solid hsl(0, 0%, 80%)';
resultMessage.style.color = '';
// Can use bootstrap for this (loading spinner will translate message)
resultMessage.textContent = 'Shortening URL...';

// Check point (wrap in backtics and varibles?)
console.log("Post request:", longUrl);

// Shorten URL
const result = await shortenUrl (longUrl);

if  (result.success) {
    console.log('URL shortened successfully');
    resultMessage.style.color = 'green';
    resultMessage.innerHTML =
    `<p> Shorten URL: <br> ${result.data.result_url}<p>`;
    }else { 
    console.log('Failed to shorten URL');
    resultMessage.style.color = 'hsl(0, 87%, 67%)';
    resultMessage.textContent = ` Error Code Status: ${result.statusCode}`;
    }
  });
