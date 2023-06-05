import React, { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

interface AddLiabilityModalProps {
  toggleModal: boolean;
  setToggleModal: (toggle: boolean) => void;
  onSendRequest: (liabilityPending: string, studentID: string) => void;
  studentRegistration: string;
}

const AddLiabilityModal: React.FC<AddLiabilityModalProps> = ({
  toggleModal,
  setToggleModal,
  onSendRequest,
  studentRegistration,
}) => {
  const [liabilityText, setLiabilityText] = useState(studentRegistration);

  const handleLiabilityChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLiabilityText(event.target.value);
  };

  const handleSendRequest = () => {
    onSendRequest(liabilityText, studentRegistration);
    setLiabilityText("");
    setToggleModal(false);
  };

  const handleCloseModal = () => {
    setLiabilityText("");
    setToggleModal(false);
  };

  const modalAnimation = useSpring({
    opacity: toggleModal ? 1 : 0,
    transform: toggleModal ? "translateY(0%)" : "translateY(-100%)",
  });

  return (
    <animated.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={modalAnimation}
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Add Liability Pending : {studentRegistration}
        </h2>
        <textarea
          className="w-full min-w-[400px] resize-none h-32 border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter liability details"
          value={liabilityText}
          onChange={handleLiabilityChange}
        ></textarea>
        <div className="flex justify-end">
          <button
            className="text-blue-500 font-medium mr-4"
            onClick={handleSendRequest}
          >
            Send Request
          </button>
          <button
            className="text-gray-500 font-medium"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default AddLiabilityModal;
