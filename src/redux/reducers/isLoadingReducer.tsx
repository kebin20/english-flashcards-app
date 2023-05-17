export default function isLoadingReducer(
    state = null,
    action: {
      payload: boolean;
      type: string;
    }
  ) {
    switch (action.type) {
      case 'SET_IS_LOADING':
        return action.payload;
      default:
        return state;
    }
  }
  