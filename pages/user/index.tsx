/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

interface UserData {
  username: string;
  email: string;
  image: string;
  token: string;
}

function UserPage() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [showToken, setShowToken] = useState(false);
  // useEffect(() => {
  //   const storedData = localStorage.getItem("userData");
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     setUserData(parsedData);
  //   } else {
  //     router.push("/login");
  //   }
  // }, []);

  const handleShowToken = () => {
    setShowToken(!showToken);
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-2 p-24">
      <h1>User</h1>
      {userData && (
        <div>
          <p>Name: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <img src={userData.image} alt="image" />
        </div>
      )}

      <Button onClick={handleShowToken}>Show Token</Button>
      {showToken && userData && (
        <div className="token">
          <p>Token: {userData.token}</p>
        </div>
      )}
    </div>
  );
}

export default UserPage;
