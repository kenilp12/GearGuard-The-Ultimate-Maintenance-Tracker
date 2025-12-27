import { useState, useEffect } from 'react'
import axios from 'axios'

const WorkOrderForm = ({ workOrderId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    equipmentCategory: '',
    company: '',
    usedBy: '',
    maintenanceType: '',
    assignee: '',
    assignedDate: '',
    description: '',
    typeCost: '',
    employee: '',
    startDate: '',
    usedInProject: '',
    status: 'Pending',
    dueDate: ''
  })
  const [equipmentCategories, setEquipmentCategories] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEquipmentCategories()
    fetchUsers()
    if (workOrderId) {
      fetchWorkOrder()
    }
  }, [workOrderId])

  const fetchEquipmentCategories = async () => {
    try {
      const response = await axios.get('/api/equipment/categories')
      setEquipmentCategories(response.data)
    } catch (error) {
      console.error('Error fetching equipment categories:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchWorkOrder = async () => {
    try {
      const response = await axios.get(`/api/workorders/${workOrderId}`)
      const wo = response.data
      setFormData({
        name: wo.name || '',
        equipmentCategory: wo.equipmentCategory?._id || '',
        company: wo.company || '',
        usedBy: wo.usedBy || '',
        maintenanceType: wo.maintenanceType || '',
        assignee: wo.assignee?._id || '',
        assignedDate: wo.assignedDate ? new Date(wo.assignedDate).toISOString().split('T')[0] : '',
        description: wo.description || '',
        typeCost: wo.typeCost || '',
        employee: wo.employee || '',
        startDate: wo.startDate ? new Date(wo.startDate).toISOString().split('T')[0] : '',
        usedInProject: wo.usedInProject || '',
        status: wo.status || 'Pending',
        dueDate: wo.dueDate ? new Date(wo.dueDate).toISOString().split('T')[0] : ''
      })
    } catch (error) {
      console.error('Error fetching work order:', error)
      setError('Failed to load work order')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const submitData = {
        ...formData,
        equipmentCategory: formData.equipmentCategory || undefined,
        assignee: formData.assignee || undefined,
        assignedDate: formData.assignedDate || undefined,
        startDate: formData.startDate || undefined,
        dueDate: formData.dueDate || undefined,
        typeCost: formData.typeCost ? parseFloat(formData.typeCost) : undefined
      }

      if (workOrderId) {
        await axios.put(`/api/workorders/${workOrderId}`, submitData)
      } else {
        await axios.post('/api/workorders', submitData)
      }
      
      onSave()
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save work order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="card">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {workOrderId ? 'Edit Work Order' : 'New Work Order'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Category <span className="text-red-500">*</span>
              </label>
              <select
                name="equipmentCategory"
                value={formData.equipmentCategory}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Category</option>
                {equipmentCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Used By?
              </label>
              <input
                type="text"
                name="usedBy"
                value={formData.usedBy}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="maintenanceType"
                value={formData.maintenanceType}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignee
              </label>
              <select
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Assignee</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Date?
              </label>
              <input
                type="date"
                name="assignedDate"
                value={formData.assignedDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type/Cost?
              </label>
              <input
                type="number"
                name="typeCost"
                value={formData.typeCost}
                onChange={handleChange}
                className="input-field"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee?
              </label>
              <input
                type="text"
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date?
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Used in Project?
              </label>
              <input
                type="text"
                name="usedInProject"
                value={formData.usedInProject}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="input-field"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0-2.209.896-4.208 2.343-5.657l1.414 1.414A5.98 5.98 0 006 12c0 1.657.672 3.157 1.757 4.243l1.414-1.414z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WorkOrderForm
