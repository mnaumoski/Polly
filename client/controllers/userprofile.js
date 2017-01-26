Template.s3_tester.events({
  "click button.upload": function(){
    var files = $("input.file_bag")[0].files

    S3.upload({
        files:files,
        path:"subfolder"
      },function(e,r){
        console.log(r.url);
        var id = Meteor.userId();
        Meteor.users.update(id, {$set: {"profile.image": r.url}});
        console.log(Meteor.user().profile.image);
    });
    $("p").remove();
  }
})

Template.s3_tester.helpers({
  "files": function(){
    return S3.collection.find();
  }
})

// Template.s3_tester.events({
//   "click button.upload":function(){
//     $(".input.file_bag").remove("p");
//   }
// })