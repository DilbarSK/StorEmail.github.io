let form = document.getElementById("form");
let records = document.getElementById("records");
let editIndex;
let submit = document.getElementById("submit");


let dataArray = [];
let obj = JSON.parse(localStorage.getItem("data"));
if (obj !== null) {
    dataArray = obj;
}


displayData();

form.addEventListener("submit", (event) => {
    event.preventDefault();


    let time = new Date().toDateString();
    let subject = document.getElementById("input-subject").value;
    let username = document.getElementById("input-username").value;
    let email = document.getElementById("input-email").value;
    let password = document.getElementById("input-password").value;

    if (editIndex != null) {
        dataArray.splice(editIndex, 1, {
            subject,
            username,
            email,
            password,
            time
        })

    } else {
        dataArray.push({
            subject: subject,
            username: username,
            email: email,
            password: password,
            time: time
        })
    }

    submit.innerText = "Submit Data";
    saveData();




})

function saveData() {
    localStorage.setItem("data", JSON.stringify(dataArray));
    displayData();

}

function displayData() {
    let statement = "";
    dataArray.forEach((singleData, index) => {
        statement += ` <tr>
        <td scope="col">${index + 1}</td>
    <td scope="col">${singleData.subject}</td>
    <td scope="col">${singleData.username}</td>
    <td scope="col">${singleData.email}</td>
    <td scope="col">${singleData.password}</td>
    <td scope="col">${singleData.time}</td>
    <th scope="col">
        <i class="fa-solid fa-trash" onclick="deleteF(${index})" id="${"delete" +index}"></i>
        <i class="fas fa-edit" onclick="editF(${index})" id="${"edit" +index}"></i>
    </th>
    </tr>`;

    })
    records.innerHTML = statement;
}

function deleteF(index) {
    dataArray.splice(index, 1);
    saveData();
}

function editF(index) {
    editIndex = index;
    document.getElementById("input-subject").value = dataArray[index].subject;
    document.getElementById("input-username").value = dataArray[index].username;
    document.getElementById("input-email").value = dataArray[index].email;
    document.getElementById("input-password").value = dataArray[index].password;
    submit.innerText = "Save edit";
    displayData();
}

// ============================searching data======================

let searchInput = document.getElementById("search-input");
let all_tr = document.querySelectorAll("#records tr");

searchInput.addEventListener("input", (e) => {
    records.innerHTML = '';

    let searchWord = e.target.value.toLowerCase();
    console.log(searchWord)
    all_tr.forEach(tr => {
        let all_td = tr.querySelectorAll("td");

        if (all_td[1].innerText.toLowerCase().indexOf(searchWord) > -1) {
            records.appendChild(tr);
            all_td[2].classList.add("red")

        }

    })
    if (records.innerHTML == '') {
        records.innerHTML = "record are not found please try again "
    }
    
    
})

let total_records_show = document.getElementById("total-records");
total_records_show.innerText = `Total records : ${all_tr.length}`;

// ==================displayFilterData=========================
let total_records_count = all_tr.length;
let all_records = all_tr;
let page_number = 1;
let records_per_page = 10 ;
let total_pages = Math.ceil(total_records_count / records_per_page);
generat_buttons();
displayFilterData();

function displayFilterData() {
    let start_index = (page_number * records_per_page) - records_per_page;
    let end_index = (start_index + records_per_page);
    
    if(end_index >= total_records_count){
        end_index = total_records_count - 1 ; 
    }
    let statement = "";
    for (x = start_index; x < end_index; x++) {
        statement += `<tr>${all_records[x].innerHTML}</tr>`;
    }

    records.innerHTML = statement;
    document.querySelectorAll(".page-button").forEach(button =>{
        button.classList.remove("active");
    })
    document.getElementById("page"+page_number).classList.add("active");    
    
    if(page_number == 1){
        document.getElementById("prevB").classList.add("disabled") 
        }else{
            document.getElementById("prevB").classList.remove("disabled")
        } 
        if(page_number == total_pages){
            document.getElementById("nextB").classList.add("disabled")
        }else{
            document.getElementById("nextB").classList.remove("disabled")
        }
        let page_details = document.getElementById("page-details");
        page_details.innerText = `showing from ${start_index} to ${end_index} out of ${total_records_count}`;
    }
    
    
    function generat_buttons() {
        let pagination = document.getElementById("pagination");
        
        let preB = `<li class="page-item " >
        <span class="page-link"  id="prevB" onclick="prevF()">Previous</span>
        </li>`;
        
    let nextB = `<li class="page-item">
    <a class="page-link" id="nextB" onclick="nextF()">Next</a>
    </li>`;
    
    let buttons = '';
    for(x = 1 ; x <= total_pages ; x++){
        buttons+=`<li class="page-item page-button" id="page${x}"><a class="page-link" onclick="pageChange(${x})">${x}</a></li>`;
    }
    
    pagination.innerHTML = `${preB} ${buttons} ${nextB}`;
}


function prevF(){
    document.getElementById("prevB").classList.add("disabled")
    
    page_number -- ;
    displayFilterData();
}

function nextF(){
    page_number ++ ;
    displayFilterData();
}

function pageChange(index){
    page_number = parseInt(index);
    displayFilterData();
}

let select_range = document.getElementById("select-box");
select_range.addEventListener("change" , (e)=>{

    records_per_page =parseInt(select_range.value) ;
    total_pages = Math.ceil(total_records_count / records_per_page);
    generat_buttons();
    displayFilterData();

})















