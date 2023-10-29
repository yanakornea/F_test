document.getElementById('convertButton').addEventListener('click', function () {
    const textData = document.getElementById('textData').value;
  
    console.log(textData)
    // Split the text data into an array using new lines as separators
    const lines = textData.split('\n');
  
    console.log(lines)
    // Create an array of objects or any other structure you need
    const jsonData = lines.map(line => {
      // Split each line into an array using spaces as separators
      const lineData = line.split(' ');
      console.log(lineData)  
      // Create an object with "name" and "surname" properties
      return {
        name: lineData[0] || '',
        surname: lineData[1] || '',
      };
    });
  
    // Convert the JavaScript object or array into a JSON string
    const jsonString = JSON.stringify(jsonData, null, 2);
  
    // Display the JSON in a pre element
    document.getElementById('jsonOutput').textContent = jsonString;
  });



const openPopupButton = document.getElementById('openPopupButton');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('closePopupButton');
const saveButton = document.getElementById('saveButton');
const popupTextarea = document.getElementById('popupTextarea');
// const overlay = document.createElement('div');
// overlay.className = 'overlay';

openPopupButton.addEventListener('click', () => {
popup.style.display = 'block';
// overlay.style.display = 'block';
// document.body.appendChild(overlay);
});

closePopupButton.addEventListener('click', () => {
popup.style.display = 'none';
// overlay.style.display = 'none';
// document.body.removeChild(overlay);
});

saveButton.addEventListener('click', () => {
const text = popupTextarea.value;
// Do something with the textarea content, e.g., save it to a variable, an array, or send it to a server
console.log(text);
closePopupButton.click(); // Close the popup
});



const dataToSend = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
  ];

console.log(JSON.stringify(dataToSend))
  