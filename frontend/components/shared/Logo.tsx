import { Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900">SmartBrief</span>
      </div>
    </Link>
  );
}
