import { useParams } from 'react-router-dom'
import TeamSidebar from '../components/TeamSidebar'
import FormRenderer from '../components/FormRenderer'
import ChangeTracker from '../components/ChangeTracker'
import Timeline from '../components/Timeline'

export default function Transaction() {
  const { id } = useParams()

  return (
    <div className="flex h-screen bg-gray-50">
      <TeamSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4">
          <h2 className="text-xl font-semibold">TREC 1-4 Family Contract - {id}</h2>
        </header>
        <div className="flex-1 overflow-hidden flex">
          <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
            <ChangeTracker />
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <FormRenderer />
          </div>
        </div>
        <div className="bg-white border-t p-4">
          <Timeline />
        </div>
      </div>
    </div>
  )
}
