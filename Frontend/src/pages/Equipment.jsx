import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

const Equipment = () => {
  const [equipmentCategories, setEquipmentCategories] = useState([])
  const [componentCategories, setComponentCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('equipment')

  useEffect(() => {
    fetchEquipmentCategories()
    fetchComponentCategories()
  }, [])

  const fetchEquipmentCategories = async () => {
    try {
      const response = await axios.get('/api/equipment/categories')
      setEquipmentCategories(response.data)
    } catch (error) {
      console.error('Error fetching equipment categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComponentCategories = async () => {
    try {
      const response = await axios.get('/api/equipment/component-categories')
      setComponentCategories(response.data)
    } catch (error) {
      console.error('Error fetching component categories:', error)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-gray-600 mt-1">Manage equipment and component categories</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('equipment')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'equipment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Equipment Categories
            </button>
            <button
              onClick={() => setActiveTab('component')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'component'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Component Categories
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="card flex justify-center items-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0-2.209.896-4.208 2.343-5.657l1.414 1.414A5.98 5.98 0 006 12c0 1.657.672 3.157 1.757 4.243l1.414-1.414z"></path>
            </svg>
          </div>
        ) : (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {activeTab === 'equipment' ? 'View Equipment Categories' : 'View Component Categories'}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsible</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(activeTab === 'equipment' ? equipmentCategories : componentCategories).length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <p>No {activeTab === 'equipment' ? 'equipment' : 'component'} categories found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    (activeTab === 'equipment' ? equipmentCategories : componentCategories).map(cat => (
                      <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{cat.responsible?.name || 'Unassigned'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{cat.company}</div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Equipment
