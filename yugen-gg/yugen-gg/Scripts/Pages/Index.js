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
        debugger;
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
}
ko.applyBindings(new indexViewModel());
//# sourceMappingURL=Index.js.map