"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Play, RotateCcw, ArrowLeft, FileText, Clock, BarChart3, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

const demoContent = `
Artificial Intelligence (AI) has revolutionized numerous industries and continues to reshape how we work, communicate, and solve complex problems. From healthcare diagnostics to autonomous vehicles, AI technologies are becoming increasingly sophisticated and accessible.

Machine learning, a subset of AI, enables computers to learn and improve from experience without being explicitly programmed. This technology powers recommendation systems, fraud detection, natural language processing, and predictive analytics across various sectors.

The integration of AI in business operations has led to significant improvements in efficiency, accuracy, and decision-making processes. Companies are leveraging AI to automate routine tasks, analyze vast amounts of data, and provide personalized customer experiences.

However, the rapid advancement of AI also raises important ethical considerations, including privacy concerns, job displacement, and the need for responsible AI development. As we continue to embrace these technologies, it's crucial to establish frameworks that ensure AI benefits society while minimizing potential risks.

The future of AI holds immense promise, with emerging technologies like quantum computing and neuromorphic chips potentially unlocking even greater capabilities. As AI becomes more prevalent, understanding its implications and preparing for its continued evolution will be essential for individuals and organizations alike.
`

const demoSummary = `
AI has transformed industries through machine learning, enabling computers to learn from experience. This technology powers recommendation systems, fraud detection, and predictive analytics. Business integration of AI improves efficiency and decision-making through automation and data analysis. However, ethical considerations including privacy and job displacement require responsible development frameworks. Future AI advancement with quantum computing promises greater capabilities, making understanding its implications essential.
`

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { title: "Content Analysis", description: "AI analyzes the input text structure and content" },
    { title: "Key Point Extraction", description: "Identifying main ideas and important concepts" },
    { title: "Context Understanding", description: "Understanding relationships between concepts" },
    { title: "Summary Generation", description: "Creating concise, coherent summary" },
    { title: "Quality Optimization", description: "Refining and polishing the final output" },
  ]

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsPlaying(false)
          return 100
        }
        return prev + 2
      })
    }, 100)

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SmartBrief</span>
            </div>
          </div>
          <Link href="/register">
            <Button>Get Started Free</Button>
          </Link>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            See SmartBrief in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Action</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Watch how our AI transforms lengthy content into concise, actionable summaries in real-time. Experience the
            power of intelligent summarization.
          </p>
        </motion.div>

        {/* Demo Interface */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Original Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-6 h-96 overflow-y-auto">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">{demoContent}</p>
                </div>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <span>{demoContent.split(" ").length} words</span>
                  <span>~5 min read</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    AI Summary
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={startDemo}
                      disabled={isPlaying}
                      className="flex items-center"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {isPlaying ? "Processing..." : "Start Demo"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetDemo}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {!isPlaying && progress === 0 && (
                    <motion.div
                      key="ready"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-96"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Demonstrate</h3>
                      <p className="text-gray-600 text-center mb-4">
                        Click "Start Demo" to see AI summarization in action
                      </p>
                    </motion.div>
                  )}

                  {isPlaying && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap className="h-8 w-8 text-blue-600 animate-pulse" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">AI Processing Content</h3>
                        <Progress value={progress} className="w-full mb-4" />
                        <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
                      </div>

                      <div className="space-y-3">
                        {steps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0.3 }}
                            animate={{
                              opacity: index <= currentStep ? 1 : 0.3,
                              scale: index === currentStep ? 1.02 : 1,
                            }}
                            className={`flex items-center p-3 rounded-lg ${
                              index <= currentStep ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                index < currentStep
                                  ? "bg-green-500 text-white"
                                  : index === currentStep
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              {index < currentStep ? "✓" : index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{step.title}</p>
                              <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {progress === 100 && !isPlaying && (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Summary Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-blue-900">Reduction</p>
                          <p className="text-lg font-bold text-blue-600">78%</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <Clock className="h-6 w-6 text-green-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-green-900">Time Saved</p>
                          <p className="text-lg font-bold text-green-600">4 min</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <FileText className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-purple-900">Words</p>
                          <p className="text-lg font-bold text-purple-600">{demoSummary.split(" ").length}</p>
                        </div>
                      </div>

                      {/* Summary Content */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                        <p className="text-gray-800 leading-relaxed">{demoSummary}</p>
                      </div>

                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-800 border-green-200">✨ Summary Complete</Badge>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose SmartBrief?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Get summaries in seconds, not minutes. Our AI processes content at incredible speed.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">High Accuracy</h3>
                <p className="text-gray-600">
                  Advanced AI models ensure your summaries capture all key points and context.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Customization</h3>
                <p className="text-gray-600">
                  Adjust summary length and style to match your specific needs and preferences.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Content?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already saving time with AI-powered summarization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
