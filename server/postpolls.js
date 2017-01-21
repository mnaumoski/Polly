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
      usersVoted: [],
      usersLiked: [],
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

      //Mark this user as having voted in the usersLiked array
      var $setLikes = {};
      currentUserId = Meteor.userId();
      Polls.update(
        {_id: pollId},
        { $addToSet: { usersLiked: currentUserId} 
      });
    }
  },
  addComment: function(pollId, comment, data){
    userSignedIn = Meteor.user() || false;

    if(userSignedIn){
      Polls.update(
        { _id: pollId },
        { $push:
          { comments:
            {
              createdAt: new Date().toLocaleString(),
              userId: Meteor.user()._id,
              comment: comment
            }
          }
        })
    }

    var newComment = new Date();
    if(userSignedIn){  
      initialCommentCount = Polls.findOne({_id: pollId}).comments.length
      var $set = {};

      $set['commentCount'] = initialCommentCount + 1;            
      Polls.update({ _id: pollId },{
        // $push: { comments: comment },
        $set: $set
      })
    }
  },

  dislikePoll: function(pollId){
    userSignedIn = Meteor.user() || false;
    if(userSignedIn){
      Polls.update({_id: pollId}, {$inc: {dislikes: 1} });

      currentUserId = Meteor.userId();
      Polls.update(
        {_id: pollId},
        { $addToSet: { usersLiked: currentUserId} 
      });
    }
  },
  addVote: function(pollId, indexId, currentUserId){
    userSignedIn = Meteor.user() || false;
    if(userSignedIn){

      //search & find the specific poll in the DB
      var currentVotes = Polls.findOne({_id: pollId});

      //Increment the vote count for the specified choice
      var $set = {};
      $set['choices.' + indexId + '.votes'] = currentVotes.choices[indexId].votes + 1;
      Polls.update({_id: pollId}, {$set: $set });

      //Mark this user as having voted in the usersVoted array
      var $setVotes = {};
      // $setVotes['usersVoted'] = currentUserId;
      Polls.update(
        {_id: pollId},
        { $addToSet: { usersVoted: currentUserId} 
      });

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