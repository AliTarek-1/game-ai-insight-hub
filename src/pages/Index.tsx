
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, ChartBar, ChartPie, File } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                GameAnalyst AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                  Dashboard
                </Button>
              </Link>
              <Link to="/analyst">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  AI Analyst
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
              Powered by Advanced AI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Personal Gaming
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent block">
                Data Analyst
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Discover insights about PC gaming trends, analyze your documents with AI, 
              and get intelligent answers about gaming performance and rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-lg px-8 py-3">
                  View Dashboard
                </Button>
              </Link>
              <Link to="/analyst">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-3">
                  Ask AI Analyst
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Analytics Features
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Get comprehensive insights into gaming data and analyze any document with our AI-powered tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <ChartBar className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Gaming Dashboard</CardTitle>
                <CardDescription className="text-slate-400">
                  Interactive charts showing top PC games by playtime and rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-300 space-y-2">
                  <li>• Real-time gaming statistics</li>
                  <li>• Performance comparisons</li>
                  <li>• Trend analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <ChartPie className="h-12 w-12 text-cyan-400 mb-4" />
                <CardTitle className="text-white">AI Analyst Chat</CardTitle>
                <CardDescription className="text-slate-400">
                  Ask questions about gaming data and get intelligent insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-300 space-y-2">
                  <li>• Natural language queries</li>
                  <li>• Data-driven answers</li>
                  <li>• Gaming recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <File className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">PDF Analysis</CardTitle>
                <CardDescription className="text-slate-400">
                  Upload documents and get AI-powered analysis and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-slate-300 space-y-2">
                  <li>• Document understanding</li>
                  <li>• Key insights extraction</li>
                  <li>• Q&A about content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Analyze Your Gaming Data?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Start exploring gaming insights and upload your documents for AI analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  Explore Dashboard
                </Button>
              </Link>
              <Link to="/analyst">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Start Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
