# DUCA 2026 T2 O-Week Beginner CTF

A collection of short, beginner-friendly cybersecurity challenges created for the Deakin University Cybersecurity Association (DUCA) O-Week events and stalls.

The challenges are designed for people with little or no cybersecurity experience. Each one runs entirely in the browser, provides hints, and demonstrates a common security mistake through a small interactive exercise.

## Challenges

| Challenge | Topic | Goal | Difficulty |
| --- | --- | --- | --- |
| [Buffer Overflow](buffer-overflow/) | Unsafe memory handling | Enter more data than a simulated 16-byte buffer can hold | Beginner |
| [XSS Playground](xss/) | Cross-site scripting | Execute JavaScript and change `isAdmin` to a truthy value | Beginner |
| [Hardcoded Passwords](hardcoded-passwords/) | Exposed client-side secrets | Inspect the application, recover the encoded password, and log in | Beginner |

All three pages use a shared dark terminal-inspired design and display the DUCA and DSEC logos from [`_common/`](_common/).

## Running the Challenges

No installation, build process, package manager, database, or backend is required.

Clone the repository:

```bash
git clone https://github.com/hirusha-adi/uni-deakin-duca-26-t2-oweek-ctf.git
cd uni-deakin-duca-26-t2-oweek-ctf
```

### Option 1: Open the files directly

Clone or download the repository, then open any challenge's `index.html` file in a web browser:

- `buffer-overflow/index.html`
- `xss/index.html`
- `hardcoded-passwords/index.html`

### Option 2: Use a local web server

From the repository root, run:

```bash
python3 -m http.server 8000
```

Then visit:

- <http://localhost:8000/buffer-overflow/>
- <http://localhost:8000/xss/>
- <http://localhost:8000/hardcoded-passwords/>

An internet connection is required for the CDN-hosted Bootstrap and jQuery dependencies.

## Challenge Details

### 1. Buffer Overflow

**Location:** [`buffer-overflow/`](buffer-overflow/)

This challenge presents a fake terminal containing a vulnerable greeting program. The program claims to reserve 16 bytes for a name but still allows the user to enter a much longer value.

Participants can:

- Enter a short name and observe the program exit normally.
- Watch characters fill a visual 16-byte memory buffer.
- Fill the complete buffer and see that no room remains for a null terminator.
- Enter more than 16 characters and observe bytes spilling into simulated adjacent memory.
- Trigger a simulated stack-smashing error and segmentation fault.

The page treats inputs of up to 15 characters as safe. A 16-character input demonstrates the missing string terminator, while a much longer input—such as 40 characters—produces the most dramatic crash output.

This is an educational simulation. JavaScript is not actually corrupting browser memory.

#### Learning outcomes

- Understand that fixed-size buffers have strict capacity limits.
- See how unchecked input can overwrite adjacent memory.
- Learn why bounds checking and safe input functions matter.
- Recognize terms such as buffer overflow, stack smashing, and segmentation fault.

#### Solution

Enter a value longer than the allocated buffer, for example:

```text
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

Click **Run** to trigger the simulated overflow.

See the full walkthrough in [`buffer-overflow/README.md`](buffer-overflow/README.md).

### 2. XSS Playground

**Location:** [`xss/`](xss/)

This challenge contains a name field that intentionally renders participant input as HTML. It also evaluates any `<script>` elements placed in the rendered output.

The page exposes two JavaScript variables:

```javascript
let username = "user";
let isAdmin = false;
```

The objective is to use cross-site scripting to change `isAdmin` from `false` to a truthy value. When successful, the page displays the challenge-complete message.

#### Learning outcomes

- Understand the difference between rendering input as text and rendering it as HTML.
- See how untrusted input can execute JavaScript.
- Learn that injected scripts can read and modify application state.
- Recognize why output encoding, sanitization, and Content Security Policy are important.

#### Solution

First confirm that JavaScript execution works:

```html
<script>alert(1)</script>
```

Inspect the exposed state:

```html
<script>alert(isAdmin)</script>
```

Complete the challenge:

```html
<script>isAdmin = 1</script>
```

See the full walkthrough in [`xss/README.md`](xss/README.md).

### 3. Hardcoded Passwords

**Location:** [`hardcoded-passwords/`](hardcoded-passwords/)

This challenge presents a login page whose authentication logic runs entirely in the browser. The JavaScript source contains a Base64-encoded password:

```javascript
const password_encoded = "bGV0bWVpbkBEVUNB";
```

Participants are encouraged to inspect the page, find `authenticate.js`, decode the value, and use the recovered password to log in.

The application compares the Base64 encoding of the entered password with the hardcoded value. A successful match unlocks the displayed access state and opens a success modal.

For simplicity, this demonstration validates only the password; the username field is present for the login-page experience but is not checked by `authenticate.js`.

#### Learning outcomes

- Understand that browser-delivered JavaScript is visible to users.
- Learn that Base64 is encoding, not encryption.
- Recognize why passwords, API keys, and other secrets must not be embedded in frontend code.
- Understand that sensitive authentication decisions should happen on a trusted server.

#### Solution

Decode the stored value in the browser console:

```javascript
atob("bGV0bWVpbkBEVUNB")
```

The decoded password is:

```text
letmein@DUCA
```

Enter it in the password field and click **Log In**.

See the illustrated walkthrough in [`hardcoded-passwords/README.md`](hardcoded-passwords/README.md).

## Repository Structure

```text
.
├── README.md
├── _common/
│   ├── dsec.png
│   └── duca.png
├── buffer-overflow/
│   ├── README.md
│   └── index.html
├── hardcoded-passwords/
│   ├── README.md
│   ├── authenticate.js
│   ├── index.html
│   ├── styles.css
│   └── res/
│       ├── image.png
│       └── image-1.png
└── xss/
    ├── README.md
    └── index.html
```

### Shared assets

- [`_common/duca.png`](_common/duca.png) — Deakin University Cybersecurity Association logo.
- [`_common/dsec.png`](_common/dsec.png) — Deakin Software Engineering Club logo.

Challenge pages reference these files using paths such as `../_common/duca.png`.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- [Bootstrap 5.3.3](https://getbootstrap.com/)
- [jQuery 3.7.1](https://jquery.com/) for the XSS challenge

The Buffer Overflow and XSS pages keep their styling and logic in their respective HTML files. The Hardcoded Passwords challenge separates its styles and authentication logic into `styles.css` and `authenticate.js`.

## Implementation Notes

- The projects are static browser demonstrations and do not persist participant data.
- Refreshing a page resets its challenge state.
- The buffer visualization uses JavaScript string length as a beginner-friendly approximation of bytes and is best demonstrated with ordinary ASCII characters.
- The XSS challenge explicitly uses unsafe HTML rendering and `eval()` so simple introductory payloads work consistently.
- The hardcoded password challenge uses `btoa()` and `atob()` to demonstrate Base64 encoding and decoding.
- Bootstrap and jQuery are loaded from public CDNs rather than stored in the repository.

## Facilitator Guide

These challenges are intended to be short demonstrations at an O-Week stall. A suggested flow is:

1. Let the participant try the challenge without assistance.
2. Point them toward the expandable hint if they get stuck.
3. Ask what they think went wrong after they complete it.
4. Explain the corresponding defensive practice.
5. Reset or refresh the page for the next participant.

Suggested discussion points:

- **Buffer Overflow:** Validate input size and use memory-safe APIs or languages.
- **XSS:** Treat user input as untrusted, render it as text, sanitize HTML, and use a strong Content Security Policy.
- **Hardcoded Passwords:** Never place secrets or trusted authentication logic in frontend code.

## Safety and Educational Use

The repository intentionally contains vulnerable patterns for controlled learning:

- The XSS page deliberately executes participant-supplied JavaScript.
- The password is deliberately recoverable from client-side source code.
- The buffer overflow is simulated and does not perform real memory corruption.

Run these challenges only in an educational environment. Do not copy the vulnerable patterns into production applications, and do not use the XSS payloads on websites or systems without explicit authorization.

## Customization

Each challenge is deliberately small and can be edited without a build step:

- Change headings, hints, or challenge text directly in `index.html`.
- Adjust the buffer limits in `buffer-overflow/index.html`.
- Change the XSS variables or success condition in `xss/index.html`.
- Change the password by Base64-encoding a new value and updating `password_encoded` in `hardcoded-passwords/authenticate.js`.
- Update shared branding by replacing the PNG files in `_common/` while keeping the same filenames.

If a new challenge is added, use the existing pages as a design reference so the terminal styling, challenge goal card, hint section, solution link, and shared logo footer remain consistent.
