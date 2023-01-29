import Link from 'next/link';

const Header = () => {
    let is_loged_in =false
    return (
        <header className="header">
            <nav>
                <div className="logo">CompanyX</div>
                <div className="nav-container">
                    <ul className="nav-links">
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        
                           {is_loged_in?(<li><Link href="/halls"><a>Halls</a></Link></li>):""}
                          {is_loged_in?(<li><Link href="/bookings"><a>bookings</a></Link></li>):""}
                          {is_loged_in?(<li><Link href="/manage"><a>manage</a></Link></li>):""}
                        <li>
                            <Link href="/contact">
                                <a>Contact</a>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
                <div className="login-btn">
                    <Link href="/login">
                        <a>Log I</a>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;