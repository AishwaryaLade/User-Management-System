
const API_URL = "http://localhost:8081/api/users";

// HTML elements
const userForm = document.getElementById("userForm");
const userId = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const tableBody = document.getElementById("userTableBody");
const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const message = document.getElementById("message");

// Display message
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

// Get all users
async function getAllUsers() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch users");
        }

        const users = await response.json();

        tableBody.innerHTML = "";

        if (users.length === 0) {
            tableBody.innerHTML =
                "<tr><td colspan='5'>No users found</td></tr>";
            return;
        }

        users.forEach(function(user) {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = user.id;

            const nameCell = document.createElement("td");
            nameCell.textContent = user.name;

            const emailCell = document.createElement("td");
            emailCell.textContent = user.email;

            const phoneCell = document.createElement("td");
            phoneCell.textContent = user.phone;

            const actionCell = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-btn";
            editButton.addEventListener("click", function() {
                editUser(user);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";
            deleteButton.addEventListener("click", function() {
                deleteUser(user.id);
            });

            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(phoneCell);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });

    } catch (error) {
        showMessage(error.message, "red");
    }
}

// Add or Update User
userForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };

    try {
        let response;

        if (userId.value === "") {
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
        } else {
            response = await fetch(API_URL + "/" + userId.value, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
        }

        if (!response.ok) {
            throw new Error("Unable to save user");
        }

        if (userId.value === "") {
            showMessage("User added successfully!", "green");
        } else {
            showMessage("User updated successfully!", "green");
        }

        resetForm();
        getAllUsers();

    } catch (error) {
        showMessage(error.message, "red");
    }
});

// Edit User
function editUser(user) {
    userId.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    phoneInput.value = user.phone;

    formTitle.textContent = "Update User";
    submitButton.textContent = "Update User";
    cancelButton.style.display = "inline-block";

    window.scrollTo(0, 0);
}

// Delete User
async function deleteUser(id) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete user");
        }

        showMessage("User deleted successfully!", "green");

        getAllUsers();

    } catch (error) {
        showMessage(error.message, "red");
    }
}

// Reset Form
function resetForm() {
    userForm.reset();
    userId.value = "";

    formTitle.textContent = "Add New User";
    submitButton.textContent = "Add User";
    cancelButton.style.display = "none";
}

// Cancel Update
cancelButton.addEventListener("click", function() {
    resetForm();
});

// Load users when page opens
getAllUsers();

