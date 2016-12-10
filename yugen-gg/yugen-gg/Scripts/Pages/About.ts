let aboutText = ko.observable<string>();

$().ready(() => {
    return firebase.database().ref('/page-content/about/').once('value').then((result) => {
        aboutText(result.val().mainText);
    });
});

function aboutViewModel() {

}

ko.applyBindings(new aboutViewModel());