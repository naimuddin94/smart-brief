"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Sparkles, ArrowLeft, Mail, Phone, MapPin, Clock, Send, Building, Users, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { contactSchema, type ContactFormData } from "@/lib/validations/auth"
import Link from "next/link"
import { useState } from "react"

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

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "sales@smartbrief.com",
    description: "Get in touch with our sales team",
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+1 (555) 123-4567",
    description: "Speak directly with our experts",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "123 AI Street, Tech City, TC 12345",
    description: "Our headquarters location",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon-Fri 9AM-6PM EST",
    description: "When our team is available",
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Fast Implementation",
    description: "Get up and running in minutes, not weeks",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Personal onboarding and training for your team",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security and compliance features",
  },
  {
    icon: Building,
    title: "Custom Solutions",
    description: "Tailored features for your specific needs",
  },
]

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      phone: "",
      teamSize: undefined,
      useCase: undefined,
      message: "",
      newsletter: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    try {
      // Handle form submission
      console.log("Contact form submitted:", data)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Show success message or redirect
      form.reset()
    } catch (error) {
      console.error("Contact form error:", error)
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
            Let's Talk About Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              AI Needs
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ready to transform your content workflow? Our team is here to help you find the perfect solution for your
            organization.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your work email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your job title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1-10">1-10 people</SelectItem>
                                <SelectItem value="11-50">11-50 people</SelectItem>
                                <SelectItem value="51-200">51-200 people</SelectItem>
                                <SelectItem value="201-1000">201-1000 people</SelectItem>
                                <SelectItem value="1000+">1000+ people</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="useCase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Use Case</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How do you plan to use SmartBrief?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="research">Research & Analysis</SelectItem>
                              <SelectItem value="content">Content Creation</SelectItem>
                              <SelectItem value="education">Education & Training</SelectItem>
                              <SelectItem value="legal">Legal Document Review</SelectItem>
                              <SelectItem value="marketing">Marketing & Communications</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell us about your needs</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="What challenges are you looking to solve? What features are most important to you?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newsletter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              I'd like to receive product updates and AI industry insights
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      <Send className="h-4 w-4 mr-2" />
                      {isLoading ? "Sending Message..." : "Send Message"}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>
                      .
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Benefits */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <info.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{info.title}</h3>
                          <p className="text-gray-700">{info.content}</p>
                          <p className="text-sm text-gray-500">{info.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Why Choose SmartBrief Enterprise?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <benefit.icon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                  <div className="space-y-3">
                    <Button variant="secondary" className="w-full justify-start" asChild>
                      <Link href="/demo">
                        <Zap className="h-4 w-4 mr-2" />
                        Watch Live Demo
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-white text-white hover:bg-white hover:text-blue-600"
                      asChild
                    >
                      <Link href="/support">
                        <Users className="h-4 w-4 mr-2" />
                        Browse Support Center
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
