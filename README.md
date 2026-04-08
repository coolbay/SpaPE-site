# SpaPE anonymous review website

A concise static website for displaying result videos for paper review.

## Files
- `index.html`: page structure
- `styles.css`: styling
- `videos.js`: video entries
- `app.js`: render logic

## How to add videos
Open `videos.js` and replace each empty `url` with a direct video URL, for example:

```js
{ title: "Normal 01", url: "https://example.com/video01.mp4", note: "SpaPE result" }
```

## Layout
- Centered title and short introduction
- `Normal` section: 3 videos per row, 4 rows total
- `Reverse` section: 3 videos per row, 4 rows total

## Preview locally
Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages
1. Upload the files to a GitHub repo
2. Go to **Settings → Pages**
3. Choose **Deploy from a branch**
4. Select `main` and `/ (root)`
