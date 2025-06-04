
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ChartBar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
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

        {/* Games List */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Games</CardTitle>
            <CardDescription className="text-slate-400">
              Ranked by combination of playtime, rating, and player count
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
