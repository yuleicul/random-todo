import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryKey } from '@/common/const'
import { History } from './types'

function useGetHistoriesQuery() {
  return useQuery({
    queryKey: [QueryKey.Histories],
    queryFn: () => {
      return localStorage.getItem('histories') || ([] as History[])
    },
  })
}

function useCreateHistoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newHistory: History) => {
      const histories = JSON.parse(
        localStorage.getItem('histories') || '[]',
      ) as History[]
      histories.push(newHistory)
      localStorage.setItem('histories', JSON.stringify(histories))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Histories] })
    },
  })
}

function useUpdateHistoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: History) => {
      const histories = JSON.parse(
        localStorage.getItem('histories') || '[]',
      ) as History[]
      const target = histories.find((history) => history.id === data.id)
      localStorage.setItem('histories', JSON.stringify({ ...target, ...data }))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Histories] })
    },
  })
}

export {
  useGetHistoriesQuery,
  useCreateHistoryMutation,
  useUpdateHistoryMutation,
}
