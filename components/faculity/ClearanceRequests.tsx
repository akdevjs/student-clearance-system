import React, { useEffect, useState } from "react";
import { FilterIcon, RefreshIcon } from "@heroicons/react/outline";
import AddLiabilityModal from "./AddLiabilityModal";
import userAtom from "@/pages/GlobalStates";
import { useAtom } from "jotai/react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import dummyStudents from "@/dummyStudents";
import { useRouter } from "next/router";

interface StudentType {
  name?: string;
  registrationNumber?: string;
  status?: string;
  liabilityPending?: string;
  password?: string;
  id?: string;
}

const ClearanceRequests = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [filter, setFilter] = useState("all");
  const [students, setStudents] = useState<StudentType[]>([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [stdreg, setStdReg] = useState<string>("");

  const router = useRouter();
  console.log(router.pathname.includes("faculity"));
  // Fetching Students from firebase
  const getStudents = async () => {
    const dummyArr: StudentType[] = [];
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
      if (
        user.role === "librarian" &&
        doc.data().Librarian.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().Librarian.status,
          liabilityPending: doc.data().Librarian.liabilityPending,
        });
      } else if (
        user.role === "electronicsLab" &&
        doc.data().ElectronicLab.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().ElectronicLab.status,
          liabilityPending: doc.data().ElectronicLab.liabilityPending,
        });
      } else if (
        user.role === "computerLab" &&
        doc.data().ComputerLab.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().ComputerLab.status,
          liabilityPending: doc.data().ComputerLab.liabilityPending,
        });
      } else if (
        user.role === "projectCoordinator" &&
        doc.data().ProjectCoordinator.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().ProjectCoordinator.status,
          liabilityPending: doc.data().ProjectCoordinator.liabilityPending,
        });
      } else if (
        user.role === "printingOffice" &&
        doc.data().PrintingOffice.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().PrintingOffice.status,
          liabilityPending: doc.data().PrintingOffice.liabilityPending,
        });
      } else if (
        user.role === "cafeteriaIncharge" &&
        doc.data().CafeteriaIncharge.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().PrintingOffice.status,
          liabilityPending: doc.data().CafeteriaIncharge.liabilityPending,
        });
      } else if (
        user.role === "transportIncharge" &&
        doc.data().TransportIncharge.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().TransportIncharge.status,
          liabilityPending: doc.data().TransportIncharge.liabilityPending,
        });
      } else if (
        user.role === "boysHostel" &&
        doc.data().BoysHostel.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().BoysHostel.status,
          liabilityPending: doc.data().BoysHostel.liabilityPending,
        });
      } else if (
        user.role === "alumniOffice" &&
        doc.data().AlumniOffice.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().AlumniOffice.status,
          liabilityPending: doc.data().AlumniOffice.liabilityPending,
        });
      } else if (
        user.role === "kicsitStore" &&
        doc.data().KicsitStore.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().KicsitStore.status,
          liabilityPending: doc.data().KicsitStore.liabilityPending,
        });
      } else if (
        user.role === "accounts" &&
        doc.data().Accounts.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().Accounts.status,
          liabilityPending: doc.data().Accounts.liabilityPending,
        });
      } else if (
        user.role === "sportsIncharge" &&
        doc.data().SportsIncharge.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().SportsIncharge.status,
          liabilityPending: doc.data().SportsIncharge.liabilityPending,
        });
      } else if (
        user.role === "cardOffice" &&
        doc.data().CardOffice.status !== "Not Requested"
      ) {
        dummyArr.push({
          name: doc.data().name,
          registrationNumber: doc.data().registrationNumber,
          id: doc.id,
          status: doc.data().CardOffice.status,
          liabilityPending: doc.data().CardOffice.liabilityPending,
        });
      } else {
        if (doc.data().HODKicsit.status !== "Not Requested") {
          dummyArr.push({
            name: doc.data().name,
            registrationNumber: doc.data().registrationNumber,
            id: doc.id,
            status: doc.data().HODKicsit.status,
            liabilityPending: doc.data().HODKicsit.liabilityPending,
          });
        }
      }
    });
    setStudents(dummyArr);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getStudents();
  }, []);

  // Filter the students based on the selected filter
  const filteredStudents = students.filter((student) => {
    if (filter === "all") return true;
    if (filter === "pending") return student.status === "Pending";
    if (filter === "approved") return student.status === "Approved";
    if (filter === "requestedLiability")
      return student.status === "Requested Liability";
    return false;
  });

  // Handle filter change
  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  // Handle Approve action
  const handleApprove = async (studentID: any) => {
    console.log(`Approve student: ${studentID}`);

    const studentRef = doc(db, "students", studentID);

    if (user.role === "librarian") {
      await updateDoc(studentRef, {
        Librarian: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "electronicsLab") {
      await updateDoc(studentRef, {
        ElectronicLab: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "computerLab") {
      await updateDoc(studentRef, {
        ComputerLab: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "projectCoordinator") {
      await updateDoc(studentRef, {
        ProjectCoordinator: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "printingOffice") {
      await updateDoc(studentRef, {
        PrintingOffice: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "cafeteriaIncharge") {
      await updateDoc(studentRef, {
        CafeteriaIncharge: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "transportIncharge") {
      await updateDoc(studentRef, {
        TransportIncharge: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "boysHostel") {
      await updateDoc(studentRef, {
        BoysHostel: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "alumniOffice") {
      await updateDoc(studentRef, {
        AlumniOffice: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "kicsitStore") {
      await updateDoc(studentRef, {
        KicsitStore: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "accounts") {
      await updateDoc(studentRef, {
        Accounts: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "sportsIncharge") {
      await updateDoc(studentRef, {
        SportsIncharge: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else if (user.role === "cardOffice") {
      await updateDoc(studentRef, {
        CardOffice: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    } else {
      await updateDoc(studentRef, {
        HODKicsit: {
          liabilityPending: "",
          status: "Approved",
        },
      });
    }

    handleRefresh();
  };

  // function to add students
  const addStudents = () => {
    const users = [
      {
        role: "librarian",
        email: "librarian@ist.edu.pk",
        password: "uN1qu3P@ss",
      },
      {
        role: "electronicsLab",
        email: "electronicsLab@ist.edu.pk",
        password: "H@rdC0d3dP@ss",
      },
      {
        role: "computerLab",
        email: "computerLab@ist.edu.pk",
        password: "Str0ngP@ssw0rd",
      },
      {
        role: "projectCoordinator",
        email: "projectCoordinator@ist.edu.pk",
        password: "C0mpl3xP@ss",
      },
      {
        role: "printingOffice",
        email: "printingOffice@ist.edu.pk",
        password: "P@ssw0rd123",
      },
      {
        role: "cafeteriaIncharge",
        email: "cafeteriaIncharge@ist.edu.pk",
        password: "H@rdC0d3dP@ssw0rd",
      },
      {
        role: "transportIncharge",
        email: "transportIncharge@ist.edu.pk",
        password: "P@ssw0rd!",
      },
      {
        role: "boysHostel",
        email: "boysHostel@ist.edu.pk",
        password: "SecureP@ssw0rd",
      },
      {
        role: "alumniOffice",
        email: "alumniOffice@ist.edu.pk",
        password: "P@ssw0rd1234",
      },
      {
        role: "kicsitStore",
        email: "kicsitStore@ist.edu.pk",
        password: "C0mpl3xP@ssw0rd",
      },
      {
        role: "accounts",
        email: "accounts@ist.edu.pk",
        password: "H@rdC0d3dP@ss",
      },
      {
        role: "sportsIncharge",
        email: "sportsIncharge@ist.edu.pk",
        password: "S3cur3P@ss",
      },
      {
        role: "cardOffice",
        email: "cardOffice@ist.edu.pk",
        password: "P@ssw0rd123!",
      },
      {
        role: "hodKicsit",
        email: "hodKicsit@ist.edu.pk",
        password: "C0mpl3xP@ss!",
      },
    ];
    users.forEach(async (user) => {
      await setDoc(doc(db, "faculity", user.role), user);
      console.log("Done for : ", user.role);
    });
  };

  // Handle Request Liability action
  const handleRequestLiability = (studentID: any) => {
    setStdReg(studentID);
    setToggleModal(true);
  };

  // Handle Refresh action
  const handleRefresh = () => {
    setLoading(true);
    getStudents();
  };

  //   Sending the requested Liability
  const onSendRequest = async (liabilityPending: string, studentID: string) => {
    const studentRef = doc(db, "students", studentID);
    if (user.role === "librarian") {
      await updateDoc(studentRef, {
        Librarian: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "electronicsLab") {
      await updateDoc(studentRef, {
        ElectronicLab: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "computerLab") {
      await updateDoc(studentRef, {
        ComputerLab: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "projectCoordinator") {
      await updateDoc(studentRef, {
        ProjectCoordinator: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "printingOffice") {
      await updateDoc(studentRef, {
        PrintingOffice: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "cafeteriaIncharge") {
      await updateDoc(studentRef, {
        CafeteriaIncharge: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "transportIncharge") {
      await updateDoc(studentRef, {
        TransportIncharge: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "boysHostel") {
      await updateDoc(studentRef, {
        BoysHostel: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "alumniOffice") {
      await updateDoc(studentRef, {
        AlumniOffice: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "kicsitStore") {
      await updateDoc(studentRef, {
        KicsitStore: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "accounts") {
      await updateDoc(studentRef, {
        Accounts: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "sportsIncharge") {
      await updateDoc(studentRef, {
        SportsIncharge: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else if (user.role === "cardOffice") {
      await updateDoc(studentRef, {
        CardOffice: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    } else {
      await updateDoc(studentRef, {
        HODKicsit: {
          status: "Requested Liability",
          liabilityPending: liabilityPending,
        },
      });
    }

    handleRefresh();
  };

  return (
    <div className="min-h-screen p-4">
      <AddLiabilityModal
        toggleModal={toggleModal}
        studentRegistration={stdreg}
        setToggleModal={setToggleModal}
        onSendRequest={onSendRequest}
      />
      <div className="flex md:flex-row flex-col items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Clearance Requests</h1>
        <div className="flex items-center space-x-2">
          <button
            className={`flex items-center px-3 py-1 space-x-1 font-medium rounded-lg focus:outline-none ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "text-blue-500 hover:bg-gray-100"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            <span>All</span>
            <FilterIcon className="w-4 h-4" />
          </button>
          <button
            className={`flex items-center px-3 py-1 space-x-1 font-medium rounded-lg focus:outline-none ${
              filter === "pending"
                ? "bg-red-500 text-white"
                : "text-red-500 hover:bg-gray-100"
            }`}
            onClick={() => handleFilterChange("pending")}
          >
            <span>Pending</span>
            <FilterIcon className="w-4 h-4" />
          </button>
          <button
            className={`flex items-center px-3 py-1 space-x-1 font-medium rounded-lg focus:outline-none ${
              filter === "approved"
                ? "bg-green-500 text-white"
                : "text-green-500 hover:bg-gray-100"
            }`}
            onClick={() => handleFilterChange("approved")}
          >
            <span>Approved</span>
            <FilterIcon className="w-4 h-4" />
          </button>
          <button
            className={`flex items-center px-3 py-1 space-x-1 font-medium rounded-lg focus:outline-none ${
              filter === "requestedLiability"
                ? "bg-yellow-500 text-white"
                : "text-yellow-500 hover:bg-gray-100"
            }`}
            onClick={() => handleFilterChange("requestedLiability")}
          >
            <span>Requested Liability</span>
            <FilterIcon className="w-4 h-4" />
          </button>
          <button
            className="flex items-center px-3 py-1 space-x-1 font-medium text-blue-500 hover:bg-gray-100 rounded-lg focus:outline-none"
            onClick={handleRefresh}
          >
            <span>Refresh</span>
            <RefreshIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <table className="w-full overflow-auto border">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-white bg-blue-600">Sno</th>
              <th className="px-4 py-2 border text-white bg-blue-600">
                Registration Number
              </th>
              <th className="px-4 py-2 border text-white bg-blue-600">Name</th>
              <th className="px-4 py-2 border text-white bg-blue-600">
                Status
              </th>
              <th className="px-4 py-2 border text-white bg-blue-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={
                  student.registrationNumber +
                  "##" +
                  index +
                  "##" +
                  student.registrationNumber
                }
              >
                <td className="px-4 py-2 text-center border">{index + 1}</td>
                <td className="px-4 py-2 text-center border">
                  {student.registrationNumber}
                </td>
                <td className="px-4 py-2 text-center border">{student.name}</td>
                <td className="px-4 py-2 text-center border">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      student.status === "Pending"
                        ? "text-red-500"
                        : student.status === "Approved"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center border">
                  {student.status === "Pending" && (
                    <>
                      <button
                        className="px-2 py-1 text-sm text-green-500 hover:text-green-700 focus:outline-none"
                        onClick={() =>
                          handleApprove(student.registrationNumber)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="px-2 py-1 text-sm text-yellow-500 hover:text-yellow-700 focus:outline-none"
                        onClick={() =>
                          handleRequestLiability(student.registrationNumber)
                        }
                      >
                        Request Liability
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClearanceRequests;
