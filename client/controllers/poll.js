function protectLikes(callName, pollId){
  var poll = Polls.findOne(pollId);
  var usersLiked = poll.usersLiked;
  var usersDisliked = poll.usersDisliked;
  var usersFav = poll. usersFav;


  if(jQuery.inArray(Meteor.userId(), usersLiked) !== -1){
    console.log("User has liked.")
  } else if(jQuery.inArray(Meteor.userId(), usersDisliked) !== -1){
    console.log("User has disliked.")
  } else {
    Meteor.call(callName, pollId);
  }
}

Template.poll.helpers({
  poll: function () {
    
    var tempPollObject = Polls.findOne(Router.current().params._id);


    if (Meteor.user() == null) {
        // console.log("Not logged in");
        // var tempPollObject = Polls.find({}, {sort: {createdAt: 1} });
        return tempPollObject;
    }


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
    protectLikes('likePoll', pollId);
  },
  "click .dislike-poll": function () {
    var pollId = event.target.dataset.id
    protectLikes('dislikePoll', pollId);
  },
   "click .fav-poll": function () {
    var pollId = event.target.dataset.id;
    protectFav('favPoll', pollId);
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
    $(event.target).find( "textarea" ).val('');
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
