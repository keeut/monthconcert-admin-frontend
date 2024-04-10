import { QueryClient } from '@tanstack/react-query';

function mutationErrorHandler(error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : '서버와의 연결에 실패했습니다';
  console.log(`업데이트에 실패했습니다. 
${errorMessage}`);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3 * 60 * 1000, // 3 minutes
        retry: false, // default: 3 https://tanstack.com/query/v4/docs/guides/query-retries
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        onError: mutationErrorHandler,
      },
    },
  });
}

export const queryClient = generateQueryClient();
