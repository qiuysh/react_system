import requset from "@/utils/request";
// import { stringify } from "qs";

export async function login(params: object) {
  return requset("/api/v1/login", {
    method: "POST",
    data: params,
  });
}
