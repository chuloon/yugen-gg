var aboutText = ko.observable();
$().ready(function () {
    return firebase.database().ref('/page-content/about/').once('value').then(function (result) {
        aboutText(result.val().mainText);
    });
});
function aboutViewModel() {
}
ko.applyBindings(new aboutViewModel());
