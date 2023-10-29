import { fetchDataWithToken } from '/scripts/main.js'

// ต้องแก้เป็นเวลาลอคอิน

const apiUrl = `http://13.239.54.233:8000/classroom/`

// let apiData = await fetchData(apiUrl);
const token = localStorage.getItem("token");

console.log(token)
let apiData = await fetchDataWithToken(apiUrl,token);


// Function to display the fetched data on the web page

let classListHtml = '';

function displayData(data) {

  data.forEach((element) => {
    classListHtml += `
    <div>
      class_name: ${element.class_name}
      teacher: ${element.teacher}
      <button class="load-item-button" data-class-id=${element.id} >Enter class</button>
  
    </div>
    `
  });

  const check_html = document.querySelector('.testy_data');

  if (check_html) {
    document.querySelector('.testy_data').innerHTML = classListHtml;
   
  }  

  // 
}

displayData(apiData);



function classroomUrl(classroom) {
  const baseUrl = 'http://127.0.0.1:5500/teacher_templates/classroom.html';

  const params = new URLSearchParams();
  params.append('class', classroom);

  // Create the URL
  const url = new URL(baseUrl);
  url.search = params.toString();

  return url.toString();
};



document.querySelectorAll('.load-item-button').forEach((button) => {
    button.addEventListener('click' , () => {
      const classId = button.dataset.classId;

      window.location.href = classroomUrl(classId)
    })
  });






