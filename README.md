# nai
Nora Archiver Interface

## Usage
From a release:

```
npm install -g serve
serve -s build
```

Look up the react docs for building from source otherwise.

## Features

Allow the user to see
- The current DJ & their pic
- The current song, and its progress
- The last played songs
- A history of previous recordings
- Some misc server stats

As well as allowing the user to start/refresh/force stop the stream.

Also allows the user to update select settings, most important being the DJs to ignore recording.

This UI is pretty rough, and while all the intended functionality is there, there are some parts that need improvement:
- The minumum supported resolution is 1920x1080
- Only use this locally, I can't imagine how much data it would pull if Nora and nai were over a network.