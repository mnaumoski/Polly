Template.pollPartial.events({
  "click .delete-poll": function () {
    var pollId = event.target.dataset.id
    Meteor.call('deletePoll', pollId);
  },
  "click .like-poll": function () {
    var pollId = event.target.dataset.id
    Meteor.call('likePoll', pollId);
    // $('.like-poll').off().on('click', function(){
    $('.like-poll').addClass('disabled');
    $('.dislike-poll').addClass('disabled');
    $( ".like-poll" ).prop( "disabled", true );
    $( ".dislike-poll" ).prop( "disabled", true );
  },
  "click .dislike-poll": function () {
    var pollId = event.target.dataset.id
    Meteor.call('dislikePoll', pollId);
    $('.like-poll').addClass('disabled');
    $('.dislike-poll').addClass('disabled');
    $( ".like-poll" ).prop( "disabled", true );
    $( ".dislike-poll" ).prop( "disabled", true );
  },

  "click .fav-poll": function () {
    var pollId = event.target.dataset.id;
    currentUserId = Meteor.userId();
    Meteor.call('favPoll', pollId,currentUserId);
    // $('.fav-poll').addClass('disabled');
    // $( ".fav-poll" ).prop( "disabled", true ); 
  },

  "click .voteButton": function () {
    
    var pollId = $(event.target).attr('id');
    var indexId = $(event.target).attr('choice-index');
    currentUserId = Meteor.userId();

    console.log(pollId + indexId + currentUserId);
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

