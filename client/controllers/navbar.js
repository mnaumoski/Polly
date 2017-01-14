Template.navbar.helpers({
  // check if user is an admin
  'isAdminUser': function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
});

Template.navbar.events({
  'change #sort-collection': function(event){
    var sortBy = $(event.target).val();    
    Session.set('sortby', sortBy);    
  },
  'change #sort-order': function(event){
    var sortOrder = $(event.target).val();
    Session.set('sortorder', sortOrder);
  }
});