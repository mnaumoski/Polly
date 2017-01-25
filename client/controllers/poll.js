Template.poll.helpers({
  poll: function () {
    
    var tempPollObject = Polls.findOne(Router.current().params._id);

    var tempPollArray = [];
    var userId = Meteor.user()._id;

    for (var i=0; i<tempPollObject.usersVoted.length; i++) {

      if (userId == tempPollObject.usersVoted[i]) {
        tempPollObject.usersVoteStatus = true; 
      }
    }

    tempPollArray.push(tempPollObject);
    // console.log(tempPollArray);
    return tempPollObject;
  }
});

Template.poll.events({
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
    // currentUserId = Meteor.userId();
    Meteor.call('favPoll', pollId);
     $('.fav-poll').addClass('disabled');
     $( ".fav-poll" ).prop( "disabled", true ); 
  },
  "click .voteButton": function () {
    console.log('votebutton triggered in poll.js')
    
    var pollId = $(event.target).attr('id');
    console.log("pollId is " + pollId);
    var indexId = $(event.target).attr('choice-index');
    // console.log("indexId is " + indexId);
    currentUserId = Meteor.userId();
    // console.log("currentUserId is " + currentUserId);

    console.log("so far so good");
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

Template.poll.helpers({
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
  },
  'shareData': function() {
    return {
      title: this.data,
      author: Meteor.polls.findOne(this.users.email)
  }
}
});
