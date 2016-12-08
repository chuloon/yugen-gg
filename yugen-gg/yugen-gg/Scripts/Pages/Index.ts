declare var firebase: any;
let events = ko.observable();
let eventsArray = ko.observableArray();

let mainEventData = {
    mainEventHeader: ko.observable<string>(),
    mainEventTitle: ko.observable<string>(),
    date: ko.observable<string>(),
    longDescription: ko.observable<string>()
};


$().ready(() => {
    return firebase.database().ref('/events/').once('value').then((result) => {
        events(result.val());
        $.each(events(), (index, item) => {
            eventsArray.push(item);
        })

        mainEventData.mainEventHeader((<any>eventsArray()[0]).eventHeader);
        mainEventData.mainEventTitle((<any>eventsArray()[0]).name);
        mainEventData.date((<any>eventsArray()[0]).date);
        mainEventData.longDescription((<any>eventsArray()[0]).longDescription);
    });
});

(<any>$("#email-textbox")).alpaca({
    "options": {
        "placeholder": "email address",
        "focus": false
    }
});

$("#alpaca1").attr("data-bind", "text: $data.emailText");

function indexViewModel() {
    let self = this;

    self.emailText = ko.observable<string>("");

    this.mailingClick = () => {
        let userId = self.emailText().replace(/[^a-zA-Z1-9 ]/g, "");
        try {
            if (self.emailText() != "" && self.emailText().match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") != null) {
                firebase.database().ref('/mailing-list/' + userId).set({
                    email: self.emailText()
                });

                self.emailText("");
                alert("You've been successfully added to our mailing list!");
            }
            else {
                alert("Invalid email. Please try again!")
            }
        }
        catch (ex) {
        }
    }

    this.eventClick = (params: any) => {
        mainEventData.mainEventHeader(params.eventHeader);
        mainEventData.mainEventTitle(params.name);
        mainEventData.date(params.date);
        mainEventData.longDescription(params.longDescription);

        $('.active-event').addClass('inactive-event').removeClass('active-event');
        $('#' + params.id).removeClass('inactive-event').addClass('active-event');
    }

}

ko.applyBindings(new indexViewModel());