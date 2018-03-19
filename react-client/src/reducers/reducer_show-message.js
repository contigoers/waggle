export default function sendMessage(state = { message: 'Off!' }, action) {
  switch (action.type) {
    case ('TOGGLE_BUTTON'):
      return {
        message: state.message === 'Off!' ? 'On!' : 'Off!',
      };
    default:
      return state;
  }
}
