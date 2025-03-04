import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access Denied. Please sign in.</p>;
  }

  return <p>Welcome, {session.user?.name}!</p>;
}



