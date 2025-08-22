
const HeroContainer = () => {
    return (
    <div className="hero w-full absolute top-[50%] -translate-y-1/2 uppercase" style={{fontFamily: 'PP Migra'}}>
        <div className="h1 w-full text-center text-[4vw]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
            <h1 className="relative font-normal leading-[85%] text-black">we believe</h1>
        </div>
        <div className="h1 w-full text-center text-[4vw]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
            <h1 className="relative font-normal leading-[85%] text-black">websites that shape</h1>
        </div>
        <div className="h1 w-full text-center text-[4vw]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
            <h1 className="relative font-normal leading-[85%] text-black"><span className="font-bold" style={{fontFamily: 'Sharp Grotesk'}}>future.</span></h1>
        </div>
    </div>
    )
}



export default HeroContainer;