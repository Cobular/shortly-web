import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
 
/**
 * Proxy requests to get past CORS.
 * 
 * The requested url and request method are passed as query parameters.
 * Desired query parameters are json encoded, base64 encoded, and passed as the `query` query parameter.
 * Headers are proxied as-is.
 * The body is proxied as-is.
 */
export const GET = (({ url, fetch, request }) => {
  let urlParam = url.searchParams.get('url');
  const method = url.searchParams.get('method') ?? 'GET';
  const query = url.searchParams.get('query');

  if (!urlParam) {
    throw error(400, 'url is required');
  }

  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
    throw error(400, 'method must be GET, POST, PUT, or DELETE');
  }

  if (query) {
    const decodedQuery = JSON.parse(atob(query));
    const searchParams = new URLSearchParams(decodedQuery);
    urlParam += `?${searchParams.toString()}`;
  }

  const headers = request.headers;
  const body = request.body;

  return fetch(urlParam, {
    method,
    headers,
    body
  });
}) satisfies RequestHandler;