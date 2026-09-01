import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/flash-card.png";

type NavbarProps = {
  reviewCount: number;
};

function Navbar({ reviewCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" onClick={closeMenu} to="/">
          <img alt="" className="brand-logo" src={logo} />
          <span>
            <strong>フラッシュカード</strong>
            <small>English practice</small>
          </span>
        </Link>

        <button
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          className="menu-toggle"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          aria-label="メインナビゲーション"
          className={`primary-nav${isOpen ? " is-open" : ""}`}
          id="primary-navigation"
        >
          <NavLink onClick={closeMenu} to="/menu">
            セット一覧
          </NavLink>
          <NavLink onClick={closeMenu} to="/revise">
            復習
            {reviewCount > 0 && <span className="nav-badge">{reviewCount}</span>}
          </NavLink>
          <NavLink onClick={closeMenu} to="/edit-deck">
            カード編集
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
