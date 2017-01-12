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
    const choiceTextArray = choiceText.split(',');

    //log the results
    console.log(questionText + "||" + choiceTextArray);

    //call the newPoll helper
    //questionText is a string & choiceText is a string. These are passed in an array
    Meteor.call("addPoll", [questionText, choiceText]);
 
    // Clear form
    target.text.value = '';
  },
});