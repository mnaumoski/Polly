Template.home.helpers({
  // check if user is an admin
  'poll': function() {
    return Polls.find({}, {sort: {likes: -1} });
  }
});