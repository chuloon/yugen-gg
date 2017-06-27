$().ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "/admin";
        }
    });
    isBusy(false);
});
var loginObject = {
    userName: ko.observable("").extend({ email: true }),
    password: ko.observable("")
};
function loginViewModel() {
    this.submitClick = function () {
        isBusy(true);
        var loginPromise = firebase.auth().signInWithEmailAndPassword(loginObject.userName(), loginObject.password());
        loginPromise
            .then(function (result) {
            window.location.href = "/admin/index";
            isBusy(false);
        })
            .catch(function (e) {
            alert(e);
            isBusy(false);
        });
    };
}
ko.applyBindings(new loginViewModel);
//# sourceMappingURL=Login.js.map