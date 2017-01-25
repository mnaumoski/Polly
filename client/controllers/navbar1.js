Template.navbar1.helpers({
  // check if user is an admin
  'isAdminUser': function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
});

