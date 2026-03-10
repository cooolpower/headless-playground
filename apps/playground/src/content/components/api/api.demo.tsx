'use client';

import {
  useApi,
  Button,
  Card,
  CardHeader,
  CardContent,
  Flex,
  Input,
  Text as UIText,
  Caption,
} from '@cooolpower/headless-ui';
import type { UseTypographyProps } from '@cooolpower/headless-ui';
import { demoApi } from '@/api/demo';
import { useState, useEffect } from 'react';

export function ApiDemo() {
  const [postId, setPostId] = useState<number | string | undefined>();
  const [postTitle, setPostTitle] = useState('Apple MacBook Pro 16');
  const [postBody, setPostBody] = useState('Intel Core i9, 16GB RAM');
  const [logs, setLogs] = useState<string[]>([]);

  // 1. GET (List) - 자동 실행
  const {
    data: objects,
    error: listError,
    request: fetchList,
    isLoading: isListLoading,
  } = useApi<any[]>(demoApi.getPosts);

  // 2. GET (Detail)
  const {
    data: objectDetail,
    isLoading: isDetailLoading,
    request: fetchDetail,
  } = useApi<any>(demoApi.getPost(postId), { enabled: false });

  // 3. Mutation hooks
  const { isLoading: isCreating, request: createObject } = useApi(
    demoApi.createPost,
  );
  const { isLoading: isUpdating, request: updateObject } = useApi(
    demoApi.updatePost(postId),
  );
  const { isLoading: isDeleting, request: deleteObject } = useApi(
    demoApi.deletePost(postId),
  );

  const addLog = (message: string) => {
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${message}`,
      ...prev.slice(0, 14),
    ]);
  };

  useEffect(() => {
    if (listError) {
      addLog(`[GET] List 로드 실패: ${listError.message}`);
    }
  }, [listError]);

  const handleFetchList = async () => {
    addLog('[GET] List 요청 시작');
    try {
      await fetchList();
      addLog('[GET] List 완료');
    } catch (e) {
      addLog(`[GET] List 실패: ${(e as Error).message}`);
    }
  };

  const handleFetchDetail = async () => {
    if (!postId) {
      addLog('[GET] Detail 실패: ID를 입력해주세요');
      return;
    }
    addLog(`[GET] Detail (ID: ${postId}) 요청 시작`);
    try {
      await fetchDetail();
      addLog(`[GET] Detail 완료`);
    } catch (e) {
      addLog(`[GET] Detail 실패: ${(e as Error).message}`);
    }
  };

  const handleCreateObject = async () => {
    addLog('[POST] Create 요청 시작');
    try {
      const result: any = await createObject({
        body: {
          name: postTitle,
          data: { content: postBody },
        },
      });
      addLog(`[POST] Create 완료 (New ID: ${result?.id})`);
      if (result?.id) setPostId(result.id);
    } catch (e) {
      addLog(`[POST] Create 실패: ${(e as Error).message}`);
    }
  };

  const handleUpdateObject = async () => {
    if (!postId) return;
    addLog(`[PUT] Update (ID: ${postId}) 요청 시작`);
    try {
      await updateObject({
        body: {
          name: postTitle,
          data: { content: postBody },
        },
      });
      addLog('[PUT] Update 완료');
    } catch (e) {
      addLog(`[PUT] Update 실패: ${(e as Error).message}`);
    }
  };

  const handleDeleteObject = async () => {
    if (!postId) return;
    addLog(`[DELETE] (ID: ${postId}) 요청 시작`);
    try {
      await deleteObject();
      addLog('[DELETE] 완료');
      setPostId(undefined);
    } catch (e) {
      addLog(`[DELETE] 실패: ${(e as Error).message}`);
    }
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <Flex direction="column" gap="2.5rem">
        <section>
          <div
            style={{ color: '#666', display: 'block', marginBottom: '1.5rem' }}
          >
            <UIText>
              Restful-API.dev를 사용하여 실제 데이터 영속성을 테스트해보세요.
              별도의 인증 없이 즉시 사용 가능합니다.
            </UIText>
          </div>

          <Card>
            <CardContent style={{ padding: '1.5rem' }}>
              <Flex direction="column" gap="1.5rem">
                {/* ID Input & GET/DELETE */}
                <Flex gap="1.5rem" align="center" wrap="wrap">
                  <Flex gap="8px" align="center">
                    <div style={{ fontWeight: 600 }}>
                      <Caption>Object ID:</Caption>
                    </div>
                    <Input
                      type="text"
                      value={postId?.toString() ?? ''}
                      onChange={(val) => setPostId(val || undefined)}
                      style={{ width: '150px' }}
                      placeholder="ID (e.g. ff8081...)"
                    />
                  </Flex>
                  <Flex gap="0.75rem" wrap="wrap">
                    <Button
                      onClick={handleFetchList}
                      disabled={isListLoading}
                      type="dashed"
                    >
                      GET List
                    </Button>
                    <Button
                      onClick={handleFetchDetail}
                      disabled={isDetailLoading || !postId}
                      color="info"
                    >
                      GET Detail
                    </Button>
                    <Button
                      onClick={handleDeleteObject}
                      disabled={isDeleting || !postId}
                      color="error"
                    >
                      DELETE
                    </Button>
                  </Flex>
                </Flex>

                {/* Name & Data content */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    paddingTop: '1rem',
                  }}
                >
                  <Flex gap="1rem" wrap="wrap">
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <Flex direction="column" gap="4px">
                        <div style={{ fontWeight: 600 }}>
                          <Caption>Object Name:</Caption>
                        </div>
                        <Input
                          type="text"
                          value={postTitle}
                          onChange={(val) => setPostTitle(val)}
                          placeholder="e.g. Apple MacBook Pro 16"
                        />
                      </Flex>
                    </div>
                    <div style={{ flex: 2, minWidth: '300px' }}>
                      <Flex direction="column" gap="4px">
                        <div style={{ fontWeight: 600 }}>
                          <Caption>Content / Description:</Caption>
                        </div>
                        <Input
                          type="text"
                          value={postBody}
                          onChange={(val) => setPostBody(val)}
                          placeholder="e.g. 16GB RAM, 512GB SSD"
                        />
                      </Flex>
                    </div>
                  </Flex>

                  <Flex gap="0.75rem">
                    <Button
                      onClick={handleCreateObject}
                      disabled={isCreating}
                      type="primary"
                    >
                      POST Create
                    </Button>
                    <Button
                      onClick={handleUpdateObject}
                      disabled={isUpdating || !postId}
                      color="warning"
                    >
                      PUT Update
                    </Button>
                  </Flex>
                </div>
              </Flex>
            </CardContent>
          </Card>
        </section>

        {/* Status Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <Card style={{ flex: 1, minWidth: '320px' }}>
            <CardHeader>
              <UIText {...({ strong: true } as UseTypographyProps)}>
                Response Preview
              </UIText>
            </CardHeader>
            <CardContent style={{ padding: '1rem' }}>
              <div
                style={{
                  borderRadius: '6px',
                  height: '240px',
                  overflowY: 'auto',
                }}
              >
                <pre
                  style={{
                    fontSize: '12px',
                    margin: 0,
                    height: '240px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {JSON.stringify(
                    objectDetail || (objects && objects[0]),
                    null,
                    2,
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card style={{ flex: 1, minWidth: '320px' }}>
            <CardHeader>
              <UIText {...({ strong: true } as UseTypographyProps)}>
                Activity Logs
              </UIText>
            </CardHeader>
            <CardContent style={{ padding: '1rem' }}>
              <div
                style={{
                  background: '#0d1117',
                  color: '#4af626',
                  padding: '1rem',
                  borderRadius: '6px',
                  height: '240px',
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                }}
              >
                {logs.length === 0 && (
                  <span style={{ color: '#666' }}>Waiting...</span>
                )}
                {logs.map((log, i) => (
                  <div key={i} style={{ marginBottom: '6px' }}>
                    {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Flex>
    </div>
  );
}
