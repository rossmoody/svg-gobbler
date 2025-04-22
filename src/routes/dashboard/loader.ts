import { Collection } from 'src/types'
import { StorageUtilities } from 'src/utilities/storage-utilities'

export type DashboardLoaderData = {
  collections: Collection[]
}

export async function dashboardLoader(): Promise<DashboardLoaderData> {
  const collections = (await StorageUtilities.getStorageData<Collection[]>('collections')) ?? []
  return { collections }
}
