import { get } from 'lodash';

export const getAuthToken = () => {
  try {
    const serializedState = localStorage.getItem('persist:state');
    if (serializedState === null) {
      return undefined
    }
    const state = JSON.parse(serializedState);
    const user = get(JSON.parse(state.user),'user',null);
    return user ? user?.access_token : null
  } catch (err) {
    return undefined
  }
};
