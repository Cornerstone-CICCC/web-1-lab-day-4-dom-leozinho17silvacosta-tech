const form = document.querySelector('form');
const employeeList = document.getElementById('employeeList');
const photoInput = document.querySelector('input[name="photo"]');

const canadaEmail = /^[\w\.-]+@canada\.ca$/;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const hireDate = document.getElementById('hire_date').value;
    const photoFile = photoInput.files[0];

    if (!firstName || !lastName || !email || !hireDate || !photoFile) { 
        alert('Please, fill in all fields, including the photo!');
        return;
    }

    if (!canadaEmail.test(email)) {
        alert('Error: The input field only accepts `@canada.ca`');
        document.getElementById('email').focus();
        return;
    }

    const newEmployee = {
        firstName,
        lastName,
        email,
        hireDate,
        photoFile
    };

    addEmployeeOnTable(newEmployee);

    form.reset();
});

function addEmployeeOnTable(newEmployee) {
    const newRow = document.createElement('tr');

    const dataFields = [
        newEmployee.firstName,
        newEmployee.lastName,
        newEmployee.email,
        newEmployee.hireDate
    ];

    const photoCell = document.createElement('td');
    
    if (newEmployee.photoFile) {
        const photoURL = URL.createObjectURL(newEmployee.photoFile);
        const img = document.createElement('img');
        img.src = photoURL;
        img.alt = "Profile Photo";
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        photoCell.appendChild(img);
    }
    
    newRow.appendChild(photoCell);

    dataFields.forEach(field => {
        const cell = document.createElement('td');
        cell.textContent = field;
        newRow.appendChild(cell);
    });

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function() {
        const isConfirmed = confirm('Are you sure you want to delete this employee?');
        if (isConfirmed) {
            this.closest('tr').remove();
        }
    });

    actionsCell.appendChild(deleteButton);
    newRow.appendChild(actionsCell);

    employeeList.appendChild(newRow);
}