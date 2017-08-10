$().ready(() => {
    isBusy(false);
});

function rulesViewModel() {
    this.showMore = (id: string) => {
        $('#' + id).prev().prevObject.addClass("text-expanded");
    }
}

ko.applyBindings(new rulesViewModel());