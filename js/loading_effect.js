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
}, { threshold: 0.5 });

animationTargets.forEach((target) => {
    observer.observe(target);
});

