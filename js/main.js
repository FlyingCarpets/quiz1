// var taskData = [{image: 'https://cdn-img-0.wanelo.com/p/8b6/be0/d30/0ae5ae53af9710779f57c19/x200-q90.jpg', answer: 'faultier'},{image:'http://www.scifiideas.com/wp-content/uploads/2011/10/Echidna-200x200.jpg', answer: 'schnabeligel'}];
var task;

var buildTask = (function() {
  
  var taskList = [];
  var randomNum;
  
  function Task(image,answer) {
    this.image = image;
    this.answer = answer;
  }
  
  return {
    getTaskData: function(data_path) {
      $.getJSON(data_path, function (data) {
          data.questions.map(function(data) {
            taskList.push(data);
          });
        buildTask.selectRandomNum();
      });
    },
    selectRandomNum: function() {
      if(taskList.length > 0) {
       randomNum = Math.floor(Math.random() * taskList.length);
       this.buildRandomTask(); 
      } else {
        alert('pabaiga');
      }
    },
    buildRandomTask: function() {
      task = new Task(taskList[randomNum].image, taskList[randomNum].answer);
      taskList.splice(randomNum, 1);
      placeTask();
    }
  }
}());

var placeTask = function() {
 return function() {
   document.getElementById('randomImage').src = task.image;
 }; 
}();

var checkAnswer = (function() {
  return function() {
    var insertedAnswer = document.getElementById('userAnswer').value.toLowerCase();
    if(insertedAnswer == task.answer) {
         alert('hoorah!');
         buildTask.selectRandomNum();
      } else {
         alert('try again');
      }
    }; 
}());


buildTask.getTaskData('https://raw.githubusercontent.com/FlyingCarpets/quiz/gh-pages/data/questions.json');
