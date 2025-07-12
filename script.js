
let recordList = JSON.parse(localStorage.getItem("recordList")) || [];
let selectedIndex = -1;

function saveToStorage() {
  localStorage.setItem("recordList", JSON.stringify(recordList));
}


function revealForm() {
  document.getElementById("studentForm").style.display = "block";
}

function clearForm() {
  document.getElementById("studentForm").reset();
  document.getElementById("studentId").value = "";
  selectedIndex = -1;
  document.getElementById("studentForm").style.display = "none";
}

function saveRecord(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;

  const newRecord = { name, email, course };

 const id= document.getElementById("studentId").value;
  if (id=== ""){
    recordList.push(newRecord);
  } else {
    recordList[parseInt(id)] = newRecord;
  }
   saveToStorage();
  clearForm();
  displayRecords();
}

function displayRecords() {
  let table = document.getElementById("studentTable");
  if (!table) {
    table = document.createElement("table");
    table.id = "studentTable";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    document.querySelector(".container").appendChild(table);
  }

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  recordList.forEach((newRecord, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${newRecord.name}</td>
      <td>${newRecord.email}</td>
      <td>${newRecord.course}</td>
      <td>
        <button onclick="editRecord(${index})">Edit</button>
        <button onclick="removeRecord(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editRecord(index) {
  const newRecord = recordList[index];
  document.getElementById("name").value = newRecord.name;
  document.getElementById("email").value  = newRecord.email;
  document.getElementById("course").value = newRecord.course;
  document.getElementById("studentId").value = index;
  selectedIndex = index;
  saveToStorage();
  revealForm();
}
function removeRecord(index) {
  recordList.splice(index, 1);
  displayRecords();
}
document.addEventListener("DOMContentLoaded",displayRecord);
