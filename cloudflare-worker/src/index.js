/**
 * Cloudflare Worker for Vibhor Sogani
 * Endpoints:
 *   - POST /api/subscribe   -> Subscribes contact to Brevo via env.BREVO_KEY
 *   - GET  /api/projects    -> Returns all projects from Cloudflare D1
 *   - GET  /api/press       -> Returns all press articles from Cloudflare D1
 *   - GET  /api/health      -> Health check endpoint
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight handling
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const corsHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    // ── 1. POST /api/subscribe (Brevo Newsletter API) ─────────────
    if (url.pathname === "/api/subscribe" && request.method === "POST") {
      try {
        const { email, attributes } = await request.json();

        if (!email) {
          return new Response(
            JSON.stringify({ error: "Email is required" }),
            { status: 400, headers: corsHeaders }
          );
        }

        const brevoKey = env.BREVO_KEY;
        if (!brevoKey) {
          return new Response(
            JSON.stringify({ error: "BREVO_KEY is not configured in Worker environment" }),
            { status: 500, headers: corsHeaders }
          );
        }

        const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "api-key": brevoKey,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            email,
            attributes,
            updateEnabled: true,
          }),
        });

        const data = await brevoRes.json();
        return new Response(JSON.stringify(data), {
          status: brevoRes.status,
          headers: corsHeaders,
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // ── 2. GET /api/projects (Cloudflare D1 Query) ────────────────
    if (url.pathname === "/api/projects" && request.method === "GET") {
      try {
        if (!env.DB) {
          return new Response(
            JSON.stringify({ error: "D1 database binding 'DB' is not configured" }),
            { status: 500, headers: corsHeaders }
          );
        }

        const { results } = await env.DB.prepare("SELECT * FROM projects").all();
        // Parse JSON stored columns back to objects/arrays
        const parsed = results.map((row) => ({
          ...row,
          paragraphs: row.paragraphs ? JSON.parse(row.paragraphs) : [],
          images: row.images ? JSON.parse(row.images) : [],
        }));

        return new Response(JSON.stringify(parsed), { headers: corsHeaders });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // ── 3. GET /api/press (Cloudflare D1 Query) ───────────────────
    if (url.pathname === "/api/press" && request.method === "GET") {
      try {
        if (!env.DB) {
          return new Response(
            JSON.stringify({ error: "D1 database binding 'DB' is not configured" }),
            { status: 500, headers: corsHeaders }
          );
        }

        const { results } = await env.DB.prepare("SELECT * FROM press_articles").all();
        return new Response(JSON.stringify(results), { headers: corsHeaders });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // ── 4. Health Check / Root ────────────────────────────────────
    return new Response(
      JSON.stringify({
        status: "ok",
        service: "Vibhor Sogani Cloudflare API",
        endpoints: ["/api/subscribe", "/api/projects", "/api/press"],
      }),
      { headers: corsHeaders }
    );
  },
};
