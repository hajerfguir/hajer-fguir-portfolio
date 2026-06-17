import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// HF monogram favicon. A neutral dark rounded badge with light lettering
// reads cleanly against both light and dark browser tab backgrounds.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "-1px",
          borderRadius: 7,
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        HF
      </div>
    ),
    {
      ...size,
    }
  )
}
