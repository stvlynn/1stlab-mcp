import LandingLayout from "@/templates/tailspark/landing/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Servers",
  description: "The largest collection of MCP Servers, including Awesome MCP Servers and Claude MCP integration. Search and discover MCP servers to enhance your AI capabilities.",
  keywords: "MCP Servers, Awesome MCP Servers, Claude MCP, Model Context Protocol",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/`,
  },
};

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LandingLayout>{children}</LandingLayout>;
}
