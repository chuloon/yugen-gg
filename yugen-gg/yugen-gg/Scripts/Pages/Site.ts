//global params
let eventsArray = ko.observableArray<any>();
let events = ko.observable();

let registrations = ko.observable<any>();
let loggedInUser = ko.observable<any>();

function getUrlParams() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

let isBusy = ko.observable<boolean>(false);