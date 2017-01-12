Meteor.methods({
  addPoll: function (data) {
    var choiceArray = data[1].split('\n');
    
    //Trying to create and array to pass to Mongo
    var choicesToAdd = [];
    for (i=0; i<choiceArray.length; i++) {
      var tempObject = {text: choiceArray[i], votes: 0};
      choicesToAdd.push(tempObject);
    }
    var expirationDate =new Date();

    Polls.insert({
      question: data[0],
      choices: choicesToAdd,
      createdAt: new Date().toLocaleString(),
      likes: 0,
      dislikes: 0,
      expiration: expirationDate,
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
  addComment: function(pollId, comment){
    userSignedIn = Meteor.user() || false;
    if(userSignedIn){
      Polls.update({ _id: pollId },{ $push: { comments: comment }})
    }
  },  
  dislikePoll: function(pollId){
    userSignedIn = Meteor.user() || false;
    if(userSignedIn){
      Polls.update({_id: pollId}, {$inc: {dislikes: 1} });
    }
  },
  addVote: function(pollId, indexId){
    userSignedIn = Meteor.user() || false;
    if(userSignedIn){

      var currentVotes = Polls.findOne({_id: pollId});
      console.log(currentVotes.choices[indexId].votes);

      var $set = {};
      $set['choices.' + indexId + '.votes'] = currentVotes.choices[indexId].votes + 1;
      // console.log($set);

      Polls.update({_id: pollId}, {$set: $set });
      
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
  },
});