//global params
var eventsArray = ko.observableArray();
var events = ko.observable();
var registrations = ko.observable();
var loggedInUser = ko.observable();
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
var isBusy = ko.observable(false);
//# sourceMappingURL=Site.js.map