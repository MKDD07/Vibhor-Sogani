export async function subscribeToNewsletter(email, interests = []) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid email address." };
  }

  // 1. Live Cloudflare Worker endpoint
  const workerEndpoint = 
    import.meta.env.VITE_NEWSLETTER_API_URL || 
    "https://vibhor-sogani.mkmkataria07.workers.dev/api/subscribe";

  try {
    const response = await fetch(workerEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes: {
          INTERESTS: interests.join(", "),
          SOURCE: "Vibhor Sogani Website",
        },
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    // Try parsing error message from response
    const data = await response.json().catch(() => ({}));
    return { 
      success: false, 
      error: data.message || data.error || "Subscription request failed. Please try again." 
    };
  } catch (err) {
    // If the endpoint is not yet deployed or unreachable, log for development
    console.warn("Newsletter API call error:", err);
    return { 
      success: false, 
      error: "Unable to connect to newsletter service. Please try again later." 
    };
  }
}
