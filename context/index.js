// https://www.youtube.com/watch?v=Yq9xyZ63Fgc&list=PLB_Wd4-5SGAbcvGsLzncFCrh-Dyt7wr5F&index=13
// https://youtu.be/Yq9xyZ63Fgc?t=140
import { createContext, useContext, useReducer } from "react";

const Store = createContext();

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
  // https://youtu.be/Yq9xyZ63Fgc?t=184
  const [state, dispatch] = useReducer(reducer, {
    name: "Grzegorz Brzęczyszczykiewicz ",
  });

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
