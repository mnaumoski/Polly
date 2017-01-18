Template.newPoll.events({
  "click #modalTrigger": function(event){
    $('#modal1').openModal({
    });
  },
  "click #preview": function(event){
    //display publish button & preview window
    $('#publish').removeClass('hide');
    $('#previewPoll').removeClass('hide');

    //Pull preview data
    const questionText = $('questionText').val();
    const choiceText = $('textarea#choiceInput').val();

   var choiceArray = choiceText.split('\n');

    //Create an array of choices
    var choicesToAdd = [];
    for (i=0; i<choiceArray.length; i++) {
      choicesToAdd.push(choiceArray[i]);
    }

    var timestamp = new Date();

    //Build up the element structure of the poll
    var parentDiv = $("<div>");
    parentDiv.addClass('card');
    parentDiv.addClass('blue-grey');
    parentDiv.addClass('darken-1');

    var childDiv = $("<div>");
    childDiv.addClass('card-content');
    childDiv.addClass('white-text');

    var childSpan = $("<span>");
    childSpan.addClass('card-title');
    childSpan.html(questionText);

    var creator = $('<p>');
    creator.addClass('pollCreated')
    creator.html('Created by username ' + timestamp);


    childSpan.append(creator);
    childDiv.append(childSpan);
    parentDiv.append(childDiv);


    var choicesDiv = $('<div>');

    //Create buttons per choice
    for (i=0; i <choiceArray; i++) {
      var tempDiv = $('<div>');
          tempDiv.addClass('choicebutton');
          tempDiv.addClass('choices')

      var tempInput = $('<input>');
      var tempInput = $("<input type=\"radio\" name=\"allPolls\" id=\"poll\"/>");
          tempInput.append(choiceArray[i]);
          console.log(choiceArray[i]);

      tempDiv.append(tempInput);
      choicesDiv.append(tempDiv);
    }

    //Insert poll to preview

    $('#previewPoll').append(parentDiv);
    $('#previewPoll').append(choicesDiv);

    //Insert user & date
    // var timestamp = new Date();
    // $('.pollCreated').append('Created by username ' + timestamp);

    // $('#previewPoll').append(pollForPreview);
  },
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