import client from "../config/api";

export const getRates = () => {
  console.log("[API REQUEST] GET /rates/");
  return client.get("/rates/").then((res) => {
    console.log("[API RESPONSE] GET /rates/ Status: 200", res);
    return res;
  });
};

export const createAssessment = () => {
  console.log("[API REQUEST] POST /assessment/");
  return client.post("/assessment/").then((res) => {
    console.log("[API RESPONSE] POST /assessment/ Status: 200", res);
    return res;
  });
};

export const submitFlow1 = (assessmentId, payload) => {
  console.log(`[API REQUEST] POST /assessment/${assessmentId}/flow1`, payload);
  return client.post(`/assessment/${assessmentId}/flow1`, payload).then((res) => {
    console.log(`[API RESPONSE] POST /assessment/${assessmentId}/flow1 Status: 200`, res);
    return res;
  });
};

export const submitFlow2 = (assessmentId, payload) => {
  console.log(`[API REQUEST] POST /assessment/${assessmentId}/flow2`, payload);
  return client.post(`/assessment/${assessmentId}/flow2`, payload).then((res) => {
    console.log(`[API RESPONSE] POST /assessment/${assessmentId}/flow2 Status: 200`, res);
    return res;
  });
};

export const submitFlow3 = (assessmentId, payload) => {
  console.log(`[API REQUEST] POST /assessment/${assessmentId}/flow3`, payload);
  return client.post(`/assessment/${assessmentId}/flow3`, payload).then((res) => {
    console.log(`[API RESPONSE] POST /assessment/${assessmentId}/flow3 Status: 200`, res);
    return res;
  });
};

export const submitFlow4 = (assessmentId, payload) => {
  console.log(`[API REQUEST] POST /assessment/${assessmentId}/flow4`, payload);
  return client.post(`/assessment/${assessmentId}/flow4`, payload).then((res) => {
    console.log(`[API RESPONSE] POST /assessment/${assessmentId}/flow4 Status: 200`, res);
    return res;
  });
};

export const submitFlow5 = (assessmentId, payload) => {
  console.log(`[API REQUEST] POST /assessment/${assessmentId}/flow5`, payload);
  return client.post(`/assessment/${assessmentId}/flow5`, payload).then((res) => {
    console.log(`[API RESPONSE] POST /assessment/${assessmentId}/flow5 Status: 200`, res);
    return res;
  }).catch((err) => {
    console.warn(`[submitFlow5] Non-critical error posting to /assessment/${assessmentId}/flow5:`, err);
    return null;
  });
};

export const calculateRetirement = (assessmentId, payload) => {
  console.log(`[API REQUEST] POST /calculate/${assessmentId}`, payload);
  return client.post(`/calculate/${assessmentId}`, payload).then((res) => {
    console.log("==================================================");
    console.log("[CALCULATED VALUES FROM BACKEND (RAW JSON)]:", JSON.stringify(res, null, 2));
    console.log("==================================================");
    return res;
  });
};

export const getAssessment = (assessmentId) => {
  console.log(`[API REQUEST] GET /assessment/${assessmentId}`);
  return client.get(`/assessment/${assessmentId}`).then((res) => {
    console.log(`[API RESPONSE] GET /assessment/${assessmentId} Status: 200`, res);
    return res;
  });
};
