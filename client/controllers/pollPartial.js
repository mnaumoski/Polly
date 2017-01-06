Template.pollPartial.events({
  "click .delete-poll": function () {
    var pollId = event.target.dataset.id
    Meteor.call('deletePoll', pollId);
  },
  "click .like-poll": function () {
    var pollId = event.target.dataset.id
    Meteor.call('likePoll', pollId);
  },
  "click .dislike-poll": function () {
    var pollId = event.target.dataset.id
    Meteor.call('dislikePoll', pollId);
  },
  "click .voteButton": function () {
    var pollId = event.target.dataset.id
    var indexId = $('input:radio[id=poll]:checked').val();
    console.log("Vote Button Clicked | castVote is " + pollId + " | + indexID is " + indexId);

    Meteor.call('addVote', pollId, indexId);
  }
});

Template.pollPartial.helpers({
  'isAdminOrCreator': function(poll) {
    pollUserId = poll.user._id;
    currentUserId = Meteor.userId();
    if(pollUserId === currentUserId) {
      return true
    } else if(Roles.userIsInRole(Meteor.user(), ['admin'])){
      return true
    } else {
      return false
    }
  }
});

