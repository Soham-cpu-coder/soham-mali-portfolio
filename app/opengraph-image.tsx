import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const runtime = "edge";
export const alt = "Soham Mali - Full Stack Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090D",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
          padding: "64px 80px",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#0F1117",
              border: "1.5px solid rgba(139, 92, 246, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#3B82F6",
            }}
          >
            SM
          </div>
          <span style={{ fontSize: 24, fontWeight: 600, color: "rgba(255, 255, 255, 0.8)" }}>
            {profile.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              color: "#93C5FD",
            }}
          >
            {profile.role}
          </div>
          <div style={{ fontSize: 28, color: "#9CA3AF", maxWidth: 850 }}>
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          {profile.stack.slice(0, 6).map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#E5E7EB",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
