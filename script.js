
function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
locomotive();

function playbtnanimation(){
  
    let playbtn = document.querySelector('.play');
    let videoContainer = document.querySelector('.video-container');
    
    document.getElementById('main').addEventListener('mousemove',(dets)=>{
        gsap.to(playbtn , {
            left: dets.x-60,
            top:dets.y-60
        })
    })
    videoContainer.addEventListener('mouseenter',()=>{
        playbtn.style.transform = 'scale(1)';
    })
    videoContainer.addEventListener('mouseleave',()=>{
        playbtn.style.transform = 'scale(0)';
    })   
}

playbtnanimation();

document.querySelectorAll('.circle').forEach(cir => {
    cir.addEventListener('mousemove',(dets)=>{
        
    })

    cir.addEventListener('mouseenter',()=>{
        cir.style.transform = 'scale(1)'
    })

    cir.addEventListener('mouseleave',()=>{
        cir.style.transform = 'scale(0)'
    })
});