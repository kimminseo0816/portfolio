import { useQuery, useQueries } from "react-query";
import { fetchMessages } from "./utils/index";

export const useMessageQuery = (roomID) =>
  useQuery(["records", roomID], () => fetchMessages(roomID));
