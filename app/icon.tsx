import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#08090D",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#3B82F6",
          fontWeight: 800,
          borderRadius: 8,
          border: "1.5px solid #8B5CF6",
          letterSpacing: "-0.5px",
        }}
      >
        SM
      </div>
    ),
    {
      ...size,
    }
  );
}
