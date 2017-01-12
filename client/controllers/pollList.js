Template.pollList.helpers({
  // check if user is an admin
  'poll': function() {
    return Polls.find({}, {sort: {createdAt: -1} });
  },
});