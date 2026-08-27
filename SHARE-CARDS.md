# Share cards

| File | Size | Ratio | Use |
|---|---|---|---|
| `public/og.jpg` | 1200×630 | 1.91:1 | `og:image`, Twitter large card |
| `public/x-banner.jpg` | 1500×330 | 50:11 | `x:game:image` X feed banner |

Host guard: only rewrite when host is localhost / 127.0.0.1 or `*.github.io`.

```js
const ogImage = `${location.protocol}//${host}${dir}public/og.jpg`;
const xBanner = `${location.protocol}//${host}${dir}public/x-banner.jpg`;
```
