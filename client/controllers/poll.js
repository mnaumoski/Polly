Template.poll.helpers({
  // check if user is an admin
  'poll': function() {
    var filter = {sort: {}};
    var sortBy = Session.get('sortby');
    filter.sort[sortBy] = Session.get('sortorder');
    var categories = ['likes', 'dislikes', 'createdAt', 'commentCount']    
    var inArray = categories.indexOf(sortBy) > -1
    if(!inArray){      
      return Polls.find({}, {sort: {createdAt: 1} });
    } else {     
      console.log("in array"); 
      return Polls.find({}, filter);
    }        
  }

});

Template.poll.rendered = function () {
  $("select").material_select();
};

Template.poll.events({
  'change #sort-collection': function(event){
    var sortBy = $(event.target).val();    
    Session.set('sortby', sortBy);    
  },
  'change #sort-order': function(event){
    var sortOrder = $(event.target).val();
    Session.set('sortorder', sortOrder);
  }
});
// console.log('test');


Template.poll.events({
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
  // "click .choiceButton": function () {
  //   event.preventDefault();

  //   //Find pollId from parent object
  //   var pollId = $(this).closest("div.pollClicked").prevObject[0]._id;
  //   var choiceIndex = $(this).attr("data-id");
  //   console.log(pollId);
  //   console.log($(this).attr('data-id'));
  // },
    // notVoted: function(){
    //   return true
    // },
  "click .voteButton": function () {
    // voted=true
    document.getElementById('voteBtn').style.display = "none";
    var choices = document.getElementsByClassName('choices')

    for (var i = 0; i < choices.length; i++){
      choices[i].style.display = "none";
    }

    var pollId = event.target.dataset.id;
    // builtPie(pollId);
    //JQuery to find value of a specific poll
    //$('form[name="qBbppoQpCPLFwNCkM"]').find('input:radio[id=poll]:checked').val();
    var formToLookup = "form[name=" + pollId + "]";
    var indexId = $(formToLookup).find('input:radio[id=poll]:checked').val();
    console.log("Vote Button Clicked | castVote is " + pollId + " | + indexID is " + indexId);

    Meteor.call('addVote', pollId, indexId);
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
  }
});

