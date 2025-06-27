"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowLeft, Code, Key, Zap, Shield, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

const codeExamples = {
  curl: `curl -X POST https://api.smartbrief.com/v1/summarize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Your long text content here...",
    "type": "balanced",
    "length": 30
  }'`,
  javascript: `const response = await fetch('https://api.smartbrief.com/v1/summarize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'Your long text content here...',
    type: 'balanced',
    length: 30
  })
});

const result = await response.json();
console.log(result.summary);`,
  python: `import requests

url = "https://api.smartbrief.com/v1/summarize"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "content": "Your long text content here...",
    "type": "balanced",
    "length": 30
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result["summary"])`,
}

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(type)
    setTimeout(() => setCopiedCode(null), 2000)
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
            <Link href="/support">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Support
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SmartBrief API</span>
            </div>
          </div>
          <Link href="/register">
            <Button>Get API Key</Button>
          </Link>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            SmartBrief
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> API</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Integrate AI-powered summarization into your applications with our simple and powerful REST API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#quickstart">View Quickstart</Link>
            </Button>
          </div>
        </motion.div>

        {/* API Features */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: Zap,
              title: "Fast & Reliable",
              description: "Sub-second response times with 99.9% uptime",
            },
            {
              icon: Shield,
              title: "Secure",
              description: "Enterprise-grade security and data protection",
            },
            {
              icon: Code,
              title: "RESTful",
              description: "Simple REST API with JSON responses",
            },
            {
              icon: Key,
              title: "Easy Auth",
              description: "Simple API key authentication",
            },
          ].map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.section>

        {/* Quickstart */}
        <motion.section
          id="quickstart"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Quick Start</CardTitle>
              <p className="text-gray-600">Get started with the SmartBrief API in minutes</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">1. Get Your API Key</h3>
                  <p className="text-gray-600 mb-4">
                    Sign up for a SmartBrief account and get your API key from the dashboard.
                  </p>
                  <Button asChild>
                    <Link href="/register">Get API Key</Link>
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">2. Make Your First Request</h3>
                  <p className="text-gray-600 mb-4">Use the /summarize endpoint to create your first summary:</p>

                  <Tabs defaultValue="curl" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>

                    {Object.entries(codeExamples).map(([key, code]) => (
                      <TabsContent key={key} value={key}>
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2"
                            onClick={() => copyCode(code, key)}
                          >
                            {copiedCode === key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">3. Handle the Response</h3>
                  <p className="text-gray-600 mb-4">The API returns a JSON response with your summary:</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{`{
  "id": "sum_1234567890",
  "summary": "Your AI-generated summary appears here...",
  "original_length": 1500,
  "summary_length": 150,
  "reduction_percentage": 90,
  "processing_time": 0.8,
  "created_at": "2024-01-15T10:30:00Z"
}`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* API Reference */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Summarize Endpoint */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-green-100 text-green-800">POST</Badge>
                    <code className="text-lg font-mono">/v1/summarize</code>
                  </div>
                  <p className="text-gray-600 mb-4">Create a summary from text content.</p>

                  <h4 className="font-semibold mb-2">Request Body</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 border-b">Parameter</th>
                          <th className="text-left p-3 border-b">Type</th>
                          <th className="text-left p-3 border-b">Required</th>
                          <th className="text-left p-3 border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border-b font-mono">content</td>
                          <td className="p-3 border-b">string</td>
                          <td className="p-3 border-b">Yes</td>
                          <td className="p-3 border-b">The text content to summarize (max 50,000 characters)</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-b font-mono">type</td>
                          <td className="p-3 border-b">string</td>
                          <td className="p-3 border-b">No</td>
                          <td className="p-3 border-b">
                            Summary type: "concise", "balanced", or "comprehensive" (default: "balanced")
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 border-b font-mono">length</td>
                          <td className="p-3 border-b">integer</td>
                          <td className="p-3 border-b">No</td>
                          <td className="p-3 border-b">
                            Summary length as percentage of original (10-50, default: 30)
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono">language</td>
                          <td className="p-3">string</td>
                          <td className="p-3">No</td>
                          <td className="p-3">Language code for content (auto-detected if not provided)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Get Summary Endpoint */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-blue-100 text-blue-800">GET</Badge>
                    <code className="text-lg font-mono">/v1/summaries/{`{id}`}</code>
                  </div>
                  <p className="text-gray-600 mb-4">Retrieve a previously created summary.</p>
                </div>

                {/* List Summaries Endpoint */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-blue-100 text-blue-800">GET</Badge>
                    <code className="text-lg font-mono">/v1/summaries</code>
                  </div>
                  <p className="text-gray-600 mb-4">List all summaries for your account with pagination.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Rate Limits */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Rate Limits & Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Authentication</h3>
                  <p className="text-gray-600 mb-4">Include your API key in the Authorization header:</p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Rate Limits</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free: 5 requests/month</li>
                    <li>• Pro: 100 requests/month</li>
                    <li>• Team: 500 requests/month</li>
                    <li>• Enterprise: Custom limits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Error Codes */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Error Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border-b">Code</th>
                      <th className="text-left p-3 border-b">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b font-mono">400</td>
                      <td className="p-3 border-b">Bad Request - Invalid parameters</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-mono">401</td>
                      <td className="p-3 border-b">Unauthorized - Invalid API key</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-mono">429</td>
                      <td className="p-3 border-b">Rate Limit Exceeded</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-mono">500</td>
                      <td className="p-3 border-b">Internal Server Error</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono">503</td>
                      <td className="p-3">Service Unavailable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Build with SmartBrief?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get your API key and start integrating AI-powered summarization into your applications today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    Get API Key
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
