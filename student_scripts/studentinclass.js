import { fetchData , postData , updatePoint } from '/scripts/main.js'

const inclassUrl = new URLSearchParams(window.location.href);

console.log(inclassUrl)
const classParam1 = inclassUrl.get("stu_id");
const classParam2 = inclassUrl.get("class_code");
const classParam3 = inclassUrl.get("class_name");
// let thisClassIdMission = classParam;
console.log(classParam1)
console.log(classParam2)
console.log(classParam3)



const classapiUrl = `http://127.0.0.1:8000/mission/?class_mission=${encodeURIComponent(classParam3)}`;  

let apiData = await fetchData(classapiUrl);

let missionListHtml = '';

console.log(apiData)

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

  const check_html = document.querySelector('.student-profile');

  if (check_html) {
    document.querySelector('.student-profile').innerHTML = missionListHtml;
   
  }  

}

displayMissionData(apiData);

const missionLogApi = `http://127.0.0.1:8000/missionlog/?student=${classParam1}`
const mission_popup = document.querySelectorAll(".complete-mission") 

mission_popup.forEach((mission_popupButton) => {
    mission_popupButton.addEventListener('click' ,async  function () {
        // อัพเดตลอค
        

        let selectmission = mission_popupButton.dataset.missionId;


        const logToPost =  {
            mission: selectmission,
            teacher: 1,
            classroom: classParam3,
            student: classParam1,
            status: "pending"
          };

        console.log(logToPost)
        

        postData(missionLogApi,logToPost);
        
        // ถ้ากด คอมพลีทแล้ว แล้ว จะขึ้นว่ากดต่อไม่ได้
    }) 
});



let logmission = await fetchData(missionLogApi);


let pendingList = []
logmission.forEach(log => {
    console.log(log)
    console.log(log.mission)

    if (log.status === 'pending') {
        pendingList.push(log.mission)
    }
    console.log(pendingList)

})

pendingList.forEach(mission => {
    document.getElementById(`complete-mission-${mission}`).innerHTML = mission;
    document.getElementById(`complete-mission-${mission}`).disabled = true;
})

