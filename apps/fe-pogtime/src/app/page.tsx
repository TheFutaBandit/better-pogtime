'use client'

import PageFooter from "@/components/landing/footer";
import HeroContainer from "@/components/landing/hero-container";
import Navbar from "@/components/landing/navbar";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

function Page() {
  
  useGSAP(() => {
    // Set initial positions when component mounts
    gsap.set(".img", { y: 500 });
    gsap.set(".loader-imgs", { x: 500 });
    gsap.set(".nav-item", { y: 25, opacity: 0 });
    gsap.set("h1, .item, footer", { y: 200 });
  }, []);

  return (
    <div className = "h-screen w-screen overflow-x-hidden relative bg-[#e7e4e5]" style={{fontFamily: 'Sharp Grotesk'}}>
            <div className="loader fixed h-screen w-screen bg-[#000] pointer-events-none [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                  <div className="loader-imgs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] flex gap-[50px] [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="./images/1.jpg" alt="logo-1" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="./images/2.jpg" alt="" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="./images/3.jpg" alt="" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="./images/4.jpg" alt="" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="./images/4.jpg" alt="" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="./images/5.jpg" alt="" />
                      </div>
                      <div className="img relative flex-1 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
                          <img className="w-full h-full object-cover" src="./images/6.jpg" alt="" />
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




