const fs = require("fs");
const path = require("path");

/*
 * Раскомментируй и запиши значение
 */
const contactsPath = path.dirname("./db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile("./db/contacts.json", "utf8", (error, data) => {
    if (error) throw error;

    console.log(data);
  });
}

function getContactById(contactId) {
  fs.readFile("./db/contacts.json", "utf8", (error, data) => {
    if (error) throw error;

    try {
      const parsedContacts = JSON.parse(data);
      console.log(parsedContacts.find((contact) => contactId === contact.id));
    } catch (error) {
      console.log("Error parsing JSON", error);
    }
  });
}

function removeContact(contactId) {
  fs.readFile("./db/contacts.json", "utf8", (error, data) => {
    if (error) throw error;

    try {
      const parsedContacts = JSON.parse(data);
      console.log(parsedContacts.filter((contact) => contactId !== contact.id));
    } catch (error) {
      console.log("Error parging JSON", error);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile("./db/contacts.json", "utf8", (error, data) => {
    if (error) throw error;
    const parsedContacts = JSON.parse(data);
    const newContact = {
      id: parsedContacts[parsedContacts.length - 1].id + 1,
      name,
      email,
      phone,
    };

    parsedContacts.push(newContact);

    const json = JSON.stringify(parsedContacts, null, 2);
    fs.writeFile("./db/contacts.json", json, "utf8", (error) => {
      if (error) throw error;
      console.log("File successfully written!");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
