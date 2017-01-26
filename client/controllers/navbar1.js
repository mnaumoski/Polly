Template.navbar1.helpers({
  // check if user is an admin
  'isAdminUser': function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
});

Template.navbar1.onRendered(function(){
  $('.collapsible').collapsible();
});

Template.navbar1.events({
  "click #modalTrigger": function(event){
    $('#modal1').openModal({
    });
  },
});
