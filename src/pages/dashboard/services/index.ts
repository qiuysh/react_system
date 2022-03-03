import requset from "@/utils/request";
// import { stringify } from "qs";

export async function getDashboard(params?: object) {
  return requset("/api/v1/dashboard/list", {
    method: "GET",
    params,
  });
}
