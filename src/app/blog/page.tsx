import type { Metadata } from "next";
import { BlogPage } from "@/components/refonte/content-pages";

export const metadata: Metadata = { title: "Blog · Koding Schools" };

export default function Page() { return <BlogPage />; }
