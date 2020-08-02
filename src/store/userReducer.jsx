const INITIAL_STATE = {
  userEmail: "",
  userIsLogged: 0,
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, userIsLogged: 1, userEmail: action.userEmail };
    case "LOG_OUT":
      return { ...state, userIsLogged: 0, userEmail: null };
    default:
      return state;
  }
}
