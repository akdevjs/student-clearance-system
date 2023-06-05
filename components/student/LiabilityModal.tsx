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
type LiabilityModalProps = {
  faculty: Faculty;
  setToggleModal: (status: boolean) => void;
  onSubmitRequest: (faculty: Faculty) => void;
};

const LiabilityModal: React.FC<LiabilityModalProps> = ({
  faculty,
  setToggleModal,
  onSubmitRequest,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white min-w-[400px] p-4 rounded shadow-md max-w-md">
        <h2 className="text-lg font-bold mb-4">
          Requested Liability - {faculty.name}
        </h2>
        <p className="mb-4">{faculty.LiabilityPending}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded mr-2"
            onClick={() => setToggleModal(false)}
          >
            Close
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
            onClick={() => {
              onSubmitRequest(faculty);
              setToggleModal(false);
            }}
          >
            Submit, Request Approval
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiabilityModal;
