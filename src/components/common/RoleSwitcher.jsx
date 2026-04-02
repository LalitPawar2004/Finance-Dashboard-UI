import { Shield } from 'lucide-react';

const RoleSwitcher = ({ currentRole, onRoleChange }) => {
  return (
    <div className="flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-lg">
      <Shield size={18} className="text-gray-600" />
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Role:</span>
        <select
          value={currentRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="admin">Admin (Full Access)</option>
          <option value="viewer">Viewer (Read Only)</option>
        </select>
      </div>
    </div>
  );
};

export default RoleSwitcher;