 let quesText = document.querySelector(".quiz-text");
 let answerText = document.querySelector(".quiz-answers");
 let nextBtn = document.querySelector("span.next");
 let resultDiv = document.querySelector(".result");
 let rightSpan = document.querySelector(".result span.right-number");
 let totalQues = document.querySelector(".result span.total");
 let startAgainBtn = document.querySelector(".start-again");
let rihgtAnswerNumber = 0;
 let start = 1;
 fetch("questions.json").then(res => res.json())
 .then(data => {
   totalQues.innerHTML = data.length;
     getRandomQues(data);
     nextBtn.onclick = () => {
     if(data.length) {
      if(answerText.classList.contains("banned")) {
         answerText.classList.remove("banned")
         answerText.innerHTML = "";
         getRandomQues(data);
         console.log(rihgtAnswerNumber)
      }else {
         return false;
      }
      }else {
      //Show the result
      document.querySelector(".question-container").style.display = "none";
      rightSpan.innerHTML = rihgtAnswerNumber;
      resultDiv.style.display = "block";
      nextBtn.style.display = "none";
      startAgainBtn.style.display = "block";
      startAgainBtn.addEventListener("click",(e) => {
         location.reload();
      })
     }
     }
 });
 function getRandomQues(array) {
 let randomQuestion = array[Math.floor(Math.random() * array.length)];
 array.splice(array.indexOf(randomQuestion),1);
 
 // Display in Page
 quesText.innerHTML = `${start++}- ${randomQuestion.Question}`;
 // Get Random Array of answers
 getRandomAnswers(randomQuestion);
}
 function getRandomAnswers (obj) {
   let arr = Object.values(obj).slice(1,5);
   let rightAnswer = obj.right_answer;
   let current = arr.length;
   let temp,
   random;
   while(current > 0) {
      // Get Random Number
      random = Math.floor(Math.random() * arr.length);
      current--;
    //Swapping
      temp = arr[current];
      arr[current] = arr[random];
      arr[random] = temp;
   }
    
   for(let i = 0; i<arr.length;i++) {
      let answerDiv = document.createElement("div");
      answerDiv.className = "answer";
      answerDiv.innerHTML = arr[i];
      answerText.appendChild(answerDiv)
   }
    
   document.querySelectorAll(".quiz-answers div").forEach(ele => {
      if(ele.innerHTML == rightAnswer) {
         ele.setAttribute("data-right","");
      }
      ele.onclick= () => {
        answerText.classList.add("banned");
         if(ele.innerHTML == rightAnswer) {
             rihgtAnswerNumber += 1;
            ele.classList.add("right");
         }else {
            document.querySelectorAll(".quiz-answers div").forEach(e => {
               if(e.hasAttribute("data-right")) {
                  e.classList.add("right");
               }
            })
            ele.classList.add("wrong");
            
         }
      }
   })
   
 }