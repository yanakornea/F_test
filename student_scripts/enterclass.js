import { fetchData , fetchDataWithToken ,fetchData2 } from '/scripts/main.js'

const enterClassButton = document.querySelector('.enter-class-button')
const enterClassCode = document.querySelector('.enter-class-code')

let classCodeUrl;

enterClassButton.addEventListener('click', async () => {
    const classCode = enterClassCode.value;
    console.log(classCode)

});

// allStudentView = document.querySelector('.studnet-list-studentview')

const classCode = enterClassCode.value;
const classCode2 = 112233
console.log(classCode)

classCodeUrl = `http://127.0.0.1:8000/student/?class_name__class_code=${classCode2}`
console.log(classCodeUrl)

let studentData = await fetchData(classCodeUrl)

console.log(studentData)




let studentListHtml = '';

function displayAllStudentData(data) {

  data.forEach((element) => {
    studentListHtml += `
    <div>

        name: ${element.name}
        <button class="select-student-button" data-student-id=${element.id} data-class-name=${element.class_name}>select student</button>
  
    </div>
    `
  });

  const check_html = document.querySelector('.studnet-list-studentview');

  if (check_html) {
    document.querySelector('.studnet-list-studentview').innerHTML = studentListHtml;
   
  }  

  // 
}

displayAllStudentData(studentData);






document.querySelectorAll('.select-student-button').forEach((button) => {
    button.addEventListener('click' , () => {
        const studentId = button.dataset.studentId;
        const className = button.dataset.className;

        const url = new URL('http://127.0.0.1:5502/student_templates/studentinclass.html');

        // Create a URLSearchParams object to add parameters
        const params = new URLSearchParams();

        // Add multiple parameters
        params.append('stud_id', studentId);
        params.append('class_id', classCode2);

        // Update the URL with the modified query string
        url.search = params.toString();

        // The updated URL
        console.log(url.href); 

        window.location.href = (`http://127.0.0.1:5502/student_templates/studentinclass.html?&stu_id=${studentId}&class_code=${classCode2}&class_name=${className}`)
        // window.location.href = url.href

      console.log(studentId)
      console.log('a')
    })
  });


