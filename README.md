# nai
Nora Archiver Interface

Basic react GUI for the Nora project. Allows the user to see:
- The current DJ & their pic
- The current song, and its progress
- The last played songs
- A history of previous recordings
- Some misc server stats

As well as allowing the user to start/refresh/force stop the stream.

Also allows the user to update select settings, most important being the DJs to ignore recording.

This UI is pretty rough, and while all the intended functionality is there, there are some parts of the CSS that need improvement:
- The DJ pic can overflow other elements, it also is not contained at all
- The previous recordings page can overlap the header elements
- The minumum supported resolution is 1920x1080
- Only use this locally, I can't imagine how much data it would pull if Nora and nai were over a network.