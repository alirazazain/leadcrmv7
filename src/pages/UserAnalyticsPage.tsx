import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Target, Calendar, Activity } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { mockUsers } from '../data/mockUsers';
import { mockLeads } from '../data/mockLeads';
import { mockCompanies } from '../data/mockCompanies';

// Mock data generator functions
const generateDailyData = (userId: string) => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    leads: Math.floor(Math.random() * 5) + 1,
    companies: Math.floor(Math.random() * 2)
  }));
};

const generateWeeklyData = (userId: string) => {
  return Array.from({ length: 12 }, (_, i) => ({
    week: `Week ${i + 1}`,
    leads: Math.floor(Math.random() * 25) + 5,
    companies: Math.floor(Math.random() * 10) + 1
  }));
};

const generateMonthlyData = (userId: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    leads: Math.floor(Math.random() * 100) + 20,
    companies: Math.floor(Math.random() * 40) + 5
  }));
};

export function UserAnalyticsPage() {
  const { userId } = useParams<{ userId: string }>();
  const user = mockUsers.find(u => u.id === userId);
  const [timeframe, setTimeframe] = useState('monthly');

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">User not found</h2>
        <p className="mt-2 text-gray-600">The user you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/users/list"
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Users
        </Link>
      </div>
    );
  }

  // Generate mock data for the user
  const dailyData = generateDailyData(userId);
  const weeklyData = generateWeeklyData(userId);
  const monthlyData = generateMonthlyData(userId);

  // Calculate summary statistics
  const totalLeads = mockLeads.filter(lead => 
    lead.persons?.some(p => p.person.email === user.email) || false
  ).length;

  const totalCompanies = mockCompanies.filter(company =>
    company.people?.some(person => person.email === user.email) || false
  ).length;

  const averageLeadsPerDay = Math.round(totalLeads / 30);
  const averageLeadsPerWeek = Math.round(totalLeads / 4);
  const averageLeadsPerMonth = Math.round(totalLeads / 12);

  const getDataForTimeframe = () => {
    switch (timeframe) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return monthlyData;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/users/list"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Users
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{user.name}'s Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">Performance metrics and activity analysis</p>
          </div>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{totalLeads}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+12.5%</span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Companies</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{totalCompanies}</p>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+8.2%</span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Daily Leads</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{averageLeadsPerDay}</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+15.3%</span>
            <span className="ml-2 text-gray-500">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Monthly Leads</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{averageLeadsPerMonth}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 font-medium">-3.2%</span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Performance Trends</h2>
            <p className="mt-1 text-sm text-gray-500">
              {timeframe === 'daily' ? 'Daily' : timeframe === 'weekly' ? 'Weekly' : 'Monthly'} lead and company generation
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Leads</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Companies</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getDataForTimeframe()}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCompanies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={timeframe === 'daily' ? 'date' : timeframe === 'weekly' ? 'week' : 'month'}
              />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#6366F1"
                fillOpacity={1}
                fill="url(#colorLeads)"
                name="Leads"
              />
              <Area
                type="monotone"
                dataKey="companies"
                stroke="#A855F7"
                fillOpacity={1}
                fill="url(#colorCompanies)"
                name="Companies"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-6">
          {mockLeads
            .filter(lead => lead.persons?.some(p => p.person.email === user.email))
            .slice(0, 5)
            .map((lead, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Created lead for {lead.companyName}
                    </p>
                    <span className="text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {lead.jobTitle} • {lead.location}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}