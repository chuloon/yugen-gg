var events = ko.observable();
var eventsArray = ko.observableArray();
var mainEventData = {
    mainEventHeader: ko.observable(),
    mainEventTitle: ko.observable(),
    date: ko.observable(),
    longDescription: ko.observable(),
    locationShort: ko.observable()
};
$().ready(function () {
    return firebase.database().ref('/events/').once('value').then(function (result) {
        events(result.val());
        $.each(events(), function (index, item) {
            eventsArray.push(item);
        });
        mainEventData.mainEventHeader(eventsArray()[0].eventHeader);
        mainEventData.mainEventTitle(eventsArray()[0].name);
        mainEventData.date(eventsArray()[0].date);
        mainEventData.longDescription(eventsArray()[0].longDescription);
        mainEventData.locationShort(eventsArray()[0].locationShort);
    });
});
$("#email-textbox").alpaca({
    "options": {
        "placeholder": "email address",
        "focus": false
    }
});
$("#alpaca1").attr("data-bind", "text: $data.emailText");
function indexViewModel() {
    var self = this;
    self.emailText = ko.observable("");
    this.mailingClick = function () {
        var userId = self.emailText().replace(/[^a-zA-Z1-9 ]/g, "");
        try {
            if (self.emailText() != "" && self.emailText().match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") != null) {
                firebase.database().ref('/mailing-list/' + userId).set({
                    email: self.emailText()
                });
                self.emailText("");
                alert("You've been successfully added to our mailing list!");
            }
            else {
                alert("Invalid email. Please try again!");
            }
        }
        catch (ex) {
        }
    };
    this.eventClick = function (params) {
        mainEventData.mainEventHeader(params.eventHeader);
        mainEventData.mainEventTitle(params.name);
        mainEventData.date(params.date);
        mainEventData.longDescription(params.longDescription);
        mainEventData.locationShort(params.locationShort);
        $('.active-event').addClass('inactive-event').removeClass('active-event');
        $('#' + params.id).removeClass('inactive-event').addClass('active-event');
    };
}
ko.applyBindings(new indexViewModel());
