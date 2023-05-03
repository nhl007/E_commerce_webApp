const reducer = ({ state, action }) => {
  if (action.type === '') {
  } else throw new Error('Invalid action type: ' + action.type);
};

export default reducer;
