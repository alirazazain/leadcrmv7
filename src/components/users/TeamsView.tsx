import { useState } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import { CreateTeamForm } from './CreateTeamForm';
import { TeamsList } from './TeamsList';
import { AddTeamMembersPanel } from './AddTeamMembersPanel';
import { mockTeams } from '../../data/mockTeams';

export function TeamsView() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showAddMembers, setShowAddMembers] = useState(false);
  // Add state to force re-render when teams change
  const [, setTeamsUpdate] = useState(0);

  const handleAddMembers = (teamId: string) => {
    setSelectedTeam(teamId);
    setShowAddMembers(true);
  };

  const handleTeamCreated = () => {
    // Force a re-render when a team is created
    setTeamsUpdate(prev => prev + 1);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Create New Team</h2>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <CreateTeamForm onTeamCreated={handleTeamCreated} />
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <TeamsList onAddMembers={handleAddMembers} />
      </div>

      <AddTeamMembersPanel
        isOpen={showAddMembers}
        onClose={() => {
          setShowAddMembers(false);
          setSelectedTeam(null);
        }}
        team={selectedTeam ? mockTeams.find(t => t.id === selectedTeam) : null}
      />
    </div>
  );
}