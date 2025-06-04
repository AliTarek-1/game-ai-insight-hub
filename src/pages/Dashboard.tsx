import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUp, ArrowDown, ChartBar, TrendingUp, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Sample gaming data
  const gamesData = [
    { name: "Counter-Strike 2", playtime: 1247, ranking: 95, players: "1.5M", trend: "up" },
    { name: "Dota 2", playtime: 1156, ranking: 92, players: "850K", trend: "up" },
    { name: "Steam Deck", playtime: 892, ranking: 88, players: "650K", trend: "down" },
    { name: "Baldur's Gate 3", playtime: 743, ranking: 96, players: "550K", trend: "up" },
    { name: "Cyberpunk 2077", playtime: 678, ranking: 89, players: "420K", trend: "up" },
    { name: "Elden Ring", playtime: 634, ranking: 94, players: "380K", trend: "down" }
  ];

  const pieData = [
    { name: "FPS Games", value: 35, color: "#8b5cf6" },
    { name: "RPG Games", value: 28, color: "#06b6d4" },
    { name: "Strategy", value: 18, color: "#10b981" },
    { name: "Indie", value: 12, color: "#f59e0b" },
    { name: "Other", value: 7, color: "#ef4444" }
  ];

  const trendData = [
    { month: "Jan", csgo: 1100, dota: 1000, baldur: 400 },
    { month: "Feb", csgo: 1150, dota: 1050, baldur: 500 },
    { month: "Mar", csgo: 1200, dota: 1100, baldur: 600 },
    { month: "Apr", csgo: 1230, dota: 1120, baldur: 700 },
    { month: "May", csgo: 1247, dota: 1156, baldur: 743 }
  ];

  const getGameAnalysis = (gameName: string) => {
    const analyses = {
      "Counter-Strike 2": {
        whyBetter: "Counter-Strike 2 revolutionizes the tactical FPS genre with upgraded Source 2 engine, enhanced graphics, and refined gameplay mechanics. The game maintains the competitive integrity that made CS legendary while introducing modern improvements.",
        whyTry: "Perfect for competitive players who enjoy strategic team-based gameplay. The skill ceiling is incredibly high, offering endless room for improvement. With 1.5M active players, you'll always find matches at your skill level.",
        strengths: ["World-class competitive scene", "Regular updates and balance changes", "Massive esports ecosystem", "High skill ceiling with rewarding gameplay"],
        playerType: "Ideal for competitive gamers, esports enthusiasts, and players who enjoy tactical team coordination."
      },
      "Dota 2": {
        whyBetter: "Dota 2 stands as the pinnacle of MOBA design with unmatched strategic depth, complex hero interactions, and the most balanced competitive environment. Every match feels unique with infinite strategic possibilities.",
        whyTry: "If you love deep strategy and don't mind a learning curve, Dota 2 offers the most rewarding MOBA experience. The International tournament has the largest prize pools in esports history.",
        strengths: ["Incredible strategic depth", "Completely free-to-play", "No pay-to-win mechanics", "Massive prize pools in tournaments"],
        playerType: "Perfect for strategy lovers, MOBA enthusiasts, and players who enjoy complex team coordination."
      },
      "Steam Deck": {
        whyBetter: "Steam Deck represents the future of portable PC gaming, allowing you to play your entire Steam library anywhere. It's essentially a handheld gaming PC with incredible versatility.",
        whyTry: "Game-changer for busy lifestyles - play AAA titles during commutes, travel, or anywhere. No need to buy games twice; your Steam library works natively.",
        strengths: ["Portable PC gaming", "Entire Steam library compatibility", "Great battery life", "Docking capabilities for TV gaming"],
        playerType: "Ideal for busy gamers, travelers, and anyone who wants PC gaming flexibility."
      },
      "Baldur's Gate 3": {
        whyBetter: "Baldur's Gate 3 sets the new gold standard for RPGs with unprecedented player choice, exceptional writing, and true consequences for every decision. It's like having a D&D campaign with unlimited possibilities.",
        whyTry: "Experience storytelling at its finest with multiple playthroughs feeling completely different. Co-op with friends creates unforgettable shared adventures with emergent gameplay moments.",
        strengths: ["Exceptional storytelling and writing", "Meaningful player choices", "Outstanding co-op experience", "Incredible replay value"],
        playerType: "Perfect for RPG fans, story lovers, and players who enjoy cooperative experiences."
      },
      "Cyberpunk 2077": {
        whyBetter: "After major updates, Cyberpunk 2077 now delivers the futuristic RPG experience originally promised. Night City is one of the most detailed and immersive game worlds ever created.",
        whyTry: "Incredible visual spectacle with deep RPG mechanics and multiple story paths. The recent updates have transformed it into the game it was meant to be from launch.",
        strengths: ["Stunning visual design", "Deep character customization", "Multiple story outcomes", "Incredible world detail"],
        playerType: "Great for RPG enthusiasts, sci-fi fans, and players who love immersive worlds."
      },
      "Elden Ring": {
        whyBetter: "Elden Ring perfects the Souls formula by adding an open world structure that enhances exploration and discovery. It's FromSoftware's masterpiece combining challenging gameplay with incredible world design.",
        whyTry: "Offers the perfect balance of challenge and reward. When you overcome a difficult boss or discover a hidden area, the satisfaction is unmatched in gaming.",
        strengths: ["Perfect difficulty balance", "Incredible world design", "Endless exploration", "Memorable boss encounters"],
        playerType: "Ideal for players who enjoy challenging games, exploration, and atmospheric experiences."
      }
    };

    return analyses[gameName as keyof typeof analyses] || {
      whyBetter: "This game offers unique gameplay mechanics and engaging content.",
      whyTry: "Worth trying for its distinctive features and player community.",
      strengths: ["Engaging gameplay", "Active community"],
      playerType: "Suitable for various types of gamers."
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                GameAnalyst AI
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Home
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gaming Dashboard</h1>
          <p className="text-slate-400">PC Gaming Analytics and Performance Insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Active Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4.2M</div>
              <div className="flex items-center text-green-400 text-sm mt-1">
                <ArrowUp className="w-4 h-4 mr-1" />
                12.5%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Avg Playtime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">892h</div>
              <div className="flex items-center text-green-400 text-sm mt-1">
                <ArrowUp className="w-4 h-4 mr-1" />
                8.2%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Top Rated Game</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">96/100</div>
              <div className="text-slate-400 text-sm mt-1">Baldur's Gate 3</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Trending Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">6</div>
              <div className="flex items-center text-green-400 text-sm mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                Rising
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Playtime Chart */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Top Games by Playtime</CardTitle>
              <CardDescription className="text-slate-400">
                Average hours played across PC gaming community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gamesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="playtime" fill="url(#gradient1)" />
                  <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Genre Distribution */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Game Genre Distribution</CardTitle>
              <CardDescription className="text-slate-400">
                Most popular gaming categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Games List with AI Analyst */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Games</CardTitle>
            <CardDescription className="text-slate-400">
              Ranked by combination of playtime, rating, and player count - Click AI Analyst for personalized insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gamesData.map((game, index) => (
                <div key={game.name} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-purple-400">#{index + 1}</div>
                    <div>
                      <h3 className="text-white font-semibold">{game.name}</h3>
                      <p className="text-slate-400 text-sm">{game.players} active players</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-white font-semibold">{game.playtime}h</div>
                      <div className="text-slate-400 text-sm">Avg Playtime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-semibold">{game.ranking}/100</div>
                      <div className="text-slate-400 text-sm">Rating</div>
                    </div>
                    <Badge variant={game.trend === "up" ? "default" : "secondary"} 
                           className={game.trend === "up" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                      {game.trend === "up" ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                      {game.trend === "up" ? "Rising" : "Falling"}
                    </Badge>
                    
                    {/* AI Analyst Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                          onClick={() => setSelectedGame(game.name)}
                        >
                          <Bot className="w-4 h-4 mr-2" />
                          AI Analyst
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center text-xl">
                            <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
                            AI Analysis: {game.name}
                          </DialogTitle>
                          <DialogDescription className="text-slate-400">
                            Personalized insights and recommendations from our gaming AI analyst
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 mt-4">
                          {/* Game Stats Summary */}
                          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-700/30 rounded-lg">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-400">{game.playtime}h</div>
                              <div className="text-slate-400 text-sm">Avg Playtime</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-cyan-400">{game.ranking}/100</div>
                              <div className="text-slate-400 text-sm">Rating</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-400">{game.players}</div>
                              <div className="text-slate-400 text-sm">Players</div>
                            </div>
                          </div>

                          {/* AI Analysis */}
                          <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg border border-purple-500/30">
                              <h4 className="font-semibold text-purple-300 mb-2">🎯 Why This Game Stands Out</h4>
                              <p className="text-slate-200 text-sm leading-relaxed">
                                {getGameAnalysis(game.name).whyBetter}
                              </p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-cyan-600/20 to-green-600/20 rounded-lg border border-cyan-500/30">
                              <h4 className="font-semibold text-cyan-300 mb-2">✨ Why You Should Try It</h4>
                              <p className="text-slate-200 text-sm leading-relaxed">
                                {getGameAnalysis(game.name).whyTry}
                              </p>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-green-600/20 to-yellow-600/20 rounded-lg border border-green-500/30">
                              <h4 className="font-semibold text-green-300 mb-2">💪 Key Strengths</h4>
                              <ul className="text-slate-200 text-sm space-y-1">
                                {getGameAnalysis(game.name).strengths.map((strength, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30">
                              <h4 className="font-semibold text-yellow-300 mb-2">🎮 Perfect For</h4>
                              <p className="text-slate-200 text-sm leading-relaxed">
                                {getGameAnalysis(game.name).playerType}
                              </p>
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div className="flex justify-center pt-4">
                            <Link to="/analyst">
                              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                                <Bot className="w-4 h-4 mr-2" />
                                Ask More Questions
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Playtime Trends (Last 5 Months)</CardTitle>
            <CardDescription className="text-slate-400">
              Monthly playtime progression for top games
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line type="monotone" dataKey="csgo" stroke="#8b5cf6" strokeWidth={3} name="Counter-Strike 2" />
                <Line type="monotone" dataKey="dota" stroke="#06b6d4" strokeWidth={3} name="Dota 2" />
                <Line type="monotone" dataKey="baldur" stroke="#10b981" strokeWidth={3} name="Baldur's Gate 3" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
