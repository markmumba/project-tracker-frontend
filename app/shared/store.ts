import { create } from "zustand";
import { UserDetails } from "./types";

interface AuthState {
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  successMessage: null,
  setSuccessMessage: (message) => set({ successMessage: message }),
}));

interface SubmissionState {
  selectedSubmissionId: number | null;
  setSelectedSubmissionId: (id: number) => void;
}

export const useSubmissionStore = create<SubmissionState>((set) => ({
  selectedSubmissionId: null,
  setSelectedSubmissionId: (id: number) => set({ selectedSubmissionId: id }),
}));

interface UserState {
  user: UserDetails | null;
  setUser: (user: UserDetails | null) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));
