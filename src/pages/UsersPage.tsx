import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/common/Tabs';
import { UsersList } from '../components/users/UsersList';
import { TeamsView } from '../components/users/TeamsView';

export function UsersPage() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Users & Teams</h1>
        <p className="mt-1 text-sm text-gray-500">Manage system users and organize them into teams</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UsersList />
        </TabsContent>
        <TabsContent value="teams">
          <TeamsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}