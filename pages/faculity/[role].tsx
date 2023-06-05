import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useEffect } from "react";
import userAtom from "../GlobalStates";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import ClearanceRequests from "@/components/faculity/ClearanceRequests";

export default function Faculity() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const { role } = router.query;

  useEffect(() => {
    if (!user.signedIn) {
      router.push("/404");
    }
  }, []);
  return (
    <section>
      <Header role={role} />
      <ClearanceRequests />
      <Footer />
    </section>
  );
}
