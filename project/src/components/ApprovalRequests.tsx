import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  FileText,
  Filter,
  MessageCircle
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { mockApprovalRequests } from '../data/mockData';

const ApprovalRequests: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'reject'>('approve');
  const [reviewComment, setReviewComment] = useState('');

  const filteredRequests = mockApprovalRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'permission_change':
        return Users;
      case 'file_restore':
        return FileText;
      case 'lock_release':
        return Clock;
      default:
        return AlertTriangle;
    }
  };

  const handleReviewSubmit = () => {
    // Mock implementation
    console.log('Review submitted:', {
      request: selectedRequest,
      decision: reviewDecision,
      comment: reviewComment
    });
    setShowReviewModal(false);
    setSelectedRequest(null);
    setReviewComment('');
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Approval Requests</h2>
            <p className="text-sm text-gray-500 mt-1">Review and approve permission changes and file operations</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">2.4h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Requests</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => {
                const TypeIcon = getTypeIcon(request.type);
                return (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <TypeIcon className="h-8 w-8 text-blue-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {request.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {request.resource.split('/').pop()}
                      </div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">
                        {request.resource}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {request.requestedBy.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{request.requestedBy.name}</div>
                          <div className="text-sm text-gray-500">{request.requestedBy.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {format(request.createdAt, 'MMM d, yyyy')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDistanceToNow(request.createdAt)} ago
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        {request.status === 'pending' && (
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowReviewModal(true);
                            }}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Review
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && !showReviewModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="text-sm text-gray-900">
                    {selectedRequest.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                    {selectedRequest.priority}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="text-sm text-gray-900">{format(selectedRequest.createdAt, 'PPpp')}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Resource</label>
                <p className="text-sm text-gray-900">{selectedRequest.resource}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm text-gray-900">{selectedRequest.description}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Justification</label>
                <p className="text-sm text-gray-900">{selectedRequest.justification}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Requested By</label>
                <div className="flex items-center mt-1">
                  <div className="flex-shrink-0 h-8 w-8">
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {selectedRequest.requestedBy.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{selectedRequest.requestedBy.name}</div>
                    <div className="text-sm text-gray-500">{selectedRequest.requestedBy.email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              {selectedRequest.status === 'pending' && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Review Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Review Request</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Decision</label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="approve"
                      checked={reviewDecision === 'approve'}
                      onChange={(e) => setReviewDecision(e.target.value as 'approve' | 'reject')}
                      className="form-radio text-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Approve</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="reject"
                      checked={reviewDecision === 'reject'}
                      onChange={(e) => setReviewDecision(e.target.value as 'approve' | 'reject')}
                      className="form-radio text-red-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Reject</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Comments</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add your review comments..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  reviewDecision === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {reviewDecision === 'approve' ? 'Approve' : 'Reject'} Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalRequests;