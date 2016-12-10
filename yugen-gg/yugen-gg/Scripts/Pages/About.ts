let aboutText = ko.observable<string>();

$().ready(() => {
    isBusy(true);
    return firebase.database().ref('/page-content/about/').once('value').then((result) => {
        aboutText(result.val().mainText);
        isBusy(false);
    });
});

function aboutViewModel() {

}

ko.applyBindings(new aboutViewModel());