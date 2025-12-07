const api = "/contacts";

async function loadContacts() {
    const res = await fetch(api);
    const contacts = await res.json();

    const list = document.getElementById("contactList");
    list.innerHTML = "";

    contacts.forEach(c => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div>
                <strong>${c.name}</strong><br>
                ${c.email}<br>
                ${c.phone}
            </div>

            <div>
                <button class="btn btn-sm btn-warning me-2" onclick="editContact('${c.id}')">✏️</button>
                <button class="btn btn-sm btn-danger" onclick="deleteContact('${c.id}')">🗑</button>
            </div>
        `;

        list.appendChild(li);
    });
}

async function createContact() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name) return alert("Введите имя!");

    await fetch(api, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, email, phone })
    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    loadContacts();
}

async function deleteContact(id) {
    await fetch(`${api}/${id}`, { method: "DELETE" });
    loadContacts();
}

async function editContact(id) {
    const newName = prompt("Новое имя:");
    if (!newName) return;

    const newEmail = prompt("Новый email:") || "";
    const newPhone = prompt("Новый телефон:") || "";

    await fetch(`${api}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: newName, email: newEmail, phone: newPhone })
    });

    loadContacts();
}

loadContacts();