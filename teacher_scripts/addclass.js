import { postData,postDataWithToken } from "/scripts/main.js";

const user_id = localStorage.getItem("user_id");

const token = localStorage.getItem("token");

const apiUrl = 'http://13.239.54.233:8000/classroom/';
document.addEventListener('DOMContentLoaded', function () {
    const showFormBtn = document.getElementById('showFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const popup = document.getElementById('popup');
    const form = document.getElementById('myForm');
    const resultDiv = document.getElementById('result');
  
    // Show the pop-up form when the "Show Form" button is clicked
    showFormBtn.addEventListener('click', function () {
        popup.style.display = 'block';
    });
  
    // Close the pop-up form when the "Close" button is clicked
    closeFormBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });
  
    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        // Get form data
        const formData = new FormData(form);
  
        // Convert form data to JSON object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
  
        data.teacher = user_id;
        // เอา id user
  
        console.log(data)
  
        
        postDataWithToken(apiUrl,data,token)
        // fetch(apiUrl, {
        //   method: 'POST',
        //   headers: {
        //       'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(data),
        // })
        //   .then(response => response.json())
        //   .then(responseData => {
        //       // Handle the API response
        //       resultDiv.textContent = `Data successfully posted: ${JSON.stringify(responseData)}`;
        //   })
        //   .catch(error => {
        //       console.error('Error:', error);
        //       resultDiv.textContent = 'An error occurred while posting the data.';
        //   });
        
        popup.style.display = 'none';
    });
  });
  