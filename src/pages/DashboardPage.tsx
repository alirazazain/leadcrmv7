import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Users,
  Building2,
  TrendingUp,
  Target,
  ArrowUp,
  ArrowDown,
  UserPlus,
  FolderPlus,
  Building,
  CheckCircle2,
  Clock,
  XCircle,
  Trophy,
  Calendar
} from 'lucide-react';
import { mockLeads } from '../data/mockLeads';
import { mockCompanies } from '../data/mockCompanies';
import { mockUsers } from '../data/mockUsers';
import { mockTeams } from '../data/mockTeams';

// Quick action cards data
const quickActions = [
  {
    title: 'Create Lead',
    description: 'Add a new sales lead',
    icon: FolderPlus,
    link: '/leads/create',
    color: 'indigo'
  },
  {
    title: 'Add Company',
    description: 'Register new company',
    icon: Building,
    link: '/companies/create',
    color: 'purple'
  },
  {
    title: 'Add User',
    description: 'Create system user',
    icon: UserPlus,
    link: '/users/list',
    color: 'green'
  }
];

// Monthly comparison data
const monthlyComparison = [
  { month: 'Jan', current: 65, previous: 45 },
  { month: 'Feb', current: 78, previous: 52 },
  { month: 'Mar', current: 90, previous: 58 },
  { month: 'Apr', current: 81, previous: 56 },
  { month: 'May', current: 95, previous: 64 },
  { month: 'Jun', current: 110, previous: 75 },
  { month: 'Jul', current: 100, previous: 68 },
  { month: 'Aug', current: 85, previous: 71 },
  { month: 'Sep', current: 92, previous: 63 },
  { month: 'Oct', current: 105, previous: 77 },
  { month: 'Nov', current: 115, previous: 82 },
  { month: 'Dec', current: 125, previous: 85 }
];

// Top performers data
const topPerformers = [
  { name: 'John Doe', leads: 28, conversion: 75, trend: 12 },
  { name: 'Sarah Smith', leads: 24, conversion: 68, trend: 8 },
  { name: 'Mike Johnson', leads: 22, conversion: 62, trend: -3 },
  { name: 'Emily Brown', leads: 19, conversion: 70, trend: 15 }
];

// Recent updates
const recentUpdates = [
  { type: 'lead_created', user: 'John Doe', target: 'Microsoft', time: '2 hours ago' },
  { type: 'lead_converted', user: 'Sarah Smith', target: 'Google', time: '3 hours ago' },
  { type: 'company_added', user: 'Mike Johnson', target: 'Apple', time: '5 hours ago' },
  { type: 'lead_closed', user: 'Emily Brown', target: 'Netflix', time: '1 day ago' },
  { type: 'team_created', user: 'David Wilson', target: 'Sales Team Alpha', time: '1 day ago' }
];

export function DashboardPage() {
  const [timeframe] = useState('yearly');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's an overview of your system.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className={`group relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-${action.color}-500 hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-12 w-12 bg-${action.color}-50 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-100 transition-colors duration-200`}>
                <action.icon className={`h-6 w-6 text-${action.color}-600`} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* System Analytics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{mockLeads.length}</p>
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
              <p className="mt-2 text-3xl font-bold text-gray-900">{mockCompanies.length}</p>
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
              <p className="text-sm font-medium text-gray-500">System Users</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{mockUsers.length}</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              4.8%
            </span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Teams</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{mockTeams.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 font-medium flex items-center">
              <ArrowDown className="h-4 w-4 mr-1" />
              2.3%
            </span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts and Updates */}
      <div className="grid grid-cols-12 gap-6">
        {/* Monthly Comparison Chart */}
        <div className="col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Year-over-Year Comparison</h2>
              <p className="mt-1 text-sm text-gray-500">Monthly lead generation comparison</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Current Year</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Previous Year</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyComparison}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E0E7FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E0E7FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="#6366F1"
                  fillOpacity={1}
                  fill="url(#colorCurrent)"
                  name="Current Year"
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="#818CF8"
                  fillOpacity={1}
                  fill="url(#colorPrevious)"
                  name="Previous Year"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Updates Feed */}
        <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Updates</h2>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {update.type === 'lead_created' && (
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <FolderPlus className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {update.type === 'lead_converted' && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {update.type === 'company_added' && (
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Building className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                    {update.type === 'lead_closed' && (
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    {update.type === 'team_created' && (
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-indigo-600" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{update.user}</span>
                      {update.type === 'lead_created' && ' created a new lead for '}
                      {update.type === 'lead_converted' && ' converted lead for '}
                      {update.type === 'company_added' && ' added company '}
                      {update.type === 'lead_closed' && ' closed deal with '}
                      {update.type === 'team_created' && ' created team '}
                      <span className="font-medium">{update.target}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="col-span-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Top Performers</h2>
                <p className="mt-1 text-sm text-gray-500">Best performing team members this month</p>
              </div>
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="grid grid-cols-4 gap-6">
              {topPerformers.map((performer, index) => (
                <div
                  key={performer.name}
                  className="relative bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center ${
                      performer.trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {performer.trend > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(performer.trend)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {performer.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                      <p className="text-sm text-gray-500">{performer.leads} leads</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Conversion Rate</span>
                      <span className="font-medium text-gray-900">{performer.conversion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-indigo-600 h-1.5 rounded-full"
                        style={{ width: `${performer.conversion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}