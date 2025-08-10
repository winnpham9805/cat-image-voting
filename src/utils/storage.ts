const SUB_ID_KEY = 'cat_voting_sub_id';

export const generateSubId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getSubId = (): string => {
  let subId = localStorage.getItem(SUB_ID_KEY);
  
  if (!subId) {
    subId = generateSubId();
    localStorage.setItem(SUB_ID_KEY, subId);
  }
  
  return subId;
};

export const clearSubId = (): void => {
  localStorage.removeItem(SUB_ID_KEY);
};
