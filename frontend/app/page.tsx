"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { currentUser, removeUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminNavItems, features, plans, userNavItems } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useAppSelector(currentUser);
  const [navItems, setNavItems] = useState(userNavItems);

  useEffect(() => {
    if (user?.role === "admin") {
      setNavItems(adminNavItems);
    } else {
      setNavItems(userNavItems);
    }
  }, [user]);

  const [logoutFn] = useLogoutMutation();

  const handleLogout = () => {
    logoutFn({})
      .unwrap()
      .then((res) => {
        if (res?.success) {
          dispatch(removeUser());
          toast.success(res?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Something went wrong!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 flex justify-between items-center"
      >
        <Logo />
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
              <Avatar>
                {/* <AvatarImage src={} /> */}
                <AvatarFallback>
                  {user?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            Summarize Content with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              AI Power
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Transform lengthy documents, articles, and content into concise,
            actionable summaries in seconds using advanced AI technology.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose SmartBrief?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make content summarization effortless
            and efficient
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade as you
            grow.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`h-full ${
                  index === 1 ? "ring-2 ring-blue-500 scale-105" : ""
                } hover:shadow-lg transition-all duration-300`}
              >
                <CardContent className="p-8 text-center">
                  {index === 1 && (
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {plan.price}
                    <span className="text-lg text-gray-600">/month</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-6">
                    {plan.credits}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center justify-center"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={index === 1 ? "default" : "outline"}
                  >
                    {index === 0 ? "Start Free" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already saving time with AI-powered
            summarization
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">SmartBrief</span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/support"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartBrief. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
