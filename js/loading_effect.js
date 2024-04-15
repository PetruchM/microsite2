const nums = "0123456789";
const space = " ";
const percent = "%";

const animationTargets = document.querySelectorAll(".loading-effect");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const target = entry.target;

            const targetValueStr = target.dataset.value;
            //get the inside of html element target
            // TODO: remove spaces and % from the inner text
            var target_parsed = targetValueStr.replace(/[\s%]/g, "");
            const targetValueNum = parseInt(target_parsed, 10);

            const maxIterations = 20; // Total number of iterations
            const durationPerIteration = 50; // Duration of one iteration in milliseconds
            let currentValue = 0;

            const interval = setInterval(() => {
                currentValue += targetValueNum / maxIterations;
                if (currentValue > targetValueNum)
                {
                    currentValue = targetValueNum;
                }
                const formattedValue = currentValue.toFixed(0).padStart(targetValueStr.length - 1, "0");
                
                // init a new string newValue with the same length as targetValueStr
                let newValue = "";
                var formatted_index = 0;
                for (let i = 0; i < targetValueStr.length; i++) {
                    if (targetValueStr[i] === space) {
                        newValue += space;
                    } else if (targetValueStr[i] === percent) {
                        newValue += percent;
                    } else {
                        newValue += formattedValue[formatted_index];
                        formatted_index++;
                    }
                }

                target.innerText = newValue;

                if (currentValue >= targetValueNum) {
                    clearInterval(interval);
                }
            }, durationPerIteration);

            // observer.unobserve(target);
        }
    });
}, { threshold: 0.9 });

animationTargets.forEach((target) => {
    observer.observe(target);
});





// const nums = "0123456789";
// const space = " ";
// const percent = "%";

// const animationTargets = document.querySelectorAll(".loading-effect");
// var intervals = [null, null, null, null];

// for (let index = 0; index < animationTargets.length; index++) {
//     const element = animationTargets[index];

//     element.parentElement.onmouseenter  = event => {  
//         let iteration = 0;    
//         // console.log("onmouseenter in: " + index);  
//         clearInterval(intervals[index]);
//         // console.log("cleared interval: " + index);
        
//         intervals[index] = setInterval(() => {
//             // console.log("interval started: " + index);

//             element.innerText = element.innerText
//             .split("")
//             .map((num, index) => {
//                 if(index < iteration) {
//                 return element.dataset.value[index];
//                 }
//                 if (element.dataset.value[index] === space) return space;
//                 if (element.dataset.value[index] === percent) return percent;
                
//                 // TODO: instead of returning a random number
//                 // compute the number based on the iteration
//                 // (iteration 3 out of 10 should be 30% of the number)
//                 // should have leading zeros
//                 // return nums[Math.floor(Math.random() * 10)]
//                 return nums[Math.floor(iteration / element.dataset.value.length * 10)];
//             })
//             .join("");
          
//           if(iteration >= element.dataset.value.length){ 
//             // console.log("interval ended: " + index);
//             clearInterval(intervals[index]);
//           }
          
//           if(element.dataset.value.length > 3)
//           {
//             iteration += 1 / 2;
//           }
//           else
//           {
//             iteration += 1/7;
//           }
            
//         }, 30);
//       };
    
// }

