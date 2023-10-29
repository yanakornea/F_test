import { fetchData , postData } from '/scripts/main.js'

document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const firstname = document.getElementById('first_name').value;
    const lastname = document.getElementById('last_name').value;

    const userData = {
        username: username,
        password: password,
        password2: password2,
        email: email,
        first_name: firstname,
        last_name: lastname,
    };

    fetch('http://13.239.54.233:8000/register2/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => {

        console.log(userData)

        console.log(response.status)

        // window.location.href = 'http://127.0.0.1:5502/teacher_templates/logintest.html'
        // if (response.status === 201) {
        //     // Registration successful, handle success
        //     // document.getElementById('message').textContent = 'Registration successful!';

        //     window.location.href = 'http://127.0.0.1:5502/teacher_templates/logintest.html'
        //     console.log('ss')
        //     // create teacher

        // } else {
        //     // Registration failed, handle error
        //     document.getElementById('message').textContent = 'Registration failed. Please try again.';
        // }
    })
    .catch( error => {
        console.log('Error:', error);
    })
});