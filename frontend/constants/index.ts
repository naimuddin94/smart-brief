import { TNavItems } from "@/types";
import { Zap, Shield, Users, Brain } from "lucide-react";

export const recentSummaries = [
  {
    id: 1,
    title: "Market Analysis Report Q4 2024",
    wordCount: 2500,
    summaryLength: 250,
    createdAt: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    title: "Product Requirements Document",
    wordCount: 1800,
    summaryLength: 180,
    createdAt: "1 day ago",
    status: "completed",
  },
  {
    id: 3,
    title: "Research Paper on AI Ethics",
    wordCount: 5000,
    summaryLength: 500,
    createdAt: "3 days ago",
    status: "completed",
  },
];

export const features = [
  {
    icon: Brain,
    title: "AI-Powered Summarization",
    description:
      "Advanced AI technology to create concise, accurate summaries from your content",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get your summaries in seconds, not minutes. Optimized for speed and efficiency",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your content is protected with enterprise-grade security and privacy measures",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share and collaborate on summaries with your team members seamlessly",
  },
];

export const plans = [
  {
    name: "Free",
    price: "$0",
    credits: "5 credits",
    features: ["Basic summarization", "Text input only", "Standard support"],
  },
  {
    name: "Pro",
    price: "$19",
    credits: "100 credits",
    features: [
      "Advanced AI models",
      "File uploads",
      "Priority support",
      "Team sharing",
    ],
  },
  {
    name: "Enterprise",
    price: "$99",
    credits: "Unlimited",
    features: [
      "Custom AI models",
      "API access",
      "24/7 support",
      "Advanced analytics",
    ],
  },
];

export const userNavItems: TNavItems = [
  {
    name: "Features",
    href: "/features",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Demo",
    href: "/demo",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export const adminNavItems: TNavItems = [
  {
    name: "Features",
    href: "/features",
  },
  {
    name: "Package",
    href: "/pricing",
  },
  {
    name: "User Management",
    href: "/admin/users",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];
