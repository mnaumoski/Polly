Template.pollList.helpers({
  // check if user is an admin
  'poll': function() {
    var filter = {sort: {}};
    var sortBy = Session.get('sortby');
    filter.sort[sortBy] = Session.get('sortorder');
    var categories = ['likes', 'dislikes', 'createdAt', 'commentCount']    
    var inArray = categories.indexOf(sortBy) > -1
    // if(!inArray){      
    //   //below line works to return polls, may still be needed
    //   var data = Polls.find({}, {sort: {createdAt: 1} });
    //   console.log(data);
    //   return data;

    //   // var tempPollObject = Polls.find({}, {sort: {createdAt: 1} });
    //   // console.log(tempPollObject.collection._docs._map);
    // } else {     
      console.log("in array"); 
      // return Polls.find({}, filter); //Straight up filter return

      var tempPollArray = [];

      //iterate through each poll's object individually to check usersVoted 
      var tempPollObject = Polls.find({}, filter).forEach(function(data) {

       var userId = Meteor.user()._id;

       for (var i=0; i<data.usersVoted.length; i++) {

         if (userId == data.usersVoted[i]) {
           data.usersVoteStatus = true; 
         }
       }
       tempPollArray.push(data);
      });

      console.log(tempPollArray);
      return tempPollArray;

//-----

      var tempLikeArray = [];

       var tempLikeObject = Polls.find({}, filter).forEach(function(data) {

       var userId = Meteor.user()._id;

       for (var i=0; i<data.usersLiked.length; i++) {

         if (userId == data.usersLiked[i]) {
           data.usersVoteStatus = true; 
         }
       }
       tempLikeArray.push(data);
      });

      console.log(tempLikeArray + 'this is a test');
      return tempLikeArray;

//-----




  },

});

Template.pollList.rendered = function () {
  $("select").material_select();
};

Template.pollList.events({
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


