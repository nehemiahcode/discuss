import Profile from "@/components/common/profile";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

function ProfilePage({ params }: Params) {
  return (
    <>
      <Profile userId={params.id} />
    </>
  );
}

export default ProfilePage;
