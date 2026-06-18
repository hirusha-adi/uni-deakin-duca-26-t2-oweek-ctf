# DUCA 2026 T2 CTF - Buffer Overflow Challenge

A simple, fully client-side simulation for teaching absolute beginners what a buffer overflow is.

## Challenge Goal

Crash the fake greeting program by entering more text than its 16-byte name buffer can hold.

## How to Solve

1. Open `index.html` in a browser.
2. Enter a short name, such as `Alex`, and click **Run**. The program exits normally.
3. Notice that the terminal says the name must be fewer than 16 characters.
4. Enter a much longer value, such as:

   ```text
   AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
   ```

5. Click **Run**.
6. The program reports a simulated stack-smashing error and completes the challenge.

## Why This Works

The simulated program has space for only 16 bytes:

```c
char name[16];
```

A safe C program would limit the amount of input copied into `name`. An unsafe program may continue writing after the end of the array. Those extra bytes overwrite nearby memory, which can corrupt data, crash the program, or—in real vulnerable software—allow an attacker to change how the program runs.

The page accepts long input intentionally and visualizes the first 16 bytes. Any additional characters are treated as bytes written outside the allocated buffer.

## Important

This browser challenge is an educational simulation. JavaScript running in the page is not actually corrupting the browser's memory.
