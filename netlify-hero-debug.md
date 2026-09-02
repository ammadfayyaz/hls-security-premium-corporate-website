# Live Netlify Hero Debug Findings

Checked `https://hls-world.netlify.app/` after the user reported a redeployment.

The live homepage still renders the hero image element with `src="/manus-storage/hls-hero-banner_73c91306.png"`. The page viewport is black in the hero area and shows the image alt text, indicating the image request is failing. The browser console showed no JavaScript errors.

This confirms the live deploy is still serving an older homepage bundle rather than the GitHub `main` source at commit `f66d6f4`, whose `client/src/pages/Home.tsx` uses `/images/hero/hero-desktop.jpg` and `/images/hero/hero-mobile.jpg`.

The Netlify deploy dashboard at `https://app.netlify.com/projects/hls-world/deploys` is inaccessible in the current browser session and returns `Unauthorized / Access Denied`, so the deploy’s commit, branch, and build log cannot be inspected without Netlify login or user-provided access.
