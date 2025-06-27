"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import {
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Book,
  Video,
  FileText,
  Users,
  Zap,
  Shield,
  CreditCard,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { supportSchema, type SupportFormData } from "@/lib/validations/auth"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7",
    action: "Start Chat",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    availability: "Response within 24h",
    action: "Send Email",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our team",
    availability: "Mon-Fri 9AM-6PM EST",
    action: "Call Now",
    color: "bg-purple-100 text-purple-600",
  },
]

const faqCategories = [
  {
    icon: Zap,
    title: "Getting Started",
    count: 8,
    faqs: [
      {
        question: "How do I create my first summary?",
        answer:
          "Simply paste your content into the text area on the summarize page, choose your preferred summary type and length, then click 'Generate Summary'. Your first 5 summaries are free!",
      },
      {
        question: "What file formats are supported?",
        answer:
          "We currently support .txt and .docx files up to 10MB. We're working on adding support for PDF files and other formats.",
      },
      {
        question: "How accurate are the AI summaries?",
        answer:
          "Our AI models achieve high accuracy by focusing on key concepts and maintaining context. However, we recommend reviewing summaries for critical use cases.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Credits",
    count: 6,
    faqs: [
      {
        question: "How does the credit system work?",
        answer:
          "Each summary costs 1 credit. Free accounts get 5 credits. Pro accounts get 100 credits monthly, and Enterprise accounts have unlimited credits.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "We offer refunds within 30 days of purchase if you're not satisfied with our service. Contact support for assistance.",
      },
      {
        question: "Do credits expire?",
        answer:
          "Credits don't expire, but they're tied to your subscription. If you downgrade or cancel, unused credits from that tier will be lost.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    count: 5,
    faqs: [
      {
        question: "Is my content stored permanently?",
        answer:
          "No, we only store your content temporarily during processing. Original content is deleted after summarization, and only saved summaries are retained.",
      },
      {
        question: "How secure is my data?",
        answer:
          "We use enterprise-grade encryption and security measures. All data is processed in secure, isolated environments with strict access controls.",
      },
      {
        question: "Can I delete my account and data?",
        answer:
          "Yes, you can delete your account and all associated data at any time through your account settings or by contacting support.",
      },
    ],
  },
  {
    icon: Settings,
    title: "Technical Issues",
    count: 7,
    faqs: [
      {
        question: "Why is my summary taking so long to generate?",
        answer:
          "Processing time depends on content length and current server load. Most summaries complete within 30 seconds. If it takes longer, try refreshing the page.",
      },
      {
        question: "I'm getting an error when uploading files",
        answer:
          "Ensure your file is under 10MB and in a supported format (.txt or .docx). Clear your browser cache and try again. If the issue persists, contact support.",
      },
      {
        question: "The summary doesn't seem accurate for my content",
        answer:
          "Try adjusting the summary type or length settings. For highly technical content, use 'Comprehensive' mode. You can also regenerate the summary for different results.",
      },
    ],
  },
]

const resources = [
  {
    icon: Book,
    title: "Documentation",
    description: "Comprehensive guides and tutorials",
    link: "/docs",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    link: "/tutorials",
  },
  {
    icon: FileText,
    title: "API Reference",
    description: "Technical documentation for developers",
    link: "/api-docs",
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with other users",
    link: "/community",
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: "",
      email: "",
      category: undefined,
      subject: "",
      message: "",
    },
  })

  const filteredFaqs = faqCategories.filter((category) => {
    if (selectedCategory === "all") return true
    return category.title.toLowerCase().includes(selectedCategory.toLowerCase())
  })

  const onSubmit = async (data: SupportFormData) => {
    setIsLoading(true)
    try {
      // Handle form submission
      console.log("Support form submitted:", data)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Show success message
      form.reset()
    } catch (error) {
      console.error("Support form error:", error)
    } finally {
      setIsLoading(false)
    }
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
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How can we
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              help you?
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get the support you need to make the most of SmartBrief. Our team is here to help you succeed.
          </p>
        </motion.div>

        {/* Support Options */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {supportOptions.map((option, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <option.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-3">{option.description}</p>
                  <Badge variant="secondary" className="mb-4">
                    <Clock className="h-3 w-3 mr-1" />
                    {option.availability}
                  </Badge>
                  <Button className="w-full">{option.action}</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</CardTitle>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search FAQs..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {faqCategories.map((category) => (
                      <SelectItem key={category.title} value={category.title.toLowerCase()}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredFaqs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <category.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                      <Badge variant="outline" className="ml-2">
                        {category.count} articles
                      </Badge>
                    </div>
                    <div className="space-y-2 ml-11">
                      {category.faqs
                        .filter(
                          (faq) =>
                            searchTerm === "" ||
                            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
                        )
                        .map((faq, faqIndex) => {
                          const faqId = `${categoryIndex}-${faqIndex}`
                          return (
                            <div key={faqIndex} className="border rounded-lg">
                              <button
                                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                onClick={() => setExpandedFaq(expandedFaq === faqId ? null : faqId)}
                              >
                                <span className="font-medium text-gray-900">{faq.question}</span>
                                {expandedFaq === faqId ? (
                                  <ChevronUp className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-gray-500" />
                                )}
                              </button>
                              {expandedFaq === faqId && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="px-4 pb-3 text-gray-600 border-t bg-gray-50"
                                >
                                  <p className="pt-3">{faq.answer}</p>
                                </motion.div>
                              )}
                            </div>
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="md:col-span-2 lg:col-span-4 text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Additional Resources</h2>
            <p className="text-gray-600">Explore our comprehensive resources to get the most out of SmartBrief</p>
          </div>
          {resources.map((resource, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link href={resource.link}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <resource.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm">{resource.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Contact Our Support Team</CardTitle>
              <p className="text-gray-600 text-center">
                Can't find what you're looking for? Send us a message and we'll get back to you soon.
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="account">Account Help</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Please describe your issue or question in detail..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-blue-100 mb-6">
                Our support team is available 24/7 to assist you with any questions or issues.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Mail className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <p className="font-medium">Email</p>
                  <p className="text-blue-100 text-sm">support@smartbrief.com</p>
                </div>
                <div>
                  <Phone className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <p className="font-medium">Phone</p>
                  <p className="text-blue-100 text-sm">+1 (555) 123-4567</p>
                </div>
                <div>
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <p className="font-medium">Live Chat</p>
                  <p className="text-blue-100 text-sm">Available 24/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
