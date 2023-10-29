import { fetchData , postData , updatePoint } from '/scripts/main.js'

const inclassUrl = new URL(window.location.href);
const classParam = inclassUrl.searchParams.get("class_mission");
let thisClassIdMission = classParam;

const classapiUrl = `http://13.239.54.233:8000/mission/?class_mission=${encodeURIComponent(thisClassIdMission)}`;  

let apiData = await fetchData(classapiUrl);

let missionListHtml = '';

function displayMissionData(data) {

  data.forEach((element) => {
    missionListHtml += `
    <div>
      mission: ${element.mission_name}
      point get: ${element.point_get}

      <button class="complete-mission" id="complete-mission-${element.id}" data-mission-id=${element.id} data-mission-point=${element.point_get} >Complete</button>
    </div>
    `
  });

  const check_html = document.querySelector('.mission-list');

  if (check_html) {
    document.querySelector('.mission-list').innerHTML = missionListHtml;
   
  }  

}

displayMissionData(apiData);


const mission_popup = document.querySelectorAll(".complete-mission") 
const mission_popup_close = document.getElementById("close-button")
const popup = document.getElementById("popup") 
const checkboxForm =document.getElementById("mission-submit-button")


let selectmission;
let selectmissionPointGet;
mission_popup.forEach((mission_popupButton) => {
  mission_popupButton.addEventListener('click' ,async  function () {
    popup.style.display = "block";


    const classapiUrl = `http://13.239.54.233:8000/student/?class_name=${encodeURIComponent(thisClassIdMission)}`;
    let studentList = await fetchData(classapiUrl);
      

    let completeMissionList ='';

    studentList.forEach((oneStudent) => {
      completeMissionList +=
      `
        <label class="checkbox-label">
            <input type="checkbox" name="${oneStudent.id}" class="checkbox" value="${oneStudent.id}"> ${oneStudent.name}
        </label>
        `
    })

    document.getElementById("form-checkbox-form").innerHTML = completeMissionList

    selectmission = mission_popupButton.dataset.missionId;
    selectmissionPointGet = mission_popupButton.dataset.missionPoint
  });
});

mission_popup_close.addEventListener('click' , function () {
    popup.style.display = "none";
})


checkboxForm.addEventListener("click", function (event) {
    const checkboxes = document.querySelectorAll('.checkbox');
    const selectedValues = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });

    console.log('Selected values:', selectedValues);

    console.log('Selected mission:',selectmission);
    console.log('Selected class:',thisClassIdMission);
    

    selectedValues.map((oneselect) => {
      console.log(oneselect)
    });

    const missionLogApi = "http://13.239.54.233:8000/missionlog/"

    selectedValues.map(oneselect => {
  
      let studentApi = `http://13.239.54.233:8000/student/${encodeURIComponent(oneselect)}/` 
      
      const logToPost =  {
        mission: selectmission,
        teacher: 1,
        classroom: thisClassIdMission,
        student: oneselect,
        status: "complete"
      };

      postData(missionLogApi,logToPost);
      updatePoint(studentApi,Number(selectmissionPointGet))
      
  });
    popup.style.display = "none";
});




// let studentApi = 'http://127.0.0.1:8000/student/1/' 

// const update = {
//   score : 20,
// };

// console.log(JSON.stringify(update))


// const updatePoint = ((api,point) => {
//   fetch(api)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(itemData => {
//       // Calculate the new quantity value
//       const currentPoint = itemData.point;
//       const updatedPoint = currentPoint + point;

//       const currentNetPoint = itemData.net_point;
//       const updatedNetPoint = currentNetPoint + point;


//       console.log(currentPoint)
//       console.log(updatedPoint)

//       console.log(currentNetPoint)
//       console.log(updatedNetPoint)
//       // Create an object with the updated data
//       const updatedData = {
//         net_point: updatedNetPoint,
//         point: updatedPoint,
        
//       };

//       // Send a PATCH request to update the item
//       return fetch(api, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Updated item:', data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// });

// updatePoint(studentApi,2000)


// เอาตัวเลขคะแนนมาใส่
// ฟังชันไม่รันซ้ำ
