Template.poll.helpers({
  poll: function () {
    return Polls.findOne(Router.current().params._id);
  }
});
