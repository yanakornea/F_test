import { fetchData , postData } from '/scripts/main.js'

const inclassUrl = new URL(window.location.href);
const classParam = inclassUrl.searchParams.get("class");
let thisClassId = classParam;


const classapiUrl = `http://13.239.54.233:8000/student/?class_name=${encodeURIComponent(thisClassId)}`;  

let apiData = await fetchData(classapiUrl);

let studentListHtml = '';

function displayStudentData(data) {

  data.forEach((element) => {
    studentListHtml += `
    <div>
      name: ${element.name}
      point: ${element.point}
    </div>
    `
  });

  const check_html = document.querySelector('.student-list');

  if (check_html) {
    document.querySelector('.student-list').innerHTML = studentListHtml;
   
  }  

  // 
}

displayStudentData(apiData);



const openPopupButton = document.getElementById('openPopupButton');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('closePopupButton');
const saveButton = document.getElementById('saveButton');
const popupTextarea = document.getElementById('popupTextarea');
// const overlay = document.createElement('div');
// overlay.className = 'overlay';

openPopupButton.addEventListener('click', () => {
    popup.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

saveButton.addEventListener('click', () => {
    const textData = popupTextarea.value;
    const lines = textData.split('\n');
    const jsonData = lines.map(line => {
    
        // Split each line into an array using spaces as separators
        // const lineData = line.split(' ');
        // return {
        //     name: lineData[0] || '',
        //     surname: lineData[1] || '',
        // }
        // Create an object with "name" and "surname" properties
        return {
            name: line,
            net_point: 0,
            point: 0,
            class_name: thisClassId,
        };
    });

    // Convert the JavaScript object or array into a JSON string
    // const jsonString = JSON.stringify(jsonData, null, 2);
    // Display the JSON in a pre element
    
    console.log(jsonData)
    
    let studentApi = 'http://13.239.54.233:8000/student/';
    
    jsonData.forEach(onedata => {
        postData(studentApi,onedata);
        console.log(onedata)
    });
    
    
    closePopupButton.click(); // Close the popup
});


// mission

function classMissionUrl(classroom) {
    const baseUrl = 'http://127.0.0.1:5502/teacher_templates/missionpage.html';
  
    const params = new URLSearchParams();
    params.append('class_mission', classroom);
  
    // Create the URL
    const url = new URL(baseUrl);
    url.search = params.toString();
  
    return url.toString();
  };



document.querySelector('.mission-button').addEventListener('click' , () => {
    window.location.href = classMissionUrl(thisClassId)
})

document.querySelector('.noti-button').addEventListener('click' , () => {
  window.location.href = `http://127.0.0.1:5502/teacher_templates/notification.html?&class=${thisClassId}`
})



