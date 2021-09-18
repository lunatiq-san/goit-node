const fs = require("fs/promises");
const path = require("path");

/*
 * Раскомментируй и запиши значение
 */
const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      throw new Error(`Contact with ID: ${contactId} not found`);
    }

    console.log(contact);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContactsList = contacts.filter(
      (contact) => contactId !== contact.id
    );

    console.log(newContactsList);
    return newContactsList;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    console.log("addContact -> contacts: ", contacts);
    const newContact = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    const json = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, json);

    console.log("File successfully written!");
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
