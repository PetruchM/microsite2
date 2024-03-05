const nums = "0123456789";
const space = " ";
const percent = "%";

const animationTargets = document.querySelectorAll(".loading-effect");
var intervals = [null, null, null, null];

for (let index = 0; index < animationTargets.length; index++) {
    const element = animationTargets[index];

    element.parentElement.onmouseenter  = event => {  
        let iteration = 0;    
        // console.log("onmouseenter in: " + index);  
        clearInterval(intervals[index]);
        // console.log("cleared interval: " + index);
        
        intervals[index] = setInterval(() => {
            // console.log("interval started: " + index);

            element.innerText = element.innerText
            .split("")
            .map((num, index) => {
                if(index < iteration) {
                return element.dataset.value[index];
                }
                if (element.dataset.value[index] === space) return space;
                if (element.dataset.value[index] === percent) return percent;

                return nums[Math.floor(Math.random() * 10)]
            })
            .join("");
          
          if(iteration >= element.dataset.value.length){ 
            // console.log("interval ended: " + index);
            clearInterval(intervals[index]);
          }
          
          if(element.dataset.value.length > 3)
          {
            iteration += 1 / 2;
          }
          else
          {
            iteration += 1/7;
          }
            
        }, 30);
      };
    
}

