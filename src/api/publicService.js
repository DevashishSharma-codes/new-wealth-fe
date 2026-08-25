import client from "../config/api";

/**
 * Fetch dynamic testimonials from backend API or local admin storage.
 * Normalizes all payload formats and returns active testimonials.
 */
export const getDynamicTestimonials = async () => {
  let rawList = [];

  // 1. Try GET /admin/testimonials
  try {
    const res = await client.get("/admin/testimonials");
    console.log("[getDynamicTestimonials] API /admin/testimonials raw:", res);
    const data = res?.data?.data || res?.data || res?.items || (Array.isArray(res) ? res : []);
    if (Array.isArray(data) && data.length > 0) {
      rawList = data;
    }
  } catch (err) {
    console.warn("[getDynamicTestimonials] /admin/testimonials error:", err?.message);
  }

  // 2. Try GET /testimonials fallback
  if (rawList.length === 0) {
    try {
      const res = await client.get("/testimonials");
      const data = res?.data?.data || res?.data || res?.items || (Array.isArray(res) ? res : []);
      if (Array.isArray(data) && data.length > 0) {
        rawList = data;
      }
    } catch (err) {
      console.warn("[getDynamicTestimonials] /testimonials error:", err?.message);
    }
  }

  // 3. Try localStorage ("ww_admin_testimonials", "ww_testimonials")
  if (rawList.length === 0) {
    try {
      const stored = localStorage.getItem("ww_admin_testimonials") || localStorage.getItem("ww_testimonials");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          rawList = parsed;
        }
      }
    } catch (e) {
      console.warn("[getDynamicTestimonials] localStorage error:", e);
    }
  }

  if (rawList.length === 0) {
    return [];
  }

  // Filter visible items and map normalized properties
  return rawList
    .filter((t) => {
      if (t.is_visible !== undefined) return Boolean(t.is_visible);
      if (t.visible !== undefined) return Boolean(t.visible);
      if (t.active !== undefined) return Boolean(t.active);
      return true;
    })
    .map((t, idx) => ({
      id: t.id || `t-${idx}`,
      name: t.client_name || t.name || "Satisfied Client",
      role: t.client_role || t.designation || t.role || "Verified Investor",
      text: t.review_message || t.testimonial || t.message || t.text || t.content || "",
      rating: t.rating || 5,
      avatar: t.avatar_url || t.avatar || "",
    }));
};

/**
 * Fetch dynamic services from backend API or local admin storage.
 * Normalizes all payload formats and returns active services.
 */
export const getDynamicServices = async () => {
  let rawList = [];

  // 1. Try GET /admin/services
  try {
    const res = await client.get("/admin/services");
    console.log("[getDynamicServices] API /admin/services raw:", res);
    const data = res?.data?.data || res?.data || res?.items || (Array.isArray(res) ? res : []);
    if (Array.isArray(data) && data.length > 0) {
      rawList = data;
    }
  } catch (err) {
    console.warn("[getDynamicServices] /admin/services error:", err?.message);
  }

  // 2. Try GET /services fallback
  if (rawList.length === 0) {
    try {
      const res = await client.get("/services");
      const data = res?.data?.data || res?.data || res?.items || (Array.isArray(res) ? res : []);
      if (Array.isArray(data) && data.length > 0) {
        rawList = data;
      }
    } catch (err) {
      console.warn("[getDynamicServices] /services error:", err?.message);
    }
  }

  // 3. Try localStorage ("ww_admin_services", "ww_services")
  if (rawList.length === 0) {
    try {
      const stored = localStorage.getItem("ww_admin_services") || localStorage.getItem("ww_services");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          rawList = parsed;
        }
      }
    } catch (e) {
      console.warn("[getDynamicServices] localStorage error:", e);
    }
  }

  if (rawList.length === 0) {
    return [];
  }

  return rawList
    .filter((s) => {
      if (s.is_visible !== undefined) return Boolean(s.is_visible);
      if (s.active !== undefined) return Boolean(s.active);
      return true;
    })
    .map((s, idx) => ({
      id: s.id || `srv-${idx}`,
      title: s.title || s.name || "",
      description: s.description || "",
      category: s.category || "Wealth Advisory",
      iconUrl: s.icon_url || s.icon || "",
    }));
};
