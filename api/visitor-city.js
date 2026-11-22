function cityName(header) {
  try {
    return decodeURIComponent(header || '').trim() || 'Unknown city';
  } catch {
    return 'Unknown city';
  }
}

export default function visitorCity(request, response) {
  // The response contains the requesting browser's coarse location.
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    response.statusCode = 405;
    return response.end();
  }
  response.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  if (request.method === 'HEAD') return response.end();

  const location = [
    cityName(request.headers['x-vercel-ip-city']),
    request.headers['x-vercel-ip-country-region'],
    request.headers['x-vercel-ip-country'],
  ].filter(Boolean).join(', ').slice(0, 255);
  const payload = JSON.stringify({ name: 'City page view', data: { location } }).replace(/</g, '\\u003c');

  // The analytics script processes queued callbacks before its first page view.
  response.end(`(function () {
    const register = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    register('beforeSend', function (event) {
      if (event.type === 'pageview') window.va('event', ${payload});
      return event;
    });
  })();`);
}
