import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LightRaysBackground } from "@/components/ui/shadcn-io/light-rays-background";
import { WavyBackground } from "@/components/ui/shadcn-io/wavy-background";

import {
  Code2,
  Zap,
  Shield,
  Battery,
  Gauge,
  Layers,
  TrendingDown,
  AlertTriangle,
  Clock,
  Server,
  Timer,
  Globe,
  Database,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

/* ---------------- Utility ---------------- */
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ---------------- Button ---------------- */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

/* ---------------- FeatureCard ---------------- */
const FeatureCard = ({ icon: Icon, title, description, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={cn(
      "card-gradient p-8 rounded-2xl shadow-elegant hover:shadow-xl transition-all duration-300 bg-white dark:bg-blue-50/15",
      className
    )}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 rounded-xl dark:bg-blue-50/10 bg-blue-50 text-blue-500">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
    </div>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

/* ---------------- CodeBlock ---------------- */
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group my-6"
    >
      <div className="code-block hover-lift rounded-lg bg-gray-900 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
            javascript
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 px-2"
          >
            Copy
            {copied && <span className="ml-1 text-xs">Copied!</span>}
          </Button>
        </div>
        <pre className="text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  );
};

/* ---------------- Scroll Progress ---------------- */
const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScroll((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-1 bg-blue-600 transition-all duration-100"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
};
const HowIBuiltThis = () => {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative m-0 md:-mt-25 -mt-18 ">
      <ScrollProgress />
      <div className="relative w-full h-full bg-blue-600/50 dark:bg-blue-900/5 overflow-hidden">
        <section className="h-screen relative overflow-hidden flex items-center justify-center text-center">
          {/* Light rays background inside the section */}
          <LightRaysBackground
            className="absolute inset-0 z-0"
            raysOrigin="top-center"
            raysColor={["#1E90FF", "#ffffff"]}
            raysSpeed={1.5}
            lightSpread={1.2}
            rayLength={1.8}
            pulsating={true}
            fadeDistance={0.8}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0.1}
            distortion={0.5}
          />

          {/* Section content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-center gap-3 text-white">
              <Code2 className="h-8 w-8" />
              <span className="text-lg font-medium tracking-wide">
                Case Study
              </span>
            </div>

            <h1 className="text-3xl md:text-7xl font-bold mb-8 leading-tight text-white">
              How I Built This
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/90 m-0 mr-5 ml-5">
              Building a real news website with live updates is not easy when
              you rely on free APIs.
            </p>
            <p className="text-lg mb-12 text-white/80 m-0 mr-5 ml-5">
              I used the free{" "}
              <a
                href="https://newsdata.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-blue-400"
              >
                Newsdata.io API
              </a>
              {"   "}to power this project. The news you see here is live and
              real — not demo data.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white/20 text-white border-white/30"
                onClick={() => scrollTo("challenge")}
              >
                <Zap className="mr-2 h-5 w-5" />
                Explore the Journey
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Challenge Section */}
      <section id="challenge" className="py-24 b">
        <div className="container mx-auto px-4 max-w-6xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            The Challenge
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
            While building the site, I faced several limitations with the free
            API that made development particularly challenging.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
          <FeatureCard
            icon={Layers}
            title="Limited Articles"
            description="The API only provides 10 news articles per category."
          />
          <FeatureCard
            icon={TrendingDown}
            title="Duplicate Content"
            description="Sometimes, news images and descriptions are not included, and when descriptions are present, they are very short."
          />
          <FeatureCard
            icon={AlertTriangle}
            title="Daily Quota"
            description="I only get 200 API credits per day, which is very restrictive."
          />
          <FeatureCard
            icon={Clock}
            title="Delayed Updates"
            description="The news is delayed by about 12 hours."
          />
        </div>
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="card-gradient p-8 rounded-2xl shadow-elegant">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              The Core Problem
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              If I fetched new data on every refresh, the quota would run out
              very quickly, leaving users with a broken experience and no news
              updates throughout the day.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            The Solution
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
            To overcome these issues, I implemented a localStorage caching
            system. Here's how it works:
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mb-12">
          <FeatureCard
            icon={CheckCircle}
            title="Check Cache First"
            description="On refresh, the app first checks if cached data exists in localStorage."
          />
          <FeatureCard
            icon={Database}
            title="Load from Cache"
            description="If cached data exists → it loads directly into state (setNews, setFilteredNews)."
          />
          <FeatureCard
            icon={RefreshCw}
            title="Fetch & Save"
            description="If no cached data exists → the app fetches from the API and then saves it."
          />
        </div>
        <div className="max-w-6xl  md:mx-auto mx-5">
          <h3 className="text-2xl font-bold mb-4">Step 1: Save to Cache</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            After fetching news once, the app saves the results in localStorage:
          </p>
          <CodeBlock
            code={`localStorage.setItem("news", JSON.stringify(newNews));`}
          />
          <h3 className="text-2xl font-bold mb-4 mt-8">
            Step 2: Check Cache on Load
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            On refresh, the app first checks if cached data exists:
          </p>
          <CodeBlock
            code={`const cachedNews = JSON.parse(localStorage.getItem("news"));`}
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50 dark:bg-blue-50/10">
        <div className="container mx-auto px-4 max-w-6xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            The Benefits
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
            This caching system solved most of my problems and transformed the
            user experience:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 mb-12">
          <FeatureCard
            icon={Shield}
            title="Prevents Unnecessary API Calls"
            description="Smart caching eliminates redundant requests, preserving your valuable API quota for when it's truly needed."
          />
          <FeatureCard
            icon={Battery}
            title="Saves Limited Credits"
            description="With only 200 daily credits, every API call matters. Caching ensures you don't waste them on repeated requests."
          />
          <FeatureCard
            icon={Zap}
            title="Continuous Operation"
            description="Even if the API quota is exhausted, your app continues working seamlessly using cached data."
          />
          <FeatureCard
            icon={Gauge}
            title="Instant Loading"
            description="News loads instantly for users since cached data is used first, providing a superior user experience."
          />
        </div>
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="card-gradient p-8 rounded-2xl shadow-elegant">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Performance Impact
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              The implementation resulted in a 95% reduction in API calls,
              near-instant page loads, and a reliable user experience even
              during peak usage periods.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="md:py-24 py-10 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Next Steps
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
            To make the site even better, I plan to implement these
            improvements:
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 ">
          <FeatureCard
            icon={Globe}
            title="Better APIs"
            description="Explore APIs with higher limits or no delays to provide more real-time news updates."
          />
          <FeatureCard
            icon={Server}
            title="Server-Side Caching"
            description="Implement database + cron jobs so all users share the same cached news, improving efficiency."
          />
          <FeatureCard
            icon={Timer}
            title="Smart Refresh Timer"
            description="Add intelligent refresh intervals (e.g., fetch new data only every 30–60 minutes) for optimal performance."
          />
        </div>
      </section>
      <div className="md:m-10 m-3 overflow-hidden flex justify-center">
        <WavyBackground
          backgroundFill="black"
          colors={["#4a90e2", "#45b7d1", "#4ecdc4", "#5f27cd", "#1dd1a1"]}
          waveWidth={10}
          blur={15}
          speed="slow"
          waveOpacity={0.6}
          containerClassName="h-[350px] w-full rounded-lg border overflow-hidden"
          className="w-full"
        >
          <div className="text-center">
            <h3 className="text-2xl font-black text-white mb-4">
              Future Vision
            </h3>
            <p className="text-gray-200 md:mx-30 mx-3 font-normal">
              I'm planning to collect all Ethiopian news through a Telegram channel using a bot, 
              store the data in a database, and then build an API using Go or Node.js. 
              Later, I will enhance the API to provide more localized content and filtering options based on
               categories, regions, or user preferences.
            </p>
          </div>
        </WavyBackground>
      </div>
    </div>
  );
};

export default HowIBuiltThis;
