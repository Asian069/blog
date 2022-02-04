import request from "./request.js";

export async function getSetting(){
    return await request.get("/api/setting");
}