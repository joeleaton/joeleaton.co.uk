---
title: St. Barts Reverb Plugin
slug: st-barts-reverb-plugin
description: A plug-in that captures the reverb of a neo-gothic church that you can apply to your music.
categories:
  - music
tags:
  - tools
  - composition
year: 2025
location: Brighton, UK
featured: true
featuredImage: /images/uploads/st.barts-UI.png
videoUrl: ''
technologies:
  - C++
  - JUCE
  - Impulse response
  - Convolution reverb
links: null
publishedDate: 2026-02-07T19:35:00
---

# St. Barts Reverb

St. Bartholomew's is a neo-gothic church in Brighton (UK), and is widely considered to be the tallest parish church in Britian with potentially the largest volume due to it's non-standard shape - it's huge!

Years ago I recorded the reverberant characteristics of the space and used it in my undergraduate teaching.

More recently, I've turned it into a Plug-In (Standalone, VST3, AU). Read about the story behind it and how I created it [in this blog post](../../blog/balloons-bikes-brighton-st-barts-reverb).

Take a listen here, download it, and use it in your own music - it's free!

## Audio demos

Here are some examples of St Barts reverb applied to some recordings (no other processing took place):

### Piano

From the seminal 1981 recordings of Bach's Goldberg variations by Glen Gould:

/images/uploads/Piano Dry.mp3

/images/uploads/Piano Wet (St Barts).mp3

### Vocals

Imogen Heap's Lost & Found:

/images/uploads/Vocals Dry.mp3

/images/uploads/Vocals Wet (St Barts).mp3

### Chamber Ensemble

Piano Quintet in F-Sharp Minor by Kaleidoscope Chamber Collective:

/images/uploads/Chamber Ensemble Dry.mp3

/images/uploads/Chamber Ensemble Wet (St Barts).mp3

### Music

What happens when you put Adele in St. Barts?:

/images/uploads/Adele Dry.mp3

/images/uploads/Adele Wet (St Barts).mp3

## Download

Get it free! Download includes standalone, VST3, and AU versions.

:::buttons

Download St Barts | https://drive.google.com/file/d/1i1WcKehlrApvIUXkUX5m7zQKVGwYgV3X/view?usp=drive_link | outline
:::

## Installing on macOS

The build is ad-hoc signed, not notarised, and the files pick up macOS's download quarantine on the way to you — so macOS will block them on first open until you clear it. This is expected.

1. Unzip and copy the components to:

    - AU → `~/Library/Audio/Plug-Ins/Components/St Barts Reverb.component`
    - VST3 → `~/Library/Audio/Plug-Ins/VST3/St Barts Reverb.vst3`
    - Standalone → wherever you like (e.g. `/Applications`)

2. Clear the download quarantine. Open Terminal and run, adjusting paths if needed:

```plain
  xattr -dr com.apple.quarantine ~/Library/Audio/Plug-Ins/Components/St\ Barts\ Reverb.component
   xattr -dr com.apple.quarantine ~/Library/Audio/Plug-Ins/VST3/St\ Barts\ Reverb.vst3
   xattr -dr com.apple.quarantine /Applications/St\ Barts\ Reverb.app
```

3. First launch of the standalone: if macOS still warns of an unidentified developer, open System Settings → Privacy & Security and click Open Anyway in the note near the bottom. You only do this once.
4. In your DAW, rescan the plug-in list if St Barts Reverb doesn't appear.
