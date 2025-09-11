import React from "react";
import { Database, Globe, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";
import { Ripple } from "@/components/ui/shadcn-io/ripple";

const Section = ({ icon: Icon, title, children }) => (
  <div
    className="flex flex-col md:flex-row items-start gap-4 bg-blue-50/40 border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition w-full"
  >
    <div className="p-3 bg-blue-500/10 rounded-xl">
      <Icon className="w-8 h-8 text-blue-600" />
    </div>
    <div>
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <div className="text-blue-600/90">{children}</div>
    </div>
  </div>
);

const HowIBuiltThis = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden mt-20">
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-6 py-20">
        {/* Use Ripple here instead of framer-motion */}
        <Ripple 
          mainCircleSize={150} 
          mainCircleOpacity={0.25} 
          numCircles={6} 
          className="absolute inset-0" 
        />

        <div className="flex items-center gap-3">
          <span className="text-4xl">⚙️</span>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
            How I Built This
          </h1>
        </div>
        <p className="max-w-xl text-blue-600/90">
          Building a live news platform powered by free APIs, caching, and
          creative problem solving.
        </p>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 w-full max-w-4xl space-y-8 px-6 pb-20">
        <Section icon={Database} title="Data Source">
          I use the free{" "}
          <a
            href="https://newsdata.io/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            NewsData API
          </a>
          , which aggregates news from multiple websites. The news shown on my
          site is <strong>real and live</strong>, not demo content.
        </Section>

        <Section icon={Globe} title="Reality of Free APIs">
          While the API works, it comes with big limitations:
          <ul className="list-disc ml-6 mt-2">
            <li>Only 10 news per category</li>
            <li>5–6 unique, rest often duplicated</li>
            <li>200 credits per day</li>
            <li>News delayed by ~12 hours</li>
          </ul>
        </Section>

        <Section icon={AlertTriangle} title="The Problem">
          With strict limits, refreshing too often quickly drains the quota,
          making the site unreliable by mid-day.
        </Section>

        <Section icon={Lightbulb} title="The Solution">
          I implemented <code>localStorage</code> caching:
          <ul className="list-disc ml-6 mt-2">
            <li>
              After fetching news, store it locally:
              <code>localStorage.setItem("news", ...)</code>
            </li>
            <li>
              On refresh, check for cached news:
              <code>JSON.parse(localStorage.getItem("news"))</code>
            </li>
            <li>Load cached news instead of refetching</li>
          </ul>
        </Section>

        <Section icon={CheckCircle} title="Benefit">
          This saves API quota and ensures the app keeps working even after the
          daily limit is reached. Users always see content, even on refresh.
        </Section>
      </div>
    </div>
  );
};

export default HowIBuiltThis;
