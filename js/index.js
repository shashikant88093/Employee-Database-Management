import EmployeeList from "../json/Employee.JSON" with {type: "json"}


const EmployeeListClass = document.getElementsByClassName("employee_names_list")


const ul = document.createElement('ul')

let li
//  view the list in ui
function EmployeeListView() {
    EmployeeList?.forEach((data) => {
        li = document.createElement('li')
        li.id = data._id
        li.innerText = data?.name
        li.className = "item"

        ul.appendChild(li)

    })
    EmployeeListClass[0].appendChild(ul)

}
EmployeeListView()

// add function li get _id
function singleDataOperation() {
    let single = document.querySelectorAll('.item')
    single.forEach(item => {
        item.addEventListener('click', (e) => {
            singleDataView(e.target.id)


        })
    })
}

singleDataOperation()

//  view single data 
function singleDataView(id) {
    // console.log(id, "view single")
    const single_list = document.getElementsByClassName('employee_single_list');
    
    EmployeeList.map((data) => {
        if (data._id === id) {
            console.log(data);
            single_list[0].innerHTML = `
            <div>
              <img src="${data.imageUrl}" alt="${data.imageUrl}"/>
              <h3>${data.name}</h3>
              <p>${data.address}</p>
              <p>${data.email}</p>
              <p>${data.phone}</p>
              <p>${data.date}</p>
            </div>
            `;
        }
    });
}



// open popup onclick
const popup = document.getElementById("newUser")
const showPop = document.querySelector(".popup")
popup.addEventListener('click',(e)=>{
    console.log("I am click")
    showPop.style.display = "block"
})

// add button

const add = document.getElementById("Add")

add.addEventListener('click',(e)=>{
    showPop.style.display = "none"

})


// 
