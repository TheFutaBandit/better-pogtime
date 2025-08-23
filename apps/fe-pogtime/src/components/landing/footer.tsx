import Image from 'next/image';

const PageFooter = () => {
return (<footer className="absolute bottom-[30px] right-[30px] flex justify-end gap-[10px]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
    <div className="item relative w-[100px] h-[100px]">
        <img src="/images/optimized/1.webp" alt="footer image 1" width="100" height="100" />
    </div>

    <div className="item relative w-[100px] h-[100px]">
        <img src="/images/optimized/2.webp" alt="footer image 2" width="100" height="100" />
    </div>

    <div className="item relative w-[100px] h-[100px]">
        <img src="/images/optimized/3.webp" alt="footer image 3" width="100" height="100" />
    </div>

    <div className="item relative w-[100px] h-[100px]">
        <img src="/images/optimized/4.webp" alt="footer image 4" width="100" height="100" />
    </div>
</footer>)}

export default  PageFooter;