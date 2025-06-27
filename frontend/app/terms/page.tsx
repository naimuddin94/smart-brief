"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowLeft, FileText, Scale, Shield, CreditCard, Users, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

const keyTerms = [
  {
    icon: FileText,
    title: "Service Usage",
    description: "Guidelines for using SmartBrief's AI summarization features and platform.",
  },
  {
    icon: CreditCard,
    title: "Billing & Credits",
    description: "Terms regarding credit system, payments, and subscription management.",
  },
  {
    icon: Shield,
    title: "User Responsibilities",
    description: "Your obligations when using our platform and content guidelines.",
  },
  {
    icon: Scale,
    title: "Legal Compliance",
    description: "Governing law, dispute resolution, and limitation of liability.",
  },
]

export default function TermsPage() {
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
            Terms of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Service</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Please read these terms carefully before using SmartBrief. By using our service, you agree to be bound by
            these terms.
          </p>
          <p className="text-sm text-gray-500">Last updated: January 15, 2024</p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Important:</strong> These terms constitute a legally binding agreement between you and SmartBrief.
              Please read them carefully and contact us if you have any questions.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Key Terms Overview */}
        <motion.div
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {keyTerms.map((term, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <term.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{term.title}</h3>
                  <p className="text-gray-600 text-sm">{term.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Terms Content */}
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
                    1. Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      By accessing or using SmartBrief ("Service"), you agree to be bound by these Terms of Service
                      ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                    </p>
                    <p>
                      These Terms apply to all visitors, users, and others who access or use the Service. We reserve the
                      right to update these Terms at any time, and your continued use of the Service constitutes
                      acceptance of any changes.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-blue-600" />
                    2. User Accounts
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-lg font-semibold">Account Creation</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You must provide accurate and complete information when creating an account</li>
                      <li>You are responsible for maintaining the security of your account credentials</li>
                      <li>You must be at least 13 years old to create an account</li>
                      <li>One person or entity may not maintain more than one free account</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Account Responsibilities</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You are responsible for all activities that occur under your account</li>
                      <li>You must notify us immediately of any unauthorized use of your account</li>
                      <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
                    3. Credit System & Billing
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-lg font-semibold">Credit System</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Free accounts receive 5 credits upon registration</li>
                      <li>Each summarization request consumes 1 credit</li>
                      <li>Credits do not expire but are non-transferable</li>
                      <li>Additional credits can be purchased through subscription plans</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Billing Terms</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                      <li>All fees are non-refundable except as required by law</li>
                      <li>We reserve the right to change pricing with 30 days notice</li>
                      <li>Failed payments may result in service suspension</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-blue-600" />
                    4. Acceptable Use Policy
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-lg font-semibold">Permitted Uses</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Summarizing your own content or content you have rights to use</li>
                      <li>Using the Service for legitimate business, educational, or personal purposes</li>
                      <li>Sharing summaries you create (while respecting original content rights)</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Prohibited Uses</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Submitting copyrighted content without proper authorization</li>
                      <li>Using the Service for illegal, harmful, or fraudulent activities</li>
                      <li>Attempting to reverse engineer or compromise our AI models</li>
                      <li>Sharing account credentials or reselling Service access</li>
                      <li>
                        Submitting content that violates privacy rights or contains personal information of others
                      </li>
                      <li>Using automated tools to abuse the Service or exceed rate limits</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-lg font-semibold">Your Content</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You retain ownership of content you submit to the Service</li>
                      <li>You grant us a limited license to process your content for summarization</li>
                      <li>You are responsible for ensuring you have rights to submit content</li>
                      <li>Generated summaries are owned by you, subject to these Terms</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Our Service</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SmartBrief and its technology are protected by intellectual property laws</li>
                      <li>You may not copy, modify, or create derivative works of our Service</li>
                      <li>Our AI models and algorithms are proprietary and confidential</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy & Data Protection</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Your privacy is important to us. Our collection and use of personal information is governed by our
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                        {" "}
                        Privacy Policy
                      </Link>
                      , which is incorporated into these Terms by reference.
                    </p>
                    <p>Key privacy commitments:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We process content temporarily and don't permanently store original submissions</li>
                      <li>We implement industry-standard security measures</li>
                      <li>We don't share your content with third parties without consent</li>
                      <li>You can delete your account and data at any time</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability & Modifications</h2>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-lg font-semibold">Service Availability</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We strive to maintain high service availability but cannot guarantee 100% uptime</li>
                      <li>Scheduled maintenance will be announced in advance when possible</li>
                      <li>We are not liable for service interruptions beyond our reasonable control</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Service Modifications</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We may modify, suspend, or discontinue features with reasonable notice</li>
                      <li>We may impose usage limits to ensure fair access for all users</li>
                      <li>Major changes to core functionality will be communicated in advance</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>IMPORTANT:</strong> To the maximum extent permitted by law, SmartBrief shall not be liable
                      for any indirect, incidental, special, consequential, or punitive damages, including but not
                      limited to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                      <li>Damages resulting from unauthorized access to or alteration of your content</li>
                      <li>Damages resulting from any third-party conduct or content</li>
                      <li>Damages resulting from service interruptions or technical issues</li>
                    </ul>
                    <p>
                      Our total liability to you for all claims shall not exceed the amount you paid us in the 12 months
                      preceding the claim, or $100, whichever is greater.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      You agree to indemnify and hold harmless SmartBrief and its affiliates from any claims, damages,
                      losses, or expenses (including reasonable attorney fees) arising from:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your use of the Service in violation of these Terms</li>
                      <li>Your submission of content that infringes third-party rights</li>
                      <li>Your violation of any law or regulation</li>
                      <li>Any third-party claims related to your use of the Service</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-lg font-semibold">Termination by You</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You may terminate your account at any time through your account settings</li>
                      <li>Termination does not entitle you to a refund of prepaid fees</li>
                      <li>You remain responsible for all charges incurred before termination</li>
                    </ul>

                    <h3 className="text-lg font-semibold">Termination by Us</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We may suspend or terminate accounts that violate these Terms</li>
                      <li>We may terminate accounts for non-payment after reasonable notice</li>
                      <li>We may terminate the Service entirely with 30 days notice</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Scale className="h-6 w-6 mr-2 text-blue-600" />
                    11. Governing Law & Disputes
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law
                      principles. Any disputes arising from these Terms or your use of the Service will be resolved
                      through binding arbitration, except for claims that may be brought in small claims court.
                    </p>
                    <p>
                      Before initiating any legal proceedings, you agree to first contact us to attempt to resolve the
                      dispute informally.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. General Provisions</h2>
                  <div className="space-y-4 text-gray-700">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and
                        SmartBrief
                      </li>
                      <li>
                        <strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions
                        remain in effect
                      </li>
                      <li>
                        <strong>Waiver:</strong> Our failure to enforce any provision does not constitute a waiver of
                        that provision
                      </li>
                      <li>
                        <strong>Assignment:</strong> You may not assign these Terms; we may assign them with notice
                      </li>
                      <li>
                        <strong>Force Majeure:</strong> We are not liable for delays or failures due to circumstances
                        beyond our control
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>If you have questions about these Terms, please contact us:</p>
                    <ul className="list-none space-y-2">
                      <li>
                        <strong>Email:</strong> legal@smartbrief.com
                      </li>
                      <li>
                        <strong>Address:</strong> SmartBrief Legal Team, 123 AI Street, Tech City, TC 12345
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
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-6">
                By creating an account, you agree to these Terms of Service and our Privacy Policy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Create Account
                  </Button>
                </Link>
                <Link href="/support">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Contact Support
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
