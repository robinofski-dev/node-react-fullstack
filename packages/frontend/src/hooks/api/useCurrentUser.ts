import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@node-react-fullstack/shared";

const CURRENT_USER_KEY = ["currentUser"] as const;

const fetchCurrentUser = async (): Promise<User | null> => {
  const res = await fetch("/api/me", { credentials: "include" });
  return res.ok ? res.json() : null;
};

export const useCurrentUser = () => {
  const { data: user, isPending } = useQuery({
    queryKey: CURRENT_USER_KEY,
    queryFn: fetchCurrentUser,
  });

  return { user: user ?? null, isPending };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return async function logout() {
    await fetch("/auth/logout", { method: "DELETE", credentials: "include" });
    queryClient.setQueryData(CURRENT_USER_KEY, null);
  };
};
