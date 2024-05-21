"use client";
import { Hub } from "aws-amplify/utils";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { Button } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
export default function SignUp() {
  // defining states
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check if user is authenticated
    const fetchUser = async () => {
      try {
        const user = await fetchUserAttributes();
        if (user) {
          setIsLoggedIn(true);
          router.push("/dashboard");
        }
        console.log("error: ", user);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    return () => {
      fetchUser();
    };
  }, []);

  // listen to auth events
  Hub.listen("auth", (data) => {
    switch (data.payload.event) {
      case "signedIn":
        router.push("/dashboard");
        break;
      case "signedOut":
        setIsLoggedIn(false);
        router.push("/");
        break;
    }
  });

  return (
    <main className=" bg-white h-screen w-full">
      <div className="w-full flex justify-between items-center px-4 h-16 border-b">
        <p className="font-semibold">Logo</p>
        <Button backgroundColor="#047D95" style={{ borderRadius: "9999px" }}>
          <p className="text-sm text-white">
            Sign {isLoggedIn ? <span>Out</span> : <span>In</span>}
          </p>
        </Button>
      </div>
      <div className="h-[calc(100%-4rem)] w-full flex justify-center items-center px-4">
        <div>
          <Authenticator>
            {({ signOut, user }) => (
              <main>
                <h1>Hello {user?.username}</h1>
                <button onClick={signOut}>Sign out</button>
              </main>
            )}
          </Authenticator>
          <p className="text-sm py-5 text-gray-600 sm:text-center dark:text-gray-primary">
            © {new Date().getFullYear()}
            <span className="hover:underline"> Brainy</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
