'use client'

import { useConfig } from '#/state/application/hooks'
import { OViewer } from '@/components/MarkDown'
import { useMemo } from 'react'

export function BountiesDetail({ data }) {
  const config = useConfig()

  const filters = useMemo(() => {
    return config?.find(f => f.config_id === 1)?.config_value['bounty'].find(f => f.name === 'Ecosystem')?.labels || []
  }, [config])

  return (
    <div>
       <div className="mb-3">
      <h4 className="mb-6 text-lg">Bounty Detail</h4>
      <div className="opacity-80 [&>a]:font-bold [&>a]:underline">{data && <OViewer value={data?.detail} />}</div>
    </div>
      <div className="mb-14">
        <span className="mr-1 rounded-md border border-gray-600 px-1 py-[2px] text-sm text-gray-100">
          {filters.find(f => f.id === data?.ecosystem)?.name}
        </span>
      </div>
    </div>

  )
}