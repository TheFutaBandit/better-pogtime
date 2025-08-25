'use client'

import PageFooter from "@/components/landing/footer";
import HeroContainer from "@/components/landing/hero-container";
import Navbar from "@/components/landing/navbar";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

function Page() {

  const refContainer = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {

    // Use will-change for better GPU acceleration
    gsap.set(".img", { y: 600, willChange: "transform" });
    gsap.set(".loader-imgs", { x: 500, willChange: "transform" });
    gsap.set(".nav-item", { y: 25, opacity: 0, willChange: "transform, opacity" });
    gsap.set("h1", { y: 200, willChange: "transform" });
    gsap.set(".item", { y: 200, willChange: "transform" });
    gsap.set("footer", { y: 200, willChange: "transform" });

    // Create timeline with initial delay
    const tl = gsap.timeline({ 
      delay: 1,
      onComplete: () => {
        // Clean up will-change after animations for better performance
        gsap.set([".img", ".loader-imgs", ".nav-item", "h1", ".item", "footer"], { willChange: "auto" });
      }
    });
    
    // First animation: .img elements
    tl.to(".img", {
      y: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: "power3.inOut"
    })
    .to(".loader-imgs", {
      x: 0,
      duration: 3,
      ease: "power3.inOut"
    }, "-=2.5")
    .to(".img:not(#loader-logo)", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      stagger: 0.1,
      ease: "power3.inOut"
    }, "-=1")
    .to(".loader", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "power3.inOut"
    }, "-=0.2")
    .to(".nav-item, h1, footer, .item", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.inOut"
    }, "-=0.5") 
  }, [refContainer]);

  return (
    <div ref={refContainer} className = "h-screen w-screen overflow-x-hidden relative bg-[#e7e4e5]" style={{fontFamily: 'Sharp Grotesk'}}>
            <div className="loader fixed h-screen w-screen bg-[#000] pointer-events-none [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                  <div className="loader-imgs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] flex gap-[50px] [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="/images/optimized/1.webp" alt="logo-1" width="400" height="300" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="/images/optimized/2.webp" alt="logo-2" width="400" height="300" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="/images/optimized/3.webp" alt="logo-3" width="400" height="300" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]" id = "loader-logo">
                          <img className="w-full h-full object-cover" src="/images/optimized/logo_image_2.webp" alt="logo_image" width="400" height="300" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="/images/optimized/4.webp" alt="logo-4" width="400" height="300" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="/images/optimized/5.webp" alt="logo-5" width="400" height="300" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="/images/optimized/6.webp" alt="logo-6" width="400" height="300" />
                      </div>
                  </div>
            </div>

            <Navbar />

            <HeroContainer />

            <PageFooter />
    </div>
  );
}

export default Page;




