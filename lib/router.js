// In the configuration, we declare the layout, 404, loading,
// navbar, and footer templates.
Router.configure({
  layoutTemplate: 'masterLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    navbar: {to: 'navbar'},
    navbar1: {to: 'navbar1'},
    footer: {to: 'footer'},
  }
});

// In the map, we set our routes.
Router.map(function () {
  // Index Route
  this.route('landing', {
    path: '/',
    template: 'landing',
    layoutTemplate: 'cleanLayout',
  });


this.route('userprofile', {
    path: '/userprofile',
    template: 'userdashboard',
    layoutTemplate: 'cleanLayout',
  });


  this.route('pollList', {
    path: '/pollList',
    template: 'pollList',
    layoutTemplate: 'homepageLayout',
    waitOn: function(){
      var collections = [
        Meteor.subscribe('polls')
      ];
      return collections;
    }
  });

  this.route('poll', {
    path: '/poll/:_id',
    template: 'poll',
    layoutTemplate: 'cleanLayout',
    waitOn: function () {   
      // console.log(this.params._id) 
      var query = Meteor.subscribe('polls', this.params._id);
      // console.log(query);
      return query;
    },
  });

  this.route('loading', {
    path: 'loading',
    template: 'loading',
    layoutTemplate: 'masterLayout'
  });
  // User Mgmt Route
  this.route('usermgmt', {
    path: '/usermgmt',
    template: 'userManagement',
    layoutTemplate: 'masterLayout',
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
          this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
          this.redirect('/');
      }
      this.next();
    },
    loadingTemplate: 'loading'
  });
  // Sign In Route
  AccountsTemplates.configureRoute('signIn', {
      name: 'signin',
      path: '/sign-in',
      template: 'signIn',
      layoutTemplate: 'masterLayout',
      redirect: '/pollList',
  });
  // Sign Up Route
  AccountsTemplates.configureRoute('signUp', {
      name: 'sign-up',
      path: '/sign-up',
      template: 'signUp',
      layoutTemplate: 'masterLayout',
      redirect: '/pollList',
  });
  // Sign Out Route
  this.route('/sign-out', function(){
      Meteor.logout(function(err) {
          if (err) alert('There was a problem logging you out.');
          Router.go("/");
          $(".button-collapse").sideNav("hide");
      });
      Router.go("/");
  });
});
