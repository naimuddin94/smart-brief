"use client"

import { motion } from "framer-motion"
import {
  Sparkles,
  ArrowLeft,
  Brain,
  Zap,
  FileText,
  Globe,
  Users,
  BarChart3,
  Shield,
  Clock,
  Download,
  Share2,
  Smartphone,
  Cloud,
  CheckCircle,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

const coreFeatures = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Powered by state-of-the-art language models for accurate summarization",
    features: ["GPT-4 integration", "Custom fine-tuned models", "Context-aware processing", "Multi-language support"],
  },
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Get summaries in seconds with our optimized infrastructure",
    features: ["Sub-30 second processing", "Parallel processing", "Auto-scaling servers", "99.9% uptime"],
  },
  {
    icon: FileText,
    title: "Multiple Content Types",
    description: "Summarize various content formats with ease",
    features: ["Text documents", "PDF files", "Web articles", "Research papers"],
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Process content in over 50 languages",
    features: ["Auto language detection", "Cross-language summaries", "Localized interfaces", "Cultural context"],
  },
]

const businessFeatures = [
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with shared workspaces",
    features: ["Shared folders", "Team permissions", "Comment system", "Version history"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track usage and optimize your content strategy",
    features: ["Usage analytics", "Performance metrics", "Content insights", "Custom reports"],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security for your sensitive content",
    features: ["End-to-end encryption", "SOC 2 compliance", "GDPR compliant", "Audit logs"],
  },
  {
    icon: Cloud,
    title: "API Integration",
    description: "Integrate SmartBrief into your existing workflow",
    features: ["RESTful API", "Webhooks", "SDK libraries", "Custom integrations"],
  },
]

const productivityFeatures = [
  {
    icon: Download,
    title: "Export Options",
    description: "Export summaries in multiple formats",
    badge: "Popular",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share summaries with team members instantly",
    badge: "New",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Summarize on-the-go with our mobile apps",
    badge: "Coming Soon",
  },
  {
    icon: Clock,
    title: "Scheduled Summaries",
    description: "Automate regular content summarization",
    badge: "Pro",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Manager",
    company: "TechCorp",
    content: "SmartBrief has revolutionized how we process research papers. What used to take hours now takes minutes.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Research Director",
    company: "Innovation Labs",
    content: "The accuracy and speed of summaries are incredible. It's become an essential tool for our team.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Marketing Lead",
    company: "Growth Co",
    content: "Perfect for summarizing market reports and competitor analysis. Highly recommended!",
    rating: 5,
  },
]

export default function FeaturesPage() {
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
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Every Need
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover all the features that make SmartBrief the most comprehensive AI summarization platform for
            individuals, teams, and enterprises.
          </p>
        </motion.div>

        {/* Core Features */}
        <motion.section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core AI Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI capabilities that power intelligent content summarization
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {coreFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Business Features */}
        <motion.section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Business & Enterprise</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional features designed for teams and organizations
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {businessFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <feature.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Productivity Features */}
        <motion.section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Productivity Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Features designed to boost your productivity and streamline workflows
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {productivityFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-2">{feature.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Testimonials */}
        <motion.section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust SmartBrief for their content summarization needs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience All Features?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your free trial today and discover how SmartBrief can transform your content workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                  >
                    Watch Demo
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
