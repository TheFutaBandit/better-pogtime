import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full p-[30px] flex items-center" style={{fontFamily: 'Neue Montreal'}}>
      <div className="nav-item relative flex-1">
        <Link href="/about" className="nav-link text-black no-underline uppercase">( menu )</Link>
      </div>
      <div className="nav-item relative flex-1 text-center text-[24px] font-medium" id="logo">
        <Link href="/" className="logo-link text-black no-underline uppercase" style={{fontFamily: 'PP Editorial Old'}}>POGTIME</Link>
      </div>
      <div className="nav-item relative flex-1 text-right">
        <Link href="/projects" className="nav-link text-black no-underline uppercase">( open )</Link>
      </div>
    </nav>
  )
}

export default Navbar;