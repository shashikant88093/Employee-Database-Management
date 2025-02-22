(async function () {
    const data = await fetch("../json/Employee.JSON");
    const res = await data.json();

    let employees = res;
    let selectedEmployeeId = employees[0]._id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector(".employee_names_list");
    const employeeInfo = document.querySelector(".employee_single_list");
    const createEmployee = document.querySelector(".newUser");
    const popup = document.querySelector(".popup");
    const addEmployeeForm = document.querySelector(".create_form");
    popup.style.display = "none";
    createEmployee.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    // Set Employee age to be entered minimum 18 years
    const dobInput = document.querySelector(".addEmployee_create--dob");
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
        .toISOString()
        .slice(5, 10)}`;

    addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()];
        let empData = {};
        values.forEach((val) => {
            empData[val[0]] = val[1];
        });
        empData.id = crypto.randomUUID();
        empData.age =
            new Date().getFullYear() - parseInt(empData.date.slice(0, 4), 10);
        empData.imageUrl =
            empData.imageUrl || "https://img.icons8.com/color/2x/user";
        employees.push(empData);
        renderEmployees();
        addEmployeeForm.reset();
        popup.style.display = "none";
    });

    // Delete Employee Logic
    const handleDeleteEmployee = (e) => {
        if (e.target.classList.contains("employeeDelete")) {
            const employeeId = e.target.id; // Get the employee's ID to delete
            employees = employees.filter(emp => emp._id !== employeeId); // Remove from employees array

            // If the deleted employee is the selected one, select a new employee or reset
            if (selectedEmployeeId === employeeId) {
                selectedEmployeeId = employees[0]?._id || -1; // Select the first employee if available
                selectedEmployee = employees[0] || {}; // Reset to the first employee or empty object
                renderSingleEmployee();
            }

            renderEmployees(); // Re-render the employee list
        }
    };

    employeeList.addEventListener("click", handleDeleteEmployee); // Add event listener to employee list

    // Render All Employees Logic - START
    const renderEmployees = () => {
        employeeList.innerHTML = "";
        employees.forEach((emp) => {
            const employee = document.createElement("span");
            employee.classList.add("item");
            if (parseInt(selectedEmployeeId, 10) === emp._id) {
                employee.classList.add("selected");
                selectedEmployee = emp;
            }
            employee.setAttribute("id", emp._id);
            employee.innerHTML = `${emp.firstName} ${emp.lastName} <i id="${emp._id}" class="employeeDelete">❌</i>`;
            employeeList.append(employee);
        });
    };

    // Render Single Employee Logic - START
    const renderSingleEmployee = () => {
        if (selectedEmployeeId === -1) {
            employeeInfo.innerHTML = "";
            return;
        }

        employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
        </span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.phone}</span>
        <span>DOB - ${selectedEmployee.date}</span>
      `;
    };
    // Render Single Employee Logic - END

    renderEmployees();
    if (selectedEmployee) renderSingleEmployee();
})();
