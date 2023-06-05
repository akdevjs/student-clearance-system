import React, { useEffect } from "react";
import { stdAtom } from "../../GlobalStates";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import RequestStudentClearance from "@/components/student/RequestStudentClearance";
function Student() {
  const [std, setStd] = useAtom(stdAtom);
  const router = useRouter();
  const { reg } = router.query;
  useEffect(() => {
    if (!std.signedIn) {
      router.push("/404");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header role={reg} />
      <RequestStudentClearance />
    </>
  );
}

export default Student;
