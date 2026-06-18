# uni-deakin-duca-26-t1-ctf-xss

A very simple fully client XSS web CTF intended towards absolute beginners to demonstrate at our O-week stall. 

## Challenge Goal

Use XSS in the name input to change:
- `isAdmin: false`
to
- `isAdmin: 1`

When successful, the page shows: `You are now Admin!`

## How to Solve (Beginner Walkthrough)

1. Open `index.html` in your browser.
2. In the input field, first test that script execution works:
   - Payload: `<script>alert(1)</script>`
   - If you see a popup, the input is being executed as JavaScript.
3. Check whether the challenge variable is accessible from your payload:
   - Payload: `<script>alert(isAdmin)</script>`
   - Expected popup initially: `false`
4. Overwrite the variable:
   - Payload: `<script>isAdmin = 1</script>`
5. Click submit.
6. Confirm success:
   - Variable display should show `isAdmin: 1`
   - You should see `You are now Admin!`

## Why This Works

The app intentionally renders user input unsafely and executes inline script content, so your input can directly read and modify in-page JavaScript variables.

## Example Payloads

- `<script>alert(1)</script>`
- `<script>alert(isAdmin)</script>`
- `<script>isAdmin = 1</script>`
