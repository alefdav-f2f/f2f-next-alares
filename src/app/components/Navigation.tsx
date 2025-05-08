"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import CitySelector from "./CitySelector";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import Logo from "./Logo/Logo";
import LogoIcon from "./Logo/LogoIcon";
import { getNavigationItem } from "../services/navigation-service";
import DataLayerService from "../services/api/datalayer.service";
import { hasTV } from "../zustand/hasTV.zustand";
import { searchControls } from "../zustand/search.zustand";
import searchIcon from "../../img/icon/icon-src-1.svg";
import { navigationZustand } from "../zustand/navigation.zustand";

export default function Navigation() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpenSideBar, setIsOpenSideBar] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [navList, setNavList] = React.useState<any[]>([]);
  const [navSecondyList, setSecondyNavList] = React.useState<any[]>([]);
  const [cityName, setCityName] = React.useState<any | null>(null);
  const pathname = usePathname();
  const value = getCookie("city_name_uf");
  const checkHasTV = hasTV((state: any) => state.has_tv);
  const openSearch = searchControls((state: any) => state.open);
  const [activeSearch, setActiveSearch] = React.useState(false);

  //Parâmetros para controlar os botões de navegação
  const hidden = navigationZustand((state: any) => state.hidden);

  function isContratePage(path: string): boolean {
    return path.includes('contrate-ja');
  }

  const isContrateJaPage = isContratePage(pathname);

  function clearCookie() {
    deleteCookie("city_name_uf");
    deleteCookie("city_id");
    deleteCookie("city_slug");

    router.replace("/");
  }

  function sendDataLayer(text: string) {
    const data = {
      event: "click_menu",
      city: String(getCookie("city_name")),
      state: String(getCookie("uf_name")),
      menu_text: text,
    };

    console.log(data);
    DataLayerService.sender(data);
  }

  const activeHover = (index: number, boolean: boolean) => {
    let array = [...navList];
    array[index].active = boolean;

    setNavList(array);
  };

  const activeSecondHover = (index: number, boolean: boolean) => {
    let array = [...navSecondyList];
    array[index].active = boolean;

    setSecondyNavList(array);
  };

  function getParams() {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    return `?${params}`;
  }

  function getCityName() {
    setCityName(value);
  }

  function checkSecond(data: any) {
    if (data?.check === true && checkHasTV) {
      return true;
    } else if (data?.check === false) {
      return true;
    } else {
      return false;
    }
  }

  function activeSeach() {
    openSearch();
  }

  React.useEffect(() => {
    getCityName();
    setNavList(getNavigationItem(1));
    setSecondyNavList(getNavigationItem(2));
    setIsLoading(false);
  }, [value]);

  const SideBar = () => {
    return (
      <div className="block bg-white">
        <div
          className={
            isOpenSideBar ? "sidebar_open sidebar" : "sidebar_close sidebar"
          }
        >
          <div className="flex justify-between items-center mb-5 p-4">
            <button
              onClick={() => {
                setIsOpenSideBar(false);
              }}
              className="hover:bg-sub rounded-full"
            >
              <IoMdClose className="w-10 h-10 text-main" />
            </button>

            <div>
              <Logo color="purple" className="w-[120px]" />
            </div>
            <div className="w-10"></div>
          </div>

          <div>
            <a rel="canonical" href={`contrate-ja-card${getParams()}`}>
              <button
                onClick={() => {
                  sendDataLayer("Assine Já");
                }}
                className="flex items-center text-main bg-sub p-4 w-full"
              >
                <IoIosArrowForward className="text-xl" />
                <span className="font-semibold">Assine já</span>
              </button>
            </a>
          </div>

          <div className="pt-4">
            {navSecondyList?.map((item, index) => {
              return (
                <>
                  {checkSecond(item) ? (
                    <a
                      rel="canonical"
                      href={`${item.external ? "" : "/"}${
                        item.path
                      }${getParams()}`}
                      target={item.external ? "_black" : ""}
                    >
                      <button
                        onClick={() => {
                          sendDataLayer(item.title);
                        }}
                        className="h-[50px] pl-5 text-main font-light text-sm flex items-center w-full"
                      >
                        <Image
                          alt="Logo Alares Internet"
                          src={item.icon}
                          className="w-6 mr-4 text-"
                        />
                        <div className="w-full text-start">
                          <span
                            className={
                              item.active
                                ? "text-sub font-bold mb-2"
                                : "font-medium mb-2"
                            }
                          >
                            {item.title}
                          </span>
                          <div
                            className={
                              item.active || item.path === pathname
                                ? "h-[2px] bg-sub w-full animation_path"
                                : ""
                            }
                          ></div>
                        </div>
                      </button>
                    </a>
                  ) : null}
                </>
              );
            })}

            {navList?.map((item, index) => {
              return (
                <a
                  rel="canonical"
                  href={`${item.external ? "" : "/"}${item.path}${getParams()}`}
                  target={item.external ? "_black" : ""}
                >
                  <button
                    onClick={() => {
                      sendDataLayer(item.title);
                    }}
                    type="button"
                    className="h-[50px] pl-5 text-main font-light text-sm flex items-center w-full"
                  >
                    <Image
                      alt="Logo Alares Internet"
                      src={item.icon2}
                      className="w-6 mr-4 text-"
                    />
                    <div className="w-full text-start">
                      <span
                        className={
                          item.active
                            ? "text-sub font-bold mb-2"
                            : "font-medium mb-2"
                        }
                      >
                        {item.title}
                      </span>
                      <div
                        className={
                          item.active || item.path === pathname
                            ? "h-[2px] bg-sub w-full animation_path"
                            : ""
                        }
                      ></div>
                    </div>
                  </button>
                </a>
              );
            })}

            <div>
              <button
                onClick={() => {
                  setIsOpenSideBar(false);
                  activeSeach();
                }}
                className="h-[50px] pl-5 text-main font-light text-sm flex items-center w-full"
              >
                <Image
                  alt="Search icon"
                  src={searchIcon}
                  className="w-6 mr-4 text-"
                />
                <div className="w-full text-start">
                  <span
                    className={
                      activeSearch
                        ? "text-sub font-bold mb-2"
                        : "font-medium mb-2"
                    }
                  >
                    Buscar
                  </span>
                  <div
                    className={
                      activeSearch ? "h-[2px] bg-sub w-full animation_path" : ""
                    }
                  ></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav>
      <Drawer>
        <div className={`${isContrateJaPage ? 'hidden' : 'lg:hidden block border-b-4 border-sub'}`}>
          <div>
            <div className="bg-main flex justify-between lg:hidden p-4 items-center z-30">
              <button
                type="button"
                onClick={() => {
                  setIsOpenSideBar(true);
                }}
                className="w-10 h-10"
              >
                <AiOutlineMenu className="text-white w-10 h-10" />
              </button>
              <a rel="canonical" href={`home/${getParams()}`}>
                <button className="hover:bg-hover rounded-md py-2 px-4 hover:cursor-pointer">
                  {isLoading ? (
                    <LogoIcon className="w-10" color="white" />
                  ) : (
                    <Logo className="w-28 sm:w-36 sm:mr-8" color="white" />
                  )}
                </button>
              </a>
              <div className="w-8"></div>
            </div>

            {SideBar()}

            {hidden ? null : (
              <div className="h-[40px] flex justify-end bg-[#F1F1FA] p-2">
                <div className="flex items-center">
                  <div className="mr-4 flex items-center text-main">
                    <IoLocationSharp className="mr-1" />
                    <span
                      className={`font-medium ${
                        cityName?.length > 10 ? "text-xs" : "text-sm"
                      }`}
                    >
                      Minha localização
                    </span>
                  </div>
                  {/* <DrawerTrigger asChild> */}
                    <button onClick={() => {clearCookie()}} className="flex items-center h-full">
                      <div className="h-full flex items-center rounded-l-lg px-2 bg-sub">
                        <IoIosArrowDown />
                      </div>
                      <Suspense>
                        <div className="py-1 px-2 bg-white rounded-r-lg">
                          <div
                            className={`${
                              cityName?.length > 10 ? "text-xs" : "text-sm"
                            }`}
                          >
                            {cityName}
                          </div>
                        </div>
                      </Suspense>
                    </button>
                  {/* </DrawerTrigger> */}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex w-full init_navigation">
          <nav className=" max-w-screen w-full">
            <div className="flex justify-center lg:h-[90px] items-center sm:relative  bg-main w-[100%] border-sub border-b-[4px]">
              {/* Camada superior de navegação */}
              <div className="flex items-center justify-between sm:w-[1200px] w-full px-5">
                <a rel="canonical" href={`/home/${getParams()}`}>
                  <button
                    onClick={() => {
                      sendDataLayer("Home");
                    }}
                    className="hover:bg-hover rounded-md py-2 px-4"
                  >
                    {isLoading ? null : (
                      <Logo className="w-28 sm:w-36 sm:mr-8" color="white" />
                    )}
                  </button>
                </a>
                {hidden ? null : (
                  <>
                    <div className="hidden sm:flex justify-around w-full items-center">
                      {navList?.map((item, index) => {
                        return (
                          <div
                            key={item.title}
                            onMouseEnter={() => {
                              activeHover(index, true);
                            }}
                            onMouseLeave={() => {
                              activeHover(index, false);
                            }}
                          >
                            <a
                              rel="canonical"
                              href={`${item.external ? "" : "/"}${
                                item.path
                              }${getParams()}`}
                              target={item.external ? "_blank" : ""}
                            >
                              <button
                                onClick={() => {
                                  sendDataLayer(item.title);
                                }}
                                type="button"
                                className="text-white font-light text-sm flex items-center fade50"
                              >
                                <Image
                                  alt="Logo Alares Internet"
                                  src={item.icon}
                                  className="w-7 mr-2"
                                />
                                <div>
                                  <span
                                    className={item.active ? "text-sub" : ""}
                                  >
                                    {item.title}
                                  </span>
                                  <div
                                    className={
                                      item.active || item.path === pathname
                                        ? "h-[2px] bg-sub w-full animation_path"
                                        : ""
                                    }
                                  ></div>
                                </div>
                              </button>
                            </a>
                          </div>
                        );
                      })}

                      {/* Seletor de cidade */}
                      <div
                        className="hidden sm:block fade50"
                        onClick={() => {
                          sendDataLayer("Seletor de Cidade");
                        }}
                      >
                        <DrawerTrigger asChild>
                          <div className="text-white hover:cursor-pointer rounded font-medium text-sm flex items-center py-1.5 px-4 border-main  bg-main hover:bg-gray-100 hover:text-blue-700 focus:z-10">
                            <span>{cityName}</span>
                          </div>
                        </DrawerTrigger>
                        {/* <button onClick={() => {clearCookie()}} > */}
                            {/* <div className="text-white hover:cursor-pointer rounded font-medium text-sm flex items-center py-1.5 px-4 border-main  bg-main hover:bg-gray-100 hover:text-blue-700 focus:z-10">
                                <span>{cityName}</span>
                            </div> */}
                        {/* </button> */}
                        {cityName?.length > 0 ? (
                          <>
                            <div className="flex justify-end pr-3">
                              <div className="w-7 bg-sub h-1"></div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex sm:hidden"></div>
                  </>
                )}
              </div>
            </div>

            {/* Camada inferior de navegação */}
            {hidden ? null : (
              <div className="hidden sm:flex justify-center items-center h-[70px] bg-white w-[100%]">
                <div className="flex items-center justify-around w-[1140px]">
                  {navSecondyList?.map((second, index) => {
                    return (
                      <div>
                        {checkSecond(second) ? (
                          <div
                            key={second.title}
                            onMouseEnter={() => {
                              activeSecondHover(index, true);
                            }}
                            onMouseLeave={() => {
                              activeSecondHover(index, false);
                            }}
                            className="mr-8"
                          >
                            <a
                              rel="canonical"
                              href={`${second.external ? "" : "/"}${
                                second.path
                              }${getParams()}`}
                              target={second.external ? "_black" : ""}
                            >
                              <button
                                onClick={() => {
                                  sendDataLayer(second.title);
                                }}
                                className="flex items-center font-light text-sm text-gray-600 fade50"
                              >
                                <Image
                                  alt="Logo Alares Internet"
                                  src={second.icon}
                                  className="w-5 mr-2"
                                />
                                <div>
                                  <span className="text-main whitespace-nowrap">
                                    {second.title}
                                  </span>
                                  <div
                                    className={
                                      second.active || second.path === pathname
                                        ? "h-[2px] bg-main w-full animation_path"
                                        : ""
                                    }
                                  ></div>
                                </div>
                              </button>
                            </a>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}

                  {isLoading ? null : (
                    <div
                      onMouseEnter={() => {
                        setActiveSearch(true);
                      }}
                      onMouseLeave={() => {
                        setActiveSearch(false);
                      }}
                      className="mr-8"
                    >
                      <button
                        onClick={() => {
                          activeSeach();
                        }}
                        className="flex items-center font-light text-sm text-gray-600 fade50"
                      >
                        <Image
                          alt="Search icon"
                          src={searchIcon}
                          className="w-5 mr-2"
                        />
                        <div>
                          <span className="text-main whitespace-nowrap">
                            Buscar
                          </span>
                          <div
                            className={
                              activeSearch
                                ? "h-[2px] bg-main w-full animation_path"
                                : ""
                            }
                          ></div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
        <DrawerContent className="bg-main">
          <div className="m-0 w-full max-w-sm h-[90vh]">
            <CitySelector reload={true} check_city={false} isDrawer={true} />
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
