// We start by defining our variables. I'll also put my constants here.

const easeOutQuad = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
const easeInQuad = 'cubic-bezier(0.550, 0.085, 0.680, 0.530)';
const fallingTransition = 'all 0.6s '+easeInQuad;
const settlingTransition = 'all 150ms '+easeInQuad;
const settledTransform = 'rotate(0deg)';
const droppedTransform = 'rotate(20deg)';

const movingBox = document.getElementById('moving-box');
// Now we define the different stages we want to animate the box between as we scroll. The format is that we give the
// javascript object for the element (this will allow us to do some dynamic calculations). We also specify the y
// position that we want the box to go to (in terms of percentage) of the backdrop of the image. We also give
// a scale in comparison to the image width.
const stages =   [{element: document.getElementById('stage0'), positionY: 0.653, scale: 0.3475},
                {element: document.getElementById('stage1'), positionY: 0.5, scale: 0.38},
                {element: document.getElementById('stage2'), positionY: 0.5, scale: 0.16},
                {element: document.getElementById('stage3'), positionY: 0.73, scale: 0.35},
                {element: document.getElementById('stage4'), positionY: 0.5, scale: 0.60}];
// We then give ourselves a utility function that will return if the current element is visible or scrolled past.
// Given a DOM element we will determine if the current window is scrolled past having half of the element in view.
function scrolledHalfwayPast(element) {
    // Returns in terms of pixel how scrolled we are into the document. We will compare with the position of
    // halfway the current element.
    // The boundingRectangle is the computed rectangle on the client's screen itself.
    const boundingRectangle = element.getBoundingClientRect();
    // We compare the (midway position) versus (the window bottom).
    return boundingRectangle.top + boundingRectangle.height / 2 < window.innerHeight;
}

var currentStage = -1; // We keep track of the current stage we are at.
var animatingTo = -1;  // We will also keep track of what we are animating to so that we know if we need to stop.

// Now we can apply some logic based on scroll events.

var newTop = 0;
var updateAnimationState = function () {
    // Done falling, time to settle.
    movingBox.style.transition = settlingTransition;
    movingBox.style.top = newTop+'px';
    movingBox.style.transform = settledTransform;
    animationState = 2;
    currentStage = animatingTo;
}

// We leave updateAnimationState to be something global. After all we are adding the same transition
// each time. The only thing that's different is the newTop variable. Which we also leave as a constant.
movingBox.addEventListener("webkitTransitionEnd", updateAnimationState);
movingBox.addEventListener("transitionend", updateAnimationState);

function animationLogic() {
    // Let's loop through each stage backwards and find the first occurence that's scrolled at least
    // halfway in the animation.
    var newlyReached = 0;
    for (var i = stages.length - 1; i > 0; i--) {
        if (scrolledHalfwayPast(stages[i].element)) {
            newlyReached = i;
            break;
        }
    }

    // We will only need to intervene in event logic if we aren't animating or at what's newly reached.
    if (newlyReached > currentStage && newlyReached > animatingTo) {
        animatingTo = newlyReached;
        // First we will flush all current transition logic.
        // Removing classes that do not exist does NOT throw an error.
        // So we might as well try all of them.
        movingBox.style.transition = ''; // We clear the transition property to flush.
        movingBox.style.transition = fallingTransition; // The first is the falling transition.
        // Now we can get to the good stuff. A chain of transitions. I'm using transitions because
        // it's a bit cleaner than defining an animation at this moment.
        const stage = stages[i];
        const stageElementRect = stage.element.getBoundingClientRect();
        const topScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const newSize = stageElementRect.height * stage.scale;
        const newLeft = stageElementRect.left + stageElementRect.width / 2 - newSize / 2;
        newTop = topScroll + stageElementRect.top + stageElementRect.height * stage.positionY - newSize / 2;
        movingBox.style.top = newTop+'px';
        movingBox.style.transform = droppedTransform;
        movingBox.style.height = newSize+'px';
        movingBox.style.left = newLeft+'px';
    }
}

animationLogic();

window.onscroll = animationLogic;
window.onresize = animationLogic;