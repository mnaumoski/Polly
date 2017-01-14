Template.pollList.helpers({
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


