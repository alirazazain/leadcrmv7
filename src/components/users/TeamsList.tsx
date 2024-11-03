import { Plus, Users, PenSquare, Trash2 } from 'lucide-react';
import { mockTeams } from '../../data/mockTeams';
import { DeleteConfirmationDialog } from '../common/DeleteConfirmationDialog';
import { EditTeamPanel } from './EditTeamPanel';
import { useState } from 'react';

interface TeamsListProps {
  onAddMembers: (teamId: string) => void;
}

export function TeamsList({ onAddMembers }: TeamsListProps) {
  const [deleteTeamId, setDeleteTeamId] = useState<string | null>(null);
  const [editingTeam, setEditingTeam] = useState<string | null>(null);

  const handleDeleteTeam = () => {
    if (deleteTeamId) {
      const index = mockTeams.findIndex(t => t.id === deleteTeamId);
      if (index !== -1) {
        mockTeams.splice(index, 1);
      }
      setDeleteTeamId(null);
    }
  };

  const handleEditClick = (teamId: string) => {
    setEditingTeam(teamId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Teams</h2>
        
        <div className="space-y-4">
          {mockTeams.length === 0 ? (
            <p className="text-sm text-gray-500">No teams created yet.</p>
          ) : (
            mockTeams.map((team) => (
              <div
                key={team.id}
                className="group p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{team.name}</h3>
                    {team.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{team.description}</p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-500">
                        {team.members.length} members
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditClick(team.id)}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                      title="Edit team"
                    >
                      <PenSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTeamId(team.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                      title="Delete team"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onAddMembers(team.id)}
                      className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add Members
                    </button>
                  </div>
                </div>

                {team.members.length > 0 && (
                  <div className="mt-4">
                    <div className="flex -space-x-2 overflow-hidden">
                      {team.members.slice(0, 5).map((member) => (
                        <div
                          key={member.id}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 border-2 border-white"
                        >
                          <span className="text-xs font-medium text-gray-600">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      ))}
                      {team.members.length > 5 && (
                        <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 border-2 border-white">
                          <span className="text-xs font-medium text-gray-600">
                            +{team.members.length - 5}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={!!deleteTeamId}
        onClose={() => setDeleteTeamId(null)}
        onConfirm={handleDeleteTeam}
        title="Delete Team"
        message="Are you sure you want to delete this team? This action cannot be undone."
      />

      <EditTeamPanel
        isOpen={!!editingTeam}
        onClose={() => setEditingTeam(null)}
        team={editingTeam ? mockTeams.find(t => t.id === editingTeam) || null : null}
      />
    </div>
  );
}