Template.newPoll.events({
  "click #modalTrigger": function(event){
    $('#modal1').openModal();
  },
});

Template.newPoll.events({
  "submit form": function(event){
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get values from form element
    const questionText = event.target.questionText.value;
    const choiceText = event.target.choiceText.value;

    if (questionText == null || choiceText == null) {
      console.log("Alert");
    }

    //call the newPoll helper
    //questionText is a string & choiceText is a string. These are passed in an array
    Meteor.call("addPoll", [questionText, choiceText]);
    
  },
});