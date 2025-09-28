import { create } from 'zustand';

interface UserInfo {
  id: string;
  companyName: string;
  phoneNumber: string;
  isLoggedIn: boolean;
}

interface UserStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: Partial<UserInfo>) => void;
  login: (userInfo: Omit<UserInfo, 'isLoggedIn'>) => void;
  logout: () => void;
}

const defaultUserInfo: UserInfo = {
  id: '',
  companyName: '',
  phoneNumber: '',
  isLoggedIn: false,
};

export const useUserStore = create<UserStore>((set) => ({
  userInfo: defaultUserInfo,
  setUserInfo: (newUserInfo) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...newUserInfo },
    })),
  login: (userInfo) =>
    set({
      userInfo: { ...userInfo, isLoggedIn: true },
    }),
  logout: () =>
    set({
      userInfo: defaultUserInfo,
    }),
}));