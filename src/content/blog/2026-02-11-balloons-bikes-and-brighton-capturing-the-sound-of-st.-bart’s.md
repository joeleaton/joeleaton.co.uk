---
title: 'Balloons, Bikes, and Brighton: Capturing the Sound of St. Bart’s'
slug: balloons-bikes-brighton-st-barts-reverb
draft: false
description: From prayers to VST - how I built the St Barts reverb plugin
category: music
tags:
  - case-study
publishedDate: 2026-02-12T20:07:00
featured: false
featuredImage: ''
readTime: null
---

### The Church of Massive Volume

St. Bartholomew’s in Brighton is an absolute beast of a building. It’s a neo-gothic giant, widely considered the tallest parish church in Britain. Because of its unique, non-standard shape, it possesses a staggering internal volume. In short: it is a reverb enthusiast’s dream and I had it in my sights for a long time.

### Capturing the "Sonic Fingerprint"

Years ago, while I was teaching, I managed to convince a local priest to let me and a group of undergraduate students into the nave for an afternoon of acoustic archaeology. Our mission? To capture the "Impulse Response" (IR) of the space.

Armed with a bag of balloons, pins, a pair of stereo microphones, and a laptop, we took turns triggering the room. A popped balloon is a low-tech but highly effective way to stimulate a room's acoustics. It provides a sharp "impulse" that covers a wide frequency range in a single point in time.

> **The Method:** By recording this pop and using a process called **convolution**, you can essentially "invert" the recording. This allows you to play any clean audio, like a dry vocal or a synth, through that recorded space. The result? Instant "goth-church" atmosphere.

We did get some very confused looks from the worshippers (the priest insisted the church stay open for silent prayer), but the students were floored when we got back to the studio and heard their own tracks suddenly sounding like they were performed in a Victorian cathedral.

***

### The Unwanted Passerby

I recently dug up these old recordings from a dusty hard drive. Most were great, but one "outtake" stood out. The initial balloon pop was perfect, but about six seconds into the decaying tail, a car or motorbike roared past the church.

The result was a textbook case of the **Doppler Effect**. As the vehicle sped by, it created a rasping, filtered "zing" that rose in frequency and fluctuated in volume, completely masking the natural decay of the church. It was a beautiful recording ruined by a 50cc engine.

![doppler effect diagram](/images/uploads/doppler-effect.jpeg)

### The Restoration: Spectral Surgery

I couldn't let that rich, early reflection go to waste, so I decided to attempt a digital restoration.

First, I used **iZotope RX** to manually attenuate the frequency spikes of the engine. However, cleaning out the noise left me with a "stunted" reverb. The measured $RT_{60}$ (the time it takes for a sound to decay by 60dB) was only \~4.2 seconds, way too short for a space of St. Bart's magnitude.

**The Goal:** Extend that $RT_{60}$ to a more realistic 6.5 seconds.

To bridge the gap between "real" audio and "synthetic" tail, I worked with some custom code to handle the heavy lifting:

Step,Process,Goal

1. Decay Analysis,Measuring the slope of the cleaned audio.,"Ensure the new tail matches the original's ""vibe."""
2. Spectral Extension,Generating filtered noise matched to the IR’s late reflections.,"Creating a seamless ""ghost"" of the original sound."
3. Crossfade Blending,Smoothing the transition from real data to synthesized tail.,"Avoiding any audible ""seams"" or jumps."
4. Exponential Envelope,Applying a natural decay curve targeting 6.5s.,Mimicking the physics of a massive stone room.
