import client, { API_BASE_URL, API_KEY } from "./client";

export const generateReport = (assessmentId) => {
  console.log(`[API REQUEST] POST /report/${assessmentId}/generate`);
  return client.post(`/report/${assessmentId}/generate`).then((res) => {
    console.log("==================================================");
    console.log("[REPORT GENERATION RESPONSE (RAW JSON)]:", JSON.stringify(res, null, 2));
    console.log("==================================================");
    return res;
  });
};

export const getDownloadUrl = (assessmentId, reportId) => {
  return `${API_BASE_URL}/report/${assessmentId}/download/${reportId}?api_key=${API_KEY}`;
};

export const downloadGeneratedReport = (assessmentId, reportId) => {
  return client.get(`/report/${assessmentId}/download/${reportId}`, {
    responseType: "blob",
    headers: {
      Accept: "application/pdf",
    },
  });
};

export const checkReportStatus = (assessmentId, jobId) => {
  return client.get(`/report/${assessmentId}/status/${jobId}`);
};

export const createReportDownload = (reportBlob, assessmentId) => {
  const url = URL.createObjectURL(reportBlob);
  return {
    url,
    fileName: `wealth-wisdom-report-${assessmentId}.pdf`,
  };
};
