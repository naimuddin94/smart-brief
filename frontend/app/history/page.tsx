"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  ArrowLeft,
  Calendar,
  FileText,
  Clock,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { useGetHistoryQuery } from "@/redux/features/summarize/summarizeApi";
import { HistoryDialog } from "@/components/shared/HistoryDialog";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "concise":
        return "bg-blue-100 text-blue-800";
      case "balanced":
        return "bg-green-100 text-green-800";
      case "comprehensive":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const { data, isLoading } = useGetProfileQuery({});
  const { data: historyData, isLoading: historyLoading } = useGetHistoryQuery(
    {}
  );

  if (isLoading || historyLoading) {
    return (
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-16"
      >
        <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-6" />
        <p className="text-gray-600 text-lg font-medium">
          Summarizing your content, hang tight...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                SmartBrief
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {data?.data?.credits} credits left
            </Badge>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Summary History
          </h1>
          <p className="text-gray-600">
            View and manage all your AI-generated summaries
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search summaries..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="comprehensive">
                        Comprehensive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title">Title A-Z</SelectItem>
                      <SelectItem value="length">By Length</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Summaries
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data?.data?.stats?.totalSummary}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Words Processed
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(
                        Number(data?.data?.stats?.totalWordProcess) / 1000
                      ).toFixed(2)}
                      K
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Time Saved
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(Number(data?.data?.stats?.totalSavedTime) / 60).toFixed(
                        2
                      )}
                      h
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Avg. Reduction
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {historyData?.data && historyData.data.length > 0
                        ? (
                            historyData.data.reduce(
                              (acc, item) => acc + item.reduction,
                              0
                            ) / historyData.data.length
                          ).toFixed(1)
                        : "0.0"}
                      %
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Summary List */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {historyData?.data?.map((summary, index) => (
            <motion.div
              key={summary._id}
              variants={fadeInUp}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {summary.summary.split(" ").slice(0, 15).join(" ")}
                        </h3>
                        <Badge className={getTypeColor(summary.type)}>
                          {summary.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {summary.totalWord} → {summary.summaryWord} words
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(summary.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4" />
                          {Math.round(
                            (1 - summary.summaryWord / summary.totalWord) * 100
                          )}
                          % reduction
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {summary.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <HistoryDialog summary={summary}>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Summary
                          </DropdownMenuItem>
                        </HistoryDialog>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {historyData?.data?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No summaries found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first summary to get started"}
            </p>
            <Link href="/summarize">
              <Button>Create New Summary</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
