---
title: joyBeat
slug: joybeat
draft: false
description: A brain-controlled drum sequencer.
categories:
  - bcmi
  - music
tags:
  - composition
year: 2014
location: Plymouth, UK
featured: false
featuredImage: ''
videoUrl: https://www.youtube.com/watch?v=pEIIBcWWlDQ
technologies:
  - SSVEP
  - Emotion detection
  - Pure Data
  - FM synthesis
links: null
publishedDate: 2026-02-20T16:35:00
---

## joyBeat

**joyBeat** is a brain-controlled drum machine that merges intentional rhythm with subconscious sound. By splitting the control into two different streams, the instrument allows a performer to "think" a beat into existence while their emotional state shapes the actual sound of the drums.

### Technical Implementation

The system works by processing two distinct types of brainwave data at the same time to control a sequencer and a synthesis engine.

- **Active Control: SSVEP and Custom Hardware** Intentional control is handled through **Steady State Visual Evoked Potentials (SSVEP)**. I built custom hardware units that house flickering LED arrays and LCD screens. When the performer looks at an array flashing at a specific frequency, the system detects that frequency in their brainwaves. Using two of these units provides **8 dimensions of active control**, allowing the user to toggle drum voices on and off just by shifting their gaze.
- **Passive Control: Emotional Mapping** The "feel" of the drum kit is driven by the subconscious. By measuring two specific properties in the EEG signal, **arousal** (intensity) and **valence** (positivity), the system can track the performer’s emotional state. These values are mapped in real time to the sonic character (**FM parameters)** of the drum sounds. This means the texture and tone of the music shift automatically based on the user's internal mood.

### Impact

joyBeat moves beyond a simple "user and tool" relationship to create a biological feedback loop. Because the music is shaped by the performer’s emotions, and that same music then influences how the performer feels, the boundary between the artist and the instrument begins to blur.

It leads to a strange and beautiful feedback loop during a performance. Is the music driving the mood, or is the mood driving the music?
