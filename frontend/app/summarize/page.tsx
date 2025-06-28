"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Wand2,
  Copy,
  Download,
  RefreshCw,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import mammoth from "mammoth";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useGetSummaryMutation } from "@/redux/features/summarize/summarizeApi";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function SummarizePage() {
  const [inputText, setInputText] = useState<string>("");
  const [summaryLength, setSummaryLength] = useState<number[]>([30]);
  const [summaryType, setSummaryType] = useState<string>("balanced");
  const [summary, setSummary] = useState<string>("");
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const [summaryWordCount, setSummaryWordCount] = useState<number>(0);
  const [reducedTime, setReducedTime] = useState<number>(0);

  const [copied, setCopied] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (text: string) => {
    setInputText(text);
    setWordCount(
      text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    );
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        handleTextChange(content);
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".docx")) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        handleTextChange(result.value || "");
      } catch (error) {
        toast.error("Failed to read .docx file.");
      }
    } else {
      toast.error(
        "Unsupported file type. Only .txt and .docx files are allowed."
      );
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const [summarizeFn, { isLoading }] = useGetSummaryMutation();

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setShowSummary(false);
    summarizeFn(inputText.trim())
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          setSummary(res.data?.summary);
          setWordCount(res.data?.totalContentWordCount);
          setSummaryWordCount(res.data?.summaryWordCount);
          setReducedTime(res.data?.reduceTime);
          setShowSummary(true);
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Something went wrong!");
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 700);
  };

  const handleExport = async (type: "txt" | "docx") => {
    if (type === "txt") {
      const blob = new Blob([summary], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "summary.txt");
    } else if (type === "docx") {
      const zip = new JSZip();
      zip.file(
        "word/document.xml",
        `<w:document><w:body><w:p><w:r><w:t>${summary}</w:t></w:r></w:p></w:body></w:document>`
      );
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "summary.docx");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <Badge variant="secondary">3 credits left</Badge>
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
            AI Content Summarizer
          </h1>
          <p className="text-gray-600">
            Transform lengthy content into concise, actionable summaries
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Input Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content">Paste your content here</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your article or text content here..."
                    className="min-h-[300px] resize-none"
                    value={inputText}
                    onChange={(e) => handleTextChange(e.target.value)}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{wordCount} words</span>
                    <span>Max: 10,000 words</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Or upload a document
                  </p>
                  <input
                    type="file"
                    accept=".txt,.docx"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={triggerFileSelect}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Choose File
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports .txt, .docx files up to 10MB
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Summary Type</Label>
                  <Select value={summaryType} onValueChange={setSummaryType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="comprehensive">
                        Comprehensive
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Label>Summary Length: {summaryLength[0]}%</Label>
                  <Slider
                    value={summaryLength}
                    onValueChange={setSummaryLength}
                    max={50}
                    min={10}
                    step={5}
                  />
                </div>

                <Button
                  onClick={handleSummarize}
                  disabled={!inputText.trim() || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />{" "}
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5 mr-2" /> Generate Summary
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    AI Summary
                  </span>
                  {showSummary && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <div className="flex items-center">
                          <motion.span
                            animate={
                              copied
                                ? {
                                    scale: [1, 1.4, 1],
                                    color: ["#000000", "#3b82f6", "#000000"],
                                  } // black → blue → black
                                : { scale: 1, color: "#000000" }
                            }
                            transition={{ duration: 0.5 }}
                            className="mr-1"
                          >
                            <Copy className="h-4 w-4" />
                          </motion.span>
                          Copy
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExport("txt")}
                      >
                        Download
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {isLoading && (
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
                  )}

                  {!isLoading && showSummary && (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-800 leading-relaxed">
                          {summary}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>Total Words:</strong> {wordCount}
                        </p>
                        <p>
                          <strong>Summary Words:</strong> {summaryWordCount}
                        </p>
                        <p>
                          <strong>Time Saved:</strong> ~{reducedTime} mins
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
