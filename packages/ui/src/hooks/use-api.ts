"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * 범용 API 훅 (useApi)
 * - 모든 HTTP 메서드 지원
 * - Promise 기반 중복 호출 방지 (Deduplication)
 * - 인메모리 캐시 지원
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiDefinition {
  url: string;
  method: HttpMethod;
}

export interface UseApiOptions<TBody, TParams> {
  params?: TParams;
  body?: TBody;
  enabled?: boolean;
  cacheTime?: number; // ms, 기본값 5분
  revalidate?: boolean; // 캐시가 있어도 백그라운드에서 다시 가져올지 여부
  headers?: Record<string, string>;
}

export interface UseApiResponse<TData, TBody, TParams> {
  data: TData | null;
  isLoading: boolean;
  error: Error | null;
  request: (overrides?: {
    body?: TBody;
    params?: TParams;
    headers?: Record<string, string>;
  }) => Promise<TData>;
  invalidate: () => void;
}

// 글로벌 캐시 스토어
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cacheStore = new Map<string, CacheItem<unknown>>();
const pendingRequests = new Map<string, Promise<unknown>>();

const DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5분

export function useApi<
  TData = unknown,
  TBody = unknown,
  TParams = Record<string, string>,
>(
  apiDef: ApiDefinition,
  options: UseApiOptions<TBody, TParams> = {},
): UseApiResponse<TData, TBody, TParams> {
  const {
    params,
    body,
    enabled = apiDef.method === "GET",
    cacheTime = DEFAULT_CACHE_TIME,
    revalidate = false,
    headers = {},
  } = options;

  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // 고유 키 생성 (URL + Params)
  const cacheKey = useMemo(() => {
    const searchParams = new URLSearchParams(params as any).toString();
    const queryString = searchParams ? `?${searchParams}` : "";
    return `${apiDef.method}:${apiDef.url}${queryString}`;
  }, [apiDef.method, apiDef.url, params]);

  const request = useCallback(
    async (overrides?: {
      body?: TBody;
      params?: TParams;
      headers?: Record<string, string>;
    }): Promise<TData> => {
      const mergedParams = { ...params, ...overrides?.params };
      const mergedBody = { ...body, ...overrides?.body };
      const mergedHeaders = { ...headers, ...overrides?.headers };

      const searchParams = new URLSearchParams(mergedParams as any).toString();
      const queryString = searchParams ? `?${searchParams}` : "";
      const url = `${apiDef.url}${queryString}`;
      const method = apiDef.method;
      const currentKey = `${method}:${url}`;

      // 1. GET 요청이고 캐시가 유효한지 확인
      if (method === "GET" && !revalidate) {
        const cached = cacheStore.get(currentKey);
        if (cached && Date.now() - cached.timestamp < cacheTime) {
          setData(cached.data as TData);
          return cached.data as TData;
        }
      }

      // 2. 이미 진행 중인 동일한 요청이 있는지 확인 (Deduplication)
      if (method === "GET" && pendingRequests.has(currentKey)) {
        return pendingRequests.get(currentKey) as Promise<TData>;
      }

      setIsLoading(true);
      setError(null);

      const fetchPromise = (async () => {
        try {
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              ...mergedHeaders,
            },
            body:
              method !== "GET" && mergedBody
                ? JSON.stringify(mergedBody)
                : undefined,
          });

          if (!response.ok) {
            let errorMsg = `API Request Failed [${method} ${url}]: ${response.status} ${response.statusText}`;
            try {
              const errorData = await response.json();
              errorMsg += ` - ${JSON.stringify(errorData)}`;
            } catch (e) {
              // Ignore if not JSON
            }
            throw new Error(errorMsg);
          }

          const result = await response.json();

          // 3. 성공 시 캐시 저장 (GET만)
          if (method === "GET") {
            cacheStore.set(currentKey, {
              data: result,
              timestamp: Date.now(),
            });
          } else {
            // Mutation(POST, PUT 등) 성공 시 관련 캐시 무효화 (기초 전략: 전체 삭제 또는 특정 규칙 필요)
            // 여기서는 단순함을 위해 현재 URL 기반 캐시만 삭제
            cacheStore.delete(`GET:${apiDef.url}`);
          }

          setData(result);
          return result;
        } catch (err) {
          const errorInstance = err instanceof Error ? err : new Error(String(err));
          setError(errorInstance);
          throw errorInstance;
        } finally {
          setIsLoading(false);
          if (method === "GET") {
            pendingRequests.delete(currentKey);
          }
        }
      })();

      if (method === "GET") {
        pendingRequests.set(currentKey, fetchPromise);
      }

      return fetchPromise as Promise<TData>;
    },
    [apiDef, body, params, cacheTime, revalidate],
  );

  const invalidate = useCallback(() => {
    cacheStore.delete(cacheKey);
  }, [cacheKey]);

  useEffect(() => {
    if (enabled) {
      request().catch(() => {
        // 에러는 request 내부에서 setError를 통해 상태로 관리되므로
        // 여기서 별도로 다시 throw하지 않습니다.
      });
    }
  }, [enabled, request]);

  return {
    data,
    isLoading,
    error,
    request,
    invalidate,
  };
}
