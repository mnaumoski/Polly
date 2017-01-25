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
  "click .fav-poll": function () {
    var pollId = event.target.dataset.id;
    Meteor.call('favPoll', pollId); 
  },

  "click .voteButton": function () {
    
    var pollId = $(event.target).attr('id');
    var indexId = $(event.target).attr('choice-index');
    currentUserId = Meteor.userId();

    Meteor.call('addVote', pollId, indexId, currentUserId);
  },
  "submit .comment-form": function(event){
    event.preventDefault();
    var pollId = $(event.target).data('poll-id'),
    comment = $(event.target).find('textarea').val();    
    Meteor.call('addComment', pollId, comment);
  }
});
  Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
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

