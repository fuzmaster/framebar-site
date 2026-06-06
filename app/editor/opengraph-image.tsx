import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const runtime = "edge";
export const alt = `${SITE_NAME} — Editor`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0d10",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          color: "#e6edf3",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#5eead4",
              color: "#0b0d10",
              fontSize: 38,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            F
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>{SITE_NAME} · Editor</div>
        </div>

        <div
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Build a transparent
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#5eead4",
            }}
          >
            progress overlay.
          </div>
          <div style={{ fontSize: 26, color: "#9aa6b2", marginTop: 18 }}>
            Set duration · pick a preset · export PNG sequence.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 70,
            display: "flex",
            height: 12,
            borderRadius: 6,
            background: "rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              width: "78%",
              height: 12,
              borderRadius: 6,
              background: "#5eead4",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
