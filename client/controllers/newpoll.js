Template.newPoll.events({
  "click #newPoll": function (e) {
    e.preventDefault();

    Meteor.call("addPoll", "data");

    return false;
  }
});
