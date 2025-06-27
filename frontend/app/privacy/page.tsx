"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowLeft, Shield, Eye, Lock, Database, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

const privacyHighlights = [
  {
    icon: Shield,
    title: "Data Protection",
    description: "Your content is encrypted and processed securely with industry-standard protocols.",
  },
  {
    icon: Eye,
    title: "No Content Storage",
    description: "We don't permanently store your original content after processing is complete.",
  },
  {
    icon: Lock,
    title: "Secure Processing",
    description: "All AI processing happens in secure, isolated environments with no data leakage.",
  },
  {
    icon: Users,
    title: "No Third-Party Sharing",
    description: "Your data is never shared with third parties without your explicit consent.",
  },
]

export default function PrivacyPage() {
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
            Privacy
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Policy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your information when you use
            SmartBrief.
          </p>
          <p className="text-sm text-gray-500">Last updated: January 15, 2024</p>
        </motion.div>

        {/* Privacy Highlights */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {privacyHighlights.map((highlight, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <highlight.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Privacy Policy Content */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    Information We Collect
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Name and email address when you create an account</li>
                      <li>
                        Payment information for premium subscriptions (processed securely by our payment providers)
                      </li>
                      <li>Profile information you choose to provide</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Usage Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Content you submit for summarization (temporarily processed and not permanently stored)</li>
                      <li>Usage patterns and feature interactions</li>
                      <li>Device information and IP addresses</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Database className="h-6 w-6 mr-2 text-blue-600" />
                    How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide and improve our AI summarization services</li>
                      <li>Process your content through our AI models</li>
                      <li>Manage your account and provide customer support</li>
                      <li>Send important service updates and notifications</li>
                      <li>Analyze usage patterns to improve our platform</li>
                      <li>Prevent fraud and ensure platform security</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Lock className="h-6 w-6 mr-2 text-blue-600" />
                    Data Security & Protection
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>We implement robust security measures to protect your information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>End-to-end encryption for all data transmission</li>
                      <li>Secure cloud infrastructure with regular security audits</li>
                      <li>Limited access controls and employee training</li>
                      <li>Regular security updates and vulnerability assessments</li>
                      <li>Compliance with industry-standard security frameworks</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Eye className="h-6 w-6 mr-2 text-blue-600" />
                    Content Processing & Retention
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Important:</strong> We prioritize your content privacy:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Original content is processed temporarily and deleted after summarization</li>
                      <li>Generated summaries are stored only if you choose to save them</li>
                      <li>We don't use your content to train our AI models without explicit consent</li>
                      <li>Content is processed in secure, isolated environments</li>
                      <li>You can delete your summaries and account data at any time</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-blue-600" />
                    Information Sharing
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      We do not sell, trade, or rent your personal information. We may share information only in these
                      limited circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>With your explicit consent</li>
                      <li>To comply with legal obligations or court orders</li>
                      <li>To protect our rights, property, or safety</li>
                      <li>
                        With trusted service providers who assist in our operations (under strict confidentiality
                        agreements)
                      </li>
                      <li>In connection with a business transfer or acquisition</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights & Choices</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>You have the following rights regarding your personal information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Access:</strong> Request a copy of your personal information
                      </li>
                      <li>
                        <strong>Correction:</strong> Update or correct inaccurate information
                      </li>
                      <li>
                        <strong>Deletion:</strong> Request deletion of your personal information
                      </li>
                      <li>
                        <strong>Portability:</strong> Request your data in a portable format
                      </li>
                      <li>
                        <strong>Opt-out:</strong> Unsubscribe from marketing communications
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>We use cookies and similar technologies to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Remember your preferences and settings</li>
                      <li>Analyze website traffic and usage patterns</li>
                      <li>Provide personalized content and features</li>
                      <li>Ensure platform security and prevent fraud</li>
                    </ul>
                    <p>You can control cookie settings through your browser preferences.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      SmartBrief operates globally. Your information may be transferred to and processed in countries
                      other than your own. We ensure appropriate safeguards are in place to protect your information in
                      accordance with this privacy policy.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      SmartBrief is not intended for children under 13 years of age. We do not knowingly collect
                      personal information from children under 13. If you believe we have collected information from a
                      child under 13, please contact us immediately.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      We may update this privacy policy from time to time. We will notify you of any material changes by
                      posting the new policy on this page and updating the "Last updated" date. We encourage you to
                      review this policy periodically.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
                    <ul className="list-none space-y-2">
                      <li>
                        <strong>Email:</strong> privacy@smartbrief.com
                      </li>
                      <li>
                        <strong>Address:</strong> SmartBrief Privacy Team, 123 AI Street, Tech City, TC 12345
                      </li>
                      <li>
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
              <p className="text-blue-100 mb-6">
                Our team is here to help you understand how we protect your information.
              </p>
              <Link href="/support">
                <Button size="lg" variant="secondary">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
