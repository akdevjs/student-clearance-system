import { useEffect, useState } from "react";
import LiabilityModal from "./LiabilityModal";
import { stdAtom } from "@/pages/GlobalStates";
import { useAtom } from "jotai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

type ClearanceStatus =
  | "Not Requested"
  | "Pending"
  | "Requested Liability"
  | "Approved";

type Faculty = {
  name?: string;
  status?: ClearanceStatus;
  LiabilityPending?: string;
};

const RequestStudentClearance = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Faculty[]>([{}]);
  const [std] = useAtom(stdAtom);
  const [loading, setLoading] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty>({});

  const handleRequestClearance = async (faculty: Faculty) => {
    const studentRef = doc(db, "students", std.reg);
    if (faculty.name === "Librarian") {
      await updateDoc(studentRef, {
        Librarian: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "I/C Electronics Lab") {
      await updateDoc(studentRef, {
        ElectronicLab: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "I/C Computer Lab") {
      await updateDoc(studentRef, {
        ComputerLab: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Project Coordinator") {
      await updateDoc(studentRef, {
        ProjectCoordinator: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Printing Office") {
      await updateDoc(studentRef, {
        PrintingOffice: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Cafeteria Incharge") {
      await updateDoc(studentRef, {
        CafeteriaIncharge: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Transport Incharge") {
      await updateDoc(studentRef, {
        TransportIncharge: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "I/C Boys Hostel") {
      await updateDoc(studentRef, {
        BoysHostel: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Alumni Office") {
      await updateDoc(studentRef, {
        AlumniOffice: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Kicsit Store") {
      await updateDoc(studentRef, {
        KicsitStore: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Accounts") {
      await updateDoc(studentRef, {
        Accounts: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Sports Incharge") {
      await updateDoc(studentRef, {
        SportsIncharge: {
          status: "Pending",
        },
      });
    } else if (faculty.name === "Card Office") {
      await updateDoc(studentRef, {
        CardOffice: {
          status: "Pending",
        },
      });
    } else {
      await updateDoc(studentRef, {
        HODKicsit: {
          status: "Pending",
        },
      });
    }
    getData();

    console.log(`Request clearance for ${faculty.name}`);
  };

  const getData = async () => {
    setLoading(true);
    const docRef = doc(db, "students", std.reg);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData([
        {
          name: "Librarian",
          status: docSnap.data().Librarian.status,
          LiabilityPending: docSnap.data().Librarian.liabilityPending,
        },
        {
          name: "I/C Electronics Lab",
          status: docSnap.data().ElectronicLab.status,
          LiabilityPending: docSnap.data().ElectronicLab.liabilityPending,
        },
        {
          name: "I/C Computer Lab",
          status: docSnap.data().ComputerLab.status,
          LiabilityPending: docSnap.data().ComputerLab.liabilityPending,
        },
        {
          name: "Project Coordinator",
          status: docSnap.data().ProjectCoordinator.status,
          LiabilityPending: docSnap.data().ProjectCoordinator.liabilityPending,
        },
        {
          name: "Printing Office",
          status: docSnap.data().PrintingOffice.status,
          LiabilityPending: docSnap.data().PrintingOffice.liabilityPending,
        },
        {
          name: "Cafeteria Incharge",
          status: docSnap.data().CafeteriaIncharge.status,
          LiabilityPending: docSnap.data().CafeteriaIncharge.liabilityPending,
        },
        {
          name: "Transport Incharge",
          status: docSnap.data().TransportIncharge.status,
          LiabilityPending: docSnap.data().TransportIncharge.liabilityPending,
        },
        {
          name: "I/C Boys Hostel",
          status: docSnap.data().BoysHostel.status,
          LiabilityPending: docSnap.data().BoysHostel.liabilityPending,
        },
        {
          name: "Alumni Office",
          status: docSnap.data().AlumniOffice.status,
          LiabilityPending: docSnap.data().AlumniOffice.liabilityPending,
        },
        {
          name: "Kicsit Store",
          status: docSnap.data().KicsitStore.status,
          LiabilityPending: docSnap.data().KicsitStore.liabilityPending,
        },
        {
          name: "Accounts",
          status: docSnap.data().Accounts.status,
          LiabilityPending: docSnap.data().Accounts.liabilityPending,
        },
        {
          name: "Sports Incharge",
          status: docSnap.data().SportsIncharge.status,
          LiabilityPending: docSnap.data().SportsIncharge.liabilityPending,
        },
        {
          name: "Card Office",
          status: docSnap.data().CardOffice.status,
          LiabilityPending: docSnap.data().CardOffice.liabilityPending,
        },
        {
          name: "PA/PSO HOD Kicsit",
          status: docSnap.data().HODKicsit.status,
          LiabilityPending: docSnap.data().HODKicsit.liabilityPending,
        },
      ]);
      setLoading(false);
    }
  };

  const handleSeeMessage = (faculty: Faculty) => {
    setShowModal(true);
    setSelectedFaculty(faculty);
    console.log(`See message for ${faculty.name}`);
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Student Clearance Request - {std.reg}
      </h1>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b">Faculty</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Status</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((faculty) => (
              <tr key={faculty.name}>
                <td className="py-2 text-center px-4 border-b">
                  {faculty.name}
                </td>
                <td
                  className={`py-2 text-center px-4 border-b ${
                    faculty.status === "Pending"
                      ? "text-red-500"
                      : faculty.status === "Approved"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                    `}
                >
                  {faculty.status}
                </td>
                <td className="py-2 text-center px-4 border-b">
                  {faculty.status === "Not Requested" && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                      onClick={() => handleRequestClearance(faculty)}
                    >
                      Request Clearance
                    </button>
                  )}
                  {faculty.status === "Requested Liability" && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
                      onClick={() => handleSeeMessage(faculty)}
                    >
                      See Message
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <LiabilityModal
          faculty={selectedFaculty}
          onSubmitRequest={handleRequestClearance}
          setToggleModal={setShowModal}
        />
      )}
    </div>
  );
};

export default RequestStudentClearance;
