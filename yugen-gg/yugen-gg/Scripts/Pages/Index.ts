(<any>$("#email-textbox")).alpaca({
    "options": {
        "placeholder": "email address",
        "focus": false
    }
});

$("#alpaca1").attr("data-bind", "text: $data.emailText");

function indexViewModel() {
    let self = this;
    declare var firebase: any;

    self.emailText = ko.observable<string>("");

    this.mailingClick = () => {
        let userId = self.emailText().replace(/[^a-zA-Z1-9 ]/g, "");
         
        try {
            if (self.emailText() != "") {
                firebase.database().ref('/mailing-list/' + userId).set({
                    email: self.emailText()
                });

                self.emailText("");
                alert("You've been successfully added to our mailing list!");
            }
        }
        catch (ex) {
        }
    }    

}

ko.applyBindings(new indexViewModel());