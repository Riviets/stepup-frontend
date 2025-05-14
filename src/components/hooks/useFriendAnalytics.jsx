import { useQuery } from "@tanstack/react-query";
import { trackerService } from "../../services/trackerService";

const useFriendAnalytics = (friendId) => {
  return useQuery({
    queryKey: ["friendAnalytics", friendId],
    queryFn: () => trackerService.getFriendAnalytics(friendId),
  });
};

export default useFriendAnalytics;
