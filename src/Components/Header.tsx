import { useEffect, useState } from "react";
import logoIcon from "../assets/logo.svg";
import { ThemeChangerComponent } from "./ThemeChangerComponent";
export function Header() {
  const [isMobileResolution, setIsMobileResolution] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobileResolution(window.window.innerWidth < 1180);
    });
    setIsMobileResolution(window.window.innerWidth < 1180);
  }, []);

  return (
    <>
      <header className="w-full flex justify-center mb-4 ">
        <div className=" navbar bg-base-100 w-11/12 mt-2 shadow  border-b rounded-lg border-base-100  h-12 p-8">
          {!isMobileResolution ? (
            <>
              <div id="header-left_block" className="navbar-start space-x-5">
                <a className="flex items-center space-x-2">
                  <img src={logoIcon} className="w-10 lg:w-14" alt="Logo" />
                  <h1 className="text-3xl font-medium ">Jewelry</h1>
                </a>

                <div className="space-x-2">
                  <a>
                    <button className="btn btn-ghost  text-lg w-28">
                      <span>Каталог</span>
                    </button>
                  </a>
                  <a>
                    <button className="btn btn-ghost text-lg w-28">
                      <span>О нас</span>
                    </button>
                  </a>
                  <a>
                    <button className="btn btn-ghost text-lg w-28">
                      <span>Контакты</span>
                    </button>
                  </a>
                </div>
              </div>
              <div id="header-right_block" className="navbar-end space-x-5">
                <a className="cursor-pointer">
                  <span>Корзина</span>
                </a>
                <a className="cursor-pointer">
                  <span>Корзина</span>
                </a>
                <a className="cursor-pointer">
                  <span>Аккаунт</span>
                </a>
                <ThemeChangerComponent />
              </div>
            </>
          ) : (
            <>
              <div className="navbar-start">
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52  "
                  >
                    <li>
                      <a>
                        <span>Каталог</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span>О нас</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span>Контакты</span>
                      </a>
                    </li>
                    <div className="divider"></div>
                    <li>
                      <a>
                        <span>Корзина</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span>Корзина</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <span>Аккаунт</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="header-left_block" className="navbar-center space-x-5">
                <a className="flex items-center space-x-2">
                  <img src={logoIcon} className="w-10 lg:w-14" alt="Logo" />
                  <h1 className="text-3xl font-medium ">Jewelry</h1>
                </a>
              </div>
              <div className="navbar-end">
                <ThemeChangerComponent />
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
