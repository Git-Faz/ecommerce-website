import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { loadProfile } from "@/features/user/api";
import { type UserInfo } from "@/features/user/types";

export default function useUserProfile() {
    return useQuery<UserInfo>({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const response = await loadProfile();
            return response.data;
        },
        placeholderData: keepPreviousData
    })
}