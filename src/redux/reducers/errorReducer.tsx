export default function errorReducer(
    state = null,
    action: { type: string; payload: string }
  ) {
    switch (action.type) {
      case 'SET_ERROR':
        return action.payload;
      default:
        return state;
    }
  }