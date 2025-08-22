const PageFooter = () => {
return (<footer className="absolute bottom-[30px] right-[30px] flex justify-end gap-[10px]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
    <div className="item relative w-[100px] h-[100px]">
        <img src="./images/1.jpg" alt="" />
    </div>

    <div className="item relative w-[100px] h-[100px]">
        <img src="./images/2.jpg" alt="" />
    </div>

    <div className="item relative w-[100px] h-[100px]">
        <img src="./images/3.jpg" alt="" />
    </div>

    <div className="item relative w-[100px] h-[100px]">
        <img src="./images/4.jpg" alt="" />
    </div>
</footer>)}

export default  PageFooter;