import { useState } from 'react';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp,
  Users,
  Building2,
  ArrowUp,
  ArrowDown,
  Calendar,
  Activity,
  Target
} from 'lucide-react';
import { format, subDays, subMonths, subYears } from 'date-fns';

// Mock data for analytics
const topPerformers = [
  { name: 'John Doe', leads: 145, growth: 12 },
  { name: 'Sarah Smith', leads: 132, growth: 8 },
  { name: 'Mike Johnson', leads: 121, growth: -3 },
  { name: 'Emily Brown', leads: 98, growth: 15 },
  { name: 'David Wilson', leads: 87, growth: 5 }
];

const topTeams = [
  { name: 'Enterprise Sales', leads: 342, members: 8, growth: 18 },
  { name: 'SMB Team', leads: 287, members: 6, growth: 12 },
  { name: 'Mid-Market', leads: 245, members: 5, growth: -5 },
  { name: 'Strategic Accounts', leads: 198, members: 4, growth: 8 },
  { name: 'New Business', leads: 156, members: 3, growth: 22 }
];

const monthlyData = [
  { name: 'Jan', thisYear: 65, lastYear: 45 },
  { name: 'Feb', thisYear: 78, lastYear: 52 },
  { name: 'Mar', thisYear: 90, lastYear: 58 },
  { name: 'Apr', thisYear: 81, lastYear: 56 },
  { name: 'May', thisYear: 95, lastYear: 64 },
  { name: 'Jun', thisYear: 110, lastYear: 75 },
  { name: 'Jul', thisYear: 100, lastYear: 68 },
  { name: 'Aug', thisYear: 85, lastYear: 71 },
  { name: 'Sep', thisYear: 92, lastYear: 63 },
  { name: 'Oct', thisYear: 105, lastYear: 77 },
  { name: 'Nov', thisYear: 115, lastYear: 82 },
  { name: 'Dec', thisYear: 125, lastYear: 85 }
];

const weeklyData = Array.from({ length: 12 }, (_, i) => ({
  week: `Week ${i + 1}`,
  leads: Math.floor(Math.random() * 30) + 20
}));

const dailyLeads = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), 'MMM dd'),
  leads: Math.floor(Math.random() * 15) + 5
}));

export function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('yearly');

  const stats = {
    totalLeads: 2847,
    totalCompanies: 523,
    averageDaily: 12,
    averageWeekly: 84,
    averageMonthly: 365,
    comparisons: {
      weekly: { current: 87, previous: 82, change: 6.1 },
      monthly: { current: 378, previous: 342, change: 10.5 },
      yearly: { current: 4256, previous: 3890, change: 9.4 }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Track your team's performance and lead generation metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalLeads}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              12.5%
            </span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Companies</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalCompanies}</p>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              8.2%
            </span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Daily Leads</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.averageDaily}</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 font-medium flex items-center">
              <ArrowDown className="h-4 w-4 mr-1" />
              3.2%
            </span>
            <span className="ml-2 text-gray-500">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Monthly Leads</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.averageMonthly}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              15.3%
            </span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Top Performers</h2>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-500">{performer.leads} leads</p>
                  </div>
                </div>
                <div className={`flex items-center ${
                  performer.growth > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {performer.growth > 0 ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(performer.growth)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Teams */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Top Teams</h2>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topTeams.map((team, index) => (
              <div key={team.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{team.name}</p>
                    <p className="text-sm text-gray-500">
                      {team.leads} leads · {team.members} members
                    </p>
                  </div>
                </div>
                <div className={`flex items-center ${
                  team.growth > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {team.growth > 0 ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(team.growth)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        {/* Monthly Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Monthly Performance</h2>
              <p className="text-sm text-gray-500">Compare performance with previous year</p>
            </div>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E0E7FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E0E7FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="thisYear"
                  stroke="#6366F1"
                  fillOpacity={1}
                  fill="url(#colorThisYear)"
                  name="This Year"
                />
                <Area
                  type="monotone"
                  dataKey="lastYear"
                  stroke="#818CF8"
                  fillOpacity={1}
                  fill="url(#colorLastYear)"
                  name="Last Year"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly & Daily Trends */}
        <div className="grid grid-cols-2 gap-6">
          {/* Weekly Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Weekly Trends</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Daily Trends</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyLeads}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* Weekly Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Weekly Comparison</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.comparisons.weekly.current}</p>
            <p className="ml-2 text-sm text-gray-500">from {stats.comparisons.weekly.previous}</p>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium flex items-center ${
              stats.comparisons.weekly.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.comparisons.weekly.change >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(stats.comparisons.weekly.change)}%
            </span>
            <span className="ml-2 text-sm text-gray-500">vs last week</span>
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Monthly Comparison</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.comparisons.monthly.current}</p>
            <p className="ml-2 text-sm text-gray-500">from {stats.comparisons.monthly.previous}</p>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium flex items-center ${
              stats.comparisons.monthly.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.comparisons.monthly.change >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(stats.comparisons.monthly.change)}%
            </span>
            <span className="ml-2 text-sm text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Yearly Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Yearly Comparison</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.comparisons.yearly.current}</p>
            <p className="ml-2 text-sm text-gray-500">from {stats.comparisons.yearly.previous}</p>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium flex items-center ${
              stats.comparisons.yearly.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.comparisons.yearly.change >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(stats.comparisons.yearly.change)}%
            </span>
            <span className="ml-2 text-sm text-gray-500">vs last year</span>
          </div>
        </div>
      </div>
    </div>
  );
}