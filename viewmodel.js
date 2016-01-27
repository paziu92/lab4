var initialData = [
    { firstName: "Jan", lastName: "Kowalski", phones: [
        { type: "Mobile", number: "(555) 123-4567" },
        { type: "Home", number: "(555) 123-7890"}]
    },
    { firstName: "Janusz", lastName: "Nowak", phones: [
        { type: "Mobile", number: "(555) 123-2222" },
        { type: "Home", number: "(555) 123-3333"}]
    }
];
 
var ContactsModel = function(contacts) {
    var self = this;
    self.contacts = ko.observableArray(ko.utils.arrayMap(contacts, function(contact) {
        return { firstName: contact.firstName, lastName: contact.lastName, phones: ko.observableArray(contact.phones) };
    }));
 
    self.addContact = function() {
        self.contacts.push({
            firstName: "",
            lastName: "",
            phones: ko.observableArray()
        });
    };
 
    self.removeContact = function(contact) {
        self.contacts.remove(contact);
    };
 
    self.addPhone = function(contact) {
        contact.phones.push({
            type: "",
            number: ""
        });
    };
 
    self.removePhone = function(phone) {
        $.each(self.contacts(), function() { this.phones.remove(phone) })
    };
 
    self.save = function() {
        self.lastSavedJson(JSON.stringify(ko.toJS(self.contacts), null, 2));
    };
 
    self.lastSavedJson = ko.observable("")
};
 
ko.applyBindings(new ContactsModel(initialData));