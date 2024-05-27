import ProfileCard from "./page.client";
import { getCookies } from "@/libs/cookies";

const Profile = async () => {
  const cookies = await getCookies("session");

  return <ProfileCard name={cookies?.user.name} email={cookies?.user.email} />;
};

export default Profile;
