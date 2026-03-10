import { ApiDefinition } from "@cooolpower/headless-ui";

/**
 * 데모용 API 정의
 * JSONPlaceholder를 사용하여 실제 네트워크 요청 테스트
 */

export const demoApi = {
  // Restful-API.dev 엔드포인트
  getPosts: {
    url: 'https://api.restful-api.dev/objects',
    method: 'GET',
  } as ApiDefinition,

  getPost: (id?: number | string) =>
    ({
      url: `https://api.restful-api.dev/objects/${id ? id : ''}`,
      method: 'GET',
    }) as ApiDefinition,

  createPost: {
    url: 'https://api.restful-api.dev/objects',
    method: 'POST',
  } as ApiDefinition,

  updatePost: (id?: number | string) =>
    ({
      url: `https://api.restful-api.dev/objects/${id ? id : ''}`,
      method: 'PUT',
    }) as ApiDefinition,

  deletePost: (id?: number | string) =>
    ({
      url: `https://api.restful-api.dev/objects/${id ? id : ''}`,
      method: 'DELETE',
    }) as ApiDefinition,
};
