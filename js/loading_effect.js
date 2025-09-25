const observer = new IntersectionObserver((entries) => {  //intersection observer is used for detecting if the entries are visible on screen or not
    entries.forEach((entry) => {
        if (entry.isIntersecting) {    //if this object(entry) is currently visible
            const target = entry.target;
            const targetValueStr = target.dataset.value.replace(/\s|%/g, ""); // Remove spaces and %
            const targetValueNum = parseInt(targetValueStr, 10);

            const maxIterations = 20;  //how many "steps" from zero to desired number
            const durationPerIteration = 50; //miliseconds
            let currentValue = 0;

            const interval = setInterval(() => {
                currentValue = Math.min(currentValue + targetValueNum / maxIterations, targetValueNum);
                target.innerText = currentValue.toFixed(0) + (target.dataset.value.includes("%") ? " %" : " 000+");  //special condition for my use, if the number was percentage or if it was in thousants, the str is changed

                if (currentValue >= targetValueNum) {
                    clearInterval(interval);  //end when rrached desired value
                    //observer.unobserve(target);  // Stop observing after animation completes, so will only be loaded once
                }
            }, durationPerIteration);
        }
    });
}, { threshold: 0.5 });   //data for theobserver, 0.5 as 50% or more of the object must be visible

document.querySelectorAll(".loading-effect").forEach((target) => observer.observe(target));  //catch all the targets and assign them to the observer

