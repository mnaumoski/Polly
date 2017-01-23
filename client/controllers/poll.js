Template.poll.helpers({
  poll: function () {
    return Polls.findOne(Router.current().params._id);
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

  "click .voteButton": function () {
    
    // document.getElementById('voteBtn').style.display = "none";
    
    // var choices = document.getElementsByClassName('choices')

    // for (var i = 0; i < choices.length; i++){
    //   choices[i].style.display = "none";
    // }

    var pollId = event.target.dataset.id;
    // builtPie(pollId);
    //JQuery to find value of a specific poll
    //$('form[name="qBbppoQpCPLFwNCkM"]').find('input:radio[id=poll]:checked').val();

    //Find form using pollId
    var formToLookup = "form[name=" + pollId + "]";
    //Find vote index for processing
    var indexId = $(formToLookup).find('input:radio[id=poll]:checked').val();

    // console.log("Vote Button Clicked | castVote is " + pollId + " | + indexID is " + indexId);

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
