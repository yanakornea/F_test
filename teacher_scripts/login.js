// import { fetchData } from "./main";

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Use JavaScript (e.g., Fetch API or Axios) to send a POST request to the login API endpoint.
    
    fetch('http://13.239.54.233:8000/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        
        console.log(data)
        if (data.token) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);

            window.location.href = 'http://127.0.0.1:5502/teacher_templates/allclass.html'

            // Redirect the user to the desired page.
        } else {
            // document.getElementById('message').textContent = data.error;
            console.log('b')

        }
    });

});

// const fetchUserData = async (token) => {
//     try {
//         console.log(token)
//         const response = await fetch(`http://127.0.0.1:8000/classroom/`, {
//         headers: {
//           "Authorization": `Token ${token}`, // Include the token in the request headers
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // document.getElementById("user-data").textContent = JSON.stringify(data, null, 2);
//         console.log(JSON.stringify(data, null, 2));
//       } else {
//         console.error("Failed to fetch user data");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
// };

// fetchUserData('5ed3e778ed88f76966ce0078320212c3d20fc9d4');


