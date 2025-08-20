"use client";
import PreviewModalClient from "@/app/PreviewModalClient";

/**
 * PUBLIC_INTERFACE
 * ClientPreviewBoundary renders the global PreviewModal on the client side.
 * Kept separate to avoid using dynamic({ ssr: false }) in a Server Component.
 */
export default function ClientPreviewBoundary() {
  return <PreviewModalClient />;
}
