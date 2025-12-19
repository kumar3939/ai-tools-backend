import axios from "axios";

export async function checkWebsiteStatus(url) {
  const start = Date.now();

  try {
    const res = await axios.get(url, {
      timeout: 5000,
      validateStatus: () => true
    });

    return {
      reachable: true,
      status_code: res.status,
      response_time_ms: Date.now() - start
    };
  } catch (err) {
    return {
      reachable: false,
      error: err.code || "CONNECTION_FAILED"
    };
  }
}

