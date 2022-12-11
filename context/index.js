// https://www.youtube.com/watch?v=Yq9xyZ63Fgc&list=PLB_Wd4-5SGAbcvGsLzncFCrh-Dyt7wr5F&index=13
// https://youtu.be/Yq9xyZ63Fgc?t=140
import { createContext, useContext, useReducer } from "react";
import { authConstants } from "./constants";

const Store = createContext();

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      return {
        ...state,
        user: {
          authenticating: true,
          ...state.user,
        },
      };
    }

    case authConstants.LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          // https://youtu.be/Yq9xyZ63Fgc?t=682
          // ...action.payload,
          // https://youtu.be/Yq9xyZ63Fgc?t=877
          ...action.payload.user,
          ...state.user,

          authenticating: false,
          authenticated: true,
        },
      };
    }

    case authConstants.LOGIN_FAILURE: {
      return {
        ...state,
        user: {
          ...state.user,
          error: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
  // https://youtu.be/Yq9xyZ63Fgc?t=184
  const [state, dispatch] = useReducer(reducer, {
    // name: "Grzegorz Brzęczyszczykiewicz ",
    user: {
      // https://youtu.be/Yq9xyZ63Fgc?t=440
      authenticated: false,
      authenticating: false,
      error: null,
    },
  });

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
