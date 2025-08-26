import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full p-[30px] flex items-center gsap-init" style={{fontFamily: 'Neue Montreal'}}>
      <div className="nav-item relative flex items-center flex-1">
        <Link href="/auth/signup" className="nav-link flex items-center text-black no-underline uppercase">( sign up )</Link>
      </div>
      <div className="nav-item relative flex-1 text-center text-[24px] font-medium" id="logo">
        <Link href="/" className="logo-link text-black no-underline uppercase" style={{fontFamily: 'PP Editorial Old'}}>POGTIME</Link>
      </div>
      <div className="nav-item relative flex-1 text-right">
        <Link href="/auth/signin" className="nav-link text-black no-underline uppercase">( log in )</Link>
      </div>
    </nav>
  )
}

export default Navbar;