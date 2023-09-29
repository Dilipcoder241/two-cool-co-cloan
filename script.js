
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

function circlesanimation(){

var colors = ['rgba(184, 184, 184, 0.864)' , 'rgba(204, 181, 159, 0.864)', 'rgba(204, 181, 159, 0.664)' ,'rgba(149, 196, 122, 0.824)']
document.querySelectorAll('.box').forEach((box,idx) => {
    let col = colors[idx];
    box.addEventListener('mousemove',(dets)=>{
        gsap.to('.circle',{
            top:dets.y-100,
            left:dets.x-100
        })
    })
        
        box.addEventListener('mouseenter',()=>{
            document.querySelector('.circle').style.transform = 'scale(1)';
            document.querySelector('.circle').style.backgroundColor = col;
        })
        
        box.addEventListener('mouseleave',()=>{
            document.querySelector('.circle').style.transform = 'scale(0)';
        })
});

}
circlesanimation();


gsap.to('.links a',{
    opacity:0,
    y:-14,
    scrollTrigger:{
        trigger:".links a",
        scroller : "#main",
        // markers:true,
        start:"top 2%",
        end:"top -5%",
        scrub:true,
    }
})

gsap.to('.logos svg',{
    transform:'translateY(-150%)',
    scrollTrigger:{
        trigger:".logos svg",
        scroller: "#main",
        start:"top 2%",
        end:"top -5%",
        scrub:true
    }
})

gsap.from('.navbar', {
    opacity:0,
})

gsap.from('.page1 h1',{
    x:100,
    opacity:0,
    duration:1,
    stagger:1
})


gsap.from('.page6 .part2' ,{
    opacity:0,
    scrollTrigger:{
        trigger:".page6",
        scroller: "#main",
        start:"top 30%",
        scrub:true
    }
})
