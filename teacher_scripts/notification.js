import { fetchData , postData, patchData , updatePoint } from '/scripts/main.js' 

const notiUrl = new URLSearchParams(window.location.href);

console.log(notiUrl)
const classParam1 = notiUrl.get("class");

console.log(classParam1)

const missionLogApi = `http://13.239.54.233:8000/missionlog/?classroom=${classParam1}&status=pending`

let logmission = await fetchData(missionLogApi);

console.log(logmission)


// 1 get pendinglog
// 2 make accept , deny button

let pendingMissionListHtml = '';

function displayMissionData(data) {

  data.forEach((element) => {
    pendingMissionListHtml += `
    <div>
      mission: ${element.mission}
      student: ${element.student}

      <button class="accept-mission" id="log-mission-${element.id}" data-log-id=${element.id} data-log-student=${element.student} data-log-mission=${element.mission}>accept</button>
      <button class="deny-mission" id="deny-log-mission-${element.id}" data-log-id=${element.id} data-log-student=${element.student} data-log-mission=${element.mission}>deny</button>
    </div>
    `
  });

  const check_html = document.querySelector('.noti-list');

  if (check_html) {
    document.querySelector('.noti-list').innerHTML = pendingMissionListHtml;
   
  }  

}

displayMissionData(logmission);



// handle accept

const acceptButton = document.querySelectorAll(".accept-mission") 

acceptButton.forEach((oneAcceptButton) => {
    oneAcceptButton.addEventListener('click', async function() {
        // 
        const logId = oneAcceptButton.dataset.logId
        const studentLogId = oneAcceptButton.dataset.logStudent
        const MissionId = oneAcceptButton.dataset.logMission

        const missionLogApiwithId = `http://13.239.54.233:8000/missionlog/${encodeURIComponent(logId)}/`
        const missionApi = `http://13.239.54.233:8000/missionr/${encodeURIComponent(MissionId)}/`

        const studentApi = `http://13.239.54.233:8000/student/${encodeURIComponent(studentLogId)}/` 

        const missionData = await fetchData(missionApi)
        const pointGet = missionData.point_get
        const updataStatus = {status : "complete",}

        // update Status
        patchData(missionLogApiwithId,updataStatus)


        // update Score after teacher accept

        console.log(pointGet)
        await updatePoint(studentApi,Number(pointGet))

        
    })
})


// handle deny

const denyButton = document.querySelectorAll(".deny-mission") 

denyButton.forEach((oneDenyButton) => {
    oneDenyButton.addEventListener('click' , function() {

        const logId = oneDenyButton.dataset.logId
        const missionLogApiwithId = `http://13.239.54.233:8000/missionlog/${encodeURIComponent(logId)}/`
        const updataStatus = {status : "denied",}

        patchData(missionLogApiwithId,updataStatus)
    })
})

