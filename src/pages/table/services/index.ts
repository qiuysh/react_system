import requset from "@/utils/request";

export async function getPage(params: object) {
  return requset("/api/v1/table/list", {
    method: "GET",
    params,
  });
}
