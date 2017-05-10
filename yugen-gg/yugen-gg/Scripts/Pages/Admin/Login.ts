$().ready(() => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            window.location.href = "/admin";
        }
    });

    isBusy(false);
})

let loginObject = {
    userName: ko.observable<string>("").extend({ email: true }),
    password: ko.observable<string>("")
}

function loginViewModel() {


    this.submitClick = () => {
        isBusy(true);
        let loginPromise = firebase.auth().signInWithEmailAndPassword(loginObject.userName(), loginObject.password());

        loginPromise
            .then(result => {
                window.location.href = "/admin/index";
                isBusy(false);
            })
            .catch(e => {
                alert(e);
                isBusy(false);
            });
    }
}

ko.applyBindings(new loginViewModel);