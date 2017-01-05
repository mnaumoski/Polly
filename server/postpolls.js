Meteor.methods({
  addPoll: function (data) {
    console.log("addPoll called (function in postpolls.js)");

    //Trying to create and array to pass to Mongo
    var choicesToAdd = [];
    for (i=1; i<data.length; i++) {
      choicesToAdd.push({
        text: data[i], 
        count: 0
      });
    }

    Polls.insert({
      question: data[0],
      choices: choicesToAdd,
      createdAt: new Date().toLocaleString(),
      likes: 0,
      dislikes: 0,
      user: {
        _id: Meteor.user()._id,
        email: Meteor.user().emails[0].address
      }
    });
  },
  likePoll: function(pollId){
    userSignedIn = Meteor.user() || false;
    if(userSignedIn){
      Polls.update({_id: pollId}, {$inc: {likes: 1} });
    }
  },
  dislikePoll: function(pollId){
    userSignedIn = Meteor.user() || false;
    if(userSignedIn){
      Polls.update({_id: pollId}, {$inc: {dislikes: 1} });
    }
  },
  deletePoll: function(pollId){
    var poll = Polls.findOne({_id: pollId }),
    pollUserId = poll.user._id;
    currentUserId = Meteor.userId();
    if(pollUserId === currentUserId) {
      console.log("User deleted poll.")
      Polls.remove({_id: pollId});
    } else if(Roles.userIsInRole(Meteor.user(), ['admin'])){
      console.log("Admin deleted poll.")
      Polls.remove({_id: pollId});
    } else {
      console.log("Someone's trying to delete polls and shouldn't be.")
    }
  }
});