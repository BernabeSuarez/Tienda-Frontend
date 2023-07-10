import { useAuth } from "../context/AuthContext";
import { Button } from "@chakra-ui/react";

function Home() {
  const { logout } = useAuth();

  return (
    <div>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}

export default Home;
