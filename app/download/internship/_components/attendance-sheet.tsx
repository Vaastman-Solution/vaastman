"use client";

import { EB_Garamond, Noto_Serif } from "next/font/google";
import Image from "next/image";
import { ONLINE_ACTIVITIES } from "../lib/attendance-data";

/* ── Fonts ──────────────────────────────────────────────────────── */

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ── Types ──────────────────────────────────────────────────────── */

export type AttendanceSheetData = {
  name: string;
  registrationNo: string;
  honoursSubject: string;
  courseName: string;
  universityRollNo: string;
  gender: string;
};

/* ── Helpers ────────────────────────────────────────────────────── */

/** Truncate a URL to a max character length, adding "..." */
function truncateUrl(url: string, maxLen: number): string {
  if (url.length <= maxLen) return url;
  return `${url.slice(0, maxLen - 3)}...`;
}

/* ── Single-page A4 portrait: 794 x 1123 ────────────────────── */

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

/* ── Component ──────────────────────────────────────────────────── */

export function AttendanceSheet({ data }: { data: AttendanceSheetData }) {
  // Split items into two columns
  const mid = Math.ceil(ONLINE_ACTIVITIES.length / 2);
  const col1 = ONLINE_ACTIVITIES.slice(0, mid);
  const col2 = ONLINE_ACTIVITIES.slice(mid);

  const pronoun =
    data.gender.toLowerCase() === "male" || data.gender.toLowerCase() === "m"
      ? "his"
      : data.gender.toLowerCase() === "female" ||
          data.gender.toLowerCase() === "f"
        ? "her"
        : "his/her";

  return (
    <div
      id="attendance-sheet"
      style={{
        width: `${PAGE_WIDTH}px`,
        height: `${PAGE_HEIGHT}px`,
        background: "#fff",
        position: "relative",
        overflow: "hidden",
        fontFamily: notoSerif.style.fontFamily,
        boxSizing: "border-box",
        padding: "36px 40px 50px",
      }}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "3px solid #c0392b",
          paddingBottom: "10px",
          marginBottom: "16px",
        }}
      >
        <Image
          src="/certificate/logo.png"
          alt="Vaastman Logo"
          width={50}
          height={50}
          style={{ objectFit: "contain", height: "auto", marginRight: "12px" }}
          unoptimized
        />
        <h1
          className={ebGaramond.className}
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "#c0392b",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "1px",
          }}
        >
          Vaastman Solutions Pvt. Ltd.
        </h1>
      </div>

      {/* ── Student info paragraph ────────────────────────── */}
      <div
        style={{
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#111",
          marginBottom: "14px",
          textAlign: "justify",
        }}
      >
        This is to certify that Mr./ Ms. <strong>{data.name}</strong>,
        University Roll No. <strong>{data.universityRollNo}</strong>,
        Registration No. <strong>{data.registrationNo}</strong>,
        {data.courseName}, MJC subject{" "}
        <strong>{data.honoursSubject}</strong> has successfully gone through the
        following online classes/activities as part of {pronoun} internship
        requirement for the respective classes:
      </div>

      {/* ── Section title ─────────────────────────────────── */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#222",
          marginBottom: "8px",
          paddingLeft: "6px",
        }}
      >
        Online activities links:
      </div>

      {/* ── Two-column activity links ─────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          paddingLeft: "6px",
        }}
      >
        {/* Column 1 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {col1.map((item) => {
            const isTest = item.label.startsWith("Test");
            return (
              <div
                key={`${item.label}-1`}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "4px",
                  padding: "2.5px 0",
                  fontSize: "11px",
                  lineHeight: 1.45,
                }}
              >
                <span
                  style={{
                    color: isTest ? "#c0392b" : "#222",
                    flexShrink: 0,
                    fontSize: "9px",
                  }}
                >
                  ➤
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: "#222",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}:
                </span>
                <span
                  style={{
                    color: "#1a0dab",
                    textDecoration: "underline",
                    fontSize: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {truncateUrl(item.url, 42)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Column 2 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {col2.map((item) => {
            const isTest = item.label.startsWith("Test");
            return (
              <div
                key={`${item.label}-2`}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "4px",
                  padding: "2.5px 0",
                  fontSize: "11px",
                  lineHeight: 1.45,
                }}
              >
                <span
                  style={{
                    color: isTest ? "#c0392b" : "#222",
                    flexShrink: 0,
                    fontSize: "9px",
                  }}
                >
                  ➤
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: "#222",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}:
                </span>
                <span
                  style={{
                    color: "#1a0dab",
                    textDecoration: "underline",
                    fontSize: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {truncateUrl(item.url, 42)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            fontStyle: "italic",
            color: "#333",
            fontFamily: notoSerif.style.fontFamily,
          }}
        >
          Vaastman Solutions Pvt. Ltd.
        </span>
        <Image
          src="/certificate/stamp.png"
          alt="Company Stamp"
          width={50}
          height={50}
          style={{ objectFit: "contain", height: "auto" }}
          unoptimized
        />
      </div>
    </div>
  );
}
