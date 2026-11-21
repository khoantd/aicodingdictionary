"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Fallback from "./Fallback";
import s from "./Atlas.module.css";

const Atlas = dynamic(() => import("./Atlas"), { ssr: false, loading: () => <main className={s.pending} /> });

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

/** Decides between the 3D map and the plain fallback, the same way the original does. */
export default function Experience() {
  const [mode, setMode] = useState<"pending" | "map" | "fallback">("pending");
  useEffect(() => {
    setMode(webglAvailable() ? "map" : "fallback");
  }, []);
  if (mode === "pending") return <main className={s.pending} id="main-content" />;
  if (mode === "fallback") return <Fallback />;
  return <Atlas onFail={() => setMode("fallback")} />;
}
