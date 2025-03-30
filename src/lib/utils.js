  import { REACT_APP_API_URL } from "./constants";
  
  export const getAvatarUrl = (data) => {
    if (!data || !data.avatar_id || data.avatar_id === 1) {
      return `${REACT_APP_API_URL}/avatars/avatar1.png`
    }
    return `${REACT_APP_API_URL}/avatars/avatar${data.avatar_id}.png`
  };
