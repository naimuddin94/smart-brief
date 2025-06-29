"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  FileText,
  Upload,
  History,
  Settings,
  Plus,
  TrendingUp,
  Clock,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { recentSummaries } from "@/constants";
import Logo from "@/components/shared/Logo";
import {
  useGetProfileQuery,
  useLogoutMutation,
} from "@/redux/features/auth/authApi";
import { useGetHistoryQuery } from "@/redux/features/summarize/summarizeApi";
import moment from "moment";
import { HistoryDialog } from "@/components/shared/HistoryDialog";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

export default function DashboardPage() {
  const [totalCredits] = useState(5);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isLoading } = useGetProfileQuery({});
  const { data: historyData, isLoading: historyLoading } = useGetHistoryQuery({
    limit: 3,
  });

  const [logoutFn] = useLogoutMutation();

  const handleLogout = () => {
    logoutFn({})
      .unwrap()
      .then((res) => {
        if (res?.success) {
          dispatch(removeUser());
          toast.success(res?.message);
          router.push("/");
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Something went wrong!");
      });
  };

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
          <Logo />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">
                {data?.data?.credits} credits left
              </span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">
            Ready to summarize some content? You have {data?.data?.credits}{" "}
            credits remaining.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Credits Left
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data?.data?.credits}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress
                    value={(Number(data?.data?.credits) / totalCredits) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {data?.data?.credits} of {totalCredits} credits
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Summaries
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data?.data?.stats?.totalSummary}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  +{data?.data?.stats?.lastWeekSummary} from last week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-6">
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
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Avg.{" "}
                  {(
                    Number(data?.data?.stats?.totalWordProcess) /
                    Number(data?.data?.stats?.totalSummary) /
                    1000
                  ).toFixed(2)}
                  K per summary
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-6">
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
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Estimated reading time
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 ">
                <Link href="/summarize">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full justify-start" size="lg">
                      <FileText className="h-5 w-5 mr-3" />
                      New Text Summary
                    </Button>
                  </motion.div>
                </Link>

                <Link href="/summarize">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="lg"
                    >
                      <Upload className="h-5 w-5 mr-3" />
                      Upload Document
                    </Button>
                  </motion.div>
                </Link>

                <Link href="/history">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="lg"
                    >
                      <History className="h-5 w-5 mr-3" />
                      View History
                    </Button>
                  </motion.div>
                </Link>

                {data?.data?.credits === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                  >
                    <p className="text-sm text-orange-800 font-medium mb-2">
                      Out of Credits
                    </p>
                    <p className="text-xs text-orange-600 mb-3">
                      You've used all your free credits. Upgrade to continue
                      summarizing.
                    </p>
                    <Button size="sm" className="w-full">
                      Upgrade Plan
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <History className="h-5 w-5 mr-2" />
                    Recent Summaries
                  </span>
                  <Link href="/history">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historyData?.data.map((summary, index) => (
                    <motion.div
                      key={summary._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {summary.summary.split(" ").slice(0, 6).join(" ")}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            {summary.totalWord} words → {summary.summaryWord}{" "}
                            words
                          </span>
                          <span>
                            {moment(summary.createdAt).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{summary.type}</Badge>
                        <HistoryDialog summary={summary}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </HistoryDialog>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
