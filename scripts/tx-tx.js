// Converted from https://txscript.pages.dev/tx/loon.js (2026-10-31).
// Preserve the original author's remote forwarding behavior. Original plugin was disabled.
(function () {
  var match = $request.url.match(/^https?:\/\/([^/?#]+)(\/[^?#]*)?(\?.*)?/);
  if (!match) { $done({}); return; }
  var headers = {};
  Object.keys($request.headers || {}).forEach(function (k) {
    if (!/^(host|content-length)$/i.test(k)) headers[k] = $request.headers[k];
  });
  var options = { url: 'https://txscript.pages.dev/tx/' + match[1] + (match[2] || '') + (match[3] || ''),
    method: $request.method || 'GET', headers: headers };
  if ($request.bodyBytes) options.bodyBytes = $request.bodyBytes;
  else if ($request.body) options.body = $request.body;
  $task.fetch(options).then(function (resp) {
    var out = {};
    Object.keys(resp.headers || {}).forEach(function (k) {
      if (!/^(content-encoding|content-length|transfer-encoding)$/i.test(k)) out[k] = resp.headers[k];
    });
    var result = { status: 'HTTP/1.1 ' + (resp.statusCode || 200) + ' Response', headers: out };
    if (resp.bodyBytes) result.bodyBytes = resp.bodyBytes;
    else result.body = resp.body || '';
    $done(result);
  }, function (error) { $done({status:'HTTP/1.1 502 Bad Gateway', body:String(error)}); });
})();
