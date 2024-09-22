const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetValueStr = target.dataset.value.replace(/\s|%/g, ""); // Remove spaces and %
            const targetValueNum = parseInt(targetValueStr, 10);

            const maxIterations = 20;
            const durationPerIteration = 50;
            let currentValue = 0;

            const interval = setInterval(() => {
                currentValue = Math.min(currentValue + targetValueNum / maxIterations, targetValueNum);
                target.innerText = currentValue.toFixed(0) + (target.dataset.value.includes("%") ? " %" : " 000");
                
                if (currentValue >= targetValueNum) {
                    clearInterval(interval);
                }
            }, durationPerIteration);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll(".loading-effect").forEach((target) => observer.observe(target));

