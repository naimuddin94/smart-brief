"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowLeft, Check, X, Star, Zap, Users, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
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

const plans = [
  {
    name: "Free",
    icon: Sparkles,
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: "5 credits/month",
    description: "Perfect for trying out SmartBrief",
    features: [
      "5 summaries per month",
      "Basic AI models",
      "Text input only",
      "Standard support",
      "Basic export options",
    ],
    limitations: ["No file uploads", "No team features", "No API access", "No priority support"],
    popular: false,
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    icon: Zap,
    monthlyPrice: 19,
    yearlyPrice: 190,
    credits: "100 credits/month",
    description: "Ideal for professionals and content creators",
    features: [
      "100 summaries per month",
      "Advanced AI models",
      "File uploads (PDF, DOCX)",
      "Priority support",
      "All export formats",
      "Team sharing",
      "Analytics dashboard",
      "Custom summary styles",
    ],
    limitations: [],
    popular: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Team",
    icon: Users,
    monthlyPrice: 49,
    yearlyPrice: 490,
    credits: "500 credits/month",
    description: "Built for teams and small businesses",
    features: [
      "500 summaries per month",
      "Advanced AI models",
      "Unlimited file uploads",
      "Team collaboration",
      "Shared workspaces",
      "User management",
      "Advanced analytics",
      "API access (basic)",
      "Priority support",
    ],
    limitations: [],
    popular: false,
    cta: "Start Team Trial",
  },
  {
    name: "Enterprise",
    icon: Crown,
    monthlyPrice: 199,
    yearlyPrice: 1990,
    credits: "Unlimited credits",
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited summaries",
      "Custom AI models",
      "Advanced security",
      "SSO integration",
      "Dedicated support",
      "Custom integrations",
      "Advanced API access",
      "Audit logs",
      "SLA guarantee",
      "Custom training",
    ],
    limitations: [],
    popular: false,
    cta: "Contact Sales",
  },
]

const faqs = [
  {
    question: "What happens when I exceed my credit limit?",
    answer:
      "When you reach your monthly credit limit, you can either upgrade your plan or wait until the next billing cycle. We'll notify you when you're approaching your limit.",
  },
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer:
      "Yes! Annual billing saves you 2 months compared to monthly billing. You'll see the savings when you toggle to annual pricing above.",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

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
            Simple, Transparent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free and scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <span className={`text-lg ${!isYearly ? "text-gray-900 font-medium" : "text-gray-500"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-lg ${isYearly ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Yearly
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`h-full relative ${
                  plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-gray-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      <span className="text-lg text-gray-600">
                        {plan.monthlyPrice === 0 ? "" : isYearly ? "/year" : "/month"}
                      </span>
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        ${Math.round(plan.yearlyPrice / 12)}/month billed annually
                      </p>
                    )}
                    <p className="text-blue-600 font-medium mt-2">{plan.credits}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Not included:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-start">
                            <X className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg" asChild>
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Compare All Features</h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold text-gray-900">Features</th>
                      <th className="text-center p-4 font-semibold text-gray-900">Free</th>
                      <th className="text-center p-4 font-semibold text-gray-900">Pro</th>
                      <th className="text-center p-4 font-semibold text-gray-900">Team</th>
                      <th className="text-center p-4 font-semibold text-gray-900">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Monthly Credits", "5", "100", "500", "Unlimited"],
                      ["File Uploads", "✗", "✓", "✓", "✓"],
                      ["Team Collaboration", "✗", "Basic", "Advanced", "Enterprise"],
                      ["API Access", "✗", "✗", "Basic", "Advanced"],
                      ["Priority Support", "✗", "✓", "✓", "✓"],
                      ["Custom AI Models", "✗", "✗", "✗", "✓"],
                      ["SSO Integration", "✗", "✗", "✗", "✓"],
                      ["SLA Guarantee", "✗", "✗", "✗", "✓"],
                    ].map((row, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="p-4 font-medium text-gray-900">{row[0]}</td>
                        <td className="p-4 text-center text-gray-600">{row[1]}</td>
                        <td className="p-4 text-center text-gray-600">{row[2]}</td>
                        <td className="p-4 text-center text-gray-600">{row[3]}</td>
                        <td className="p-4 text-center text-gray-600">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust SmartBrief for their content summarization needs. Start your free
                trial today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    Start Free Trial
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
