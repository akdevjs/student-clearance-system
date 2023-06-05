import { atom } from "jotai";

// const userAtom = atom({
//   role: localStorage.getItem("user"),
//   signedIn: !(localStorage.getItem("user") === ""),
// });
const userAtom = atom({
  role: "",
  signedIn: false,
});
const stdAtom = atom({
  reg: "",
  signedIn: false,
});
export default userAtom;
export { stdAtom };
