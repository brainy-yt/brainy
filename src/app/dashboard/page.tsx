"use client";
import { useEffect, useState } from "react";
import { Icon, Flex, SearchField, Image } from "@aws-amplify/ui-react";
export default function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [showSideBar, setShowSideBar] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  // It is your responsibility to set up onClear
  const onClear = () => {
    setValue("");
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      if (
        (windowWidth <= 800 && showSideBar) ||
        (windowWidth > 800 && !showSideBar)
      ) {
        console.log(showSideBar, windowWidth);
        setShowSideBar(!showSideBar);
      }
    });
  }, []);

  return (
    <main className="">
      <Flex gap="3px" className="relative h-screen w-screen  bg-gray-200">
        <div
          className={`h-screen max-w-[300px] transition-all duration-700 ease-in-out bg-orange-400 ${
            showSideBar ? "w-full" : "w-0"
          }`}
        >
          <div className="bg-white px-5 flex items-center justify-between h-14 w-full border-gray-200 border-b-[3px]">
            <div className="">Logo</div>
            <div className="">
              <Icon
                ariaLabel="Favorite"
                viewBox={{ width: 24, height: 24 }}
                pathData="m7.363 12l4.24 4.246q.141.14.154.342t-.153.366q-.16.16-.354.16t-.354-.16l-4.388-4.389q-.131-.13-.184-.267T6.271 12t.053-.298t.184-.267l4.388-4.389q.14-.14.341-.153t.367.153q.16.16.16.354t-.16.354zm6.1 0l4.24 4.246q.141.14.154.342t-.153.366q-.16.16-.354.16t-.354-.16l-4.388-4.389q-.131-.13-.184-.267q-.053-.136-.053-.298t.053-.298t.184-.267l4.388-4.389q.14-.14.342-.153t.366.153q.16.16.16.354t-.16.354z"
                className="hover:cursor-pointer h-32 w-32"
                onClick={() => setShowSideBar(!showSideBar)}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-screen bg-white">
          <div className="bg-white h-14 w-full border-b-[3px] flex justify-center items-center">
            <div className="flex justify-between items-center w-full p-3">
              <SearchField
                label="Search"
                placeholder="Search here..."
                className="max-w-md"
                onChange={onChange}
                onClear={onClear}
                value={value}
              />
              <div className="flex items-center gap-3">
                {/* <Image
                  src="/road-to-milford-new-zealand-800w.jpg"
                  alt="View from road to Milford Sound, New Zealand.
  Glittering stream with old log, snowy mountain peaks
  tower over a green field."
                /> */}
                <span>Name</span>
                <div>Icon</div>
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </main>
  );
}
