---
title: 'Balloons, Bikes, and Brighton: Capturing the Sound of St. Bart’s'
slug: balloons-bikes-brighton-st-barts-reverb
draft: false
description: From prayers to VST - how I built the St Barts reverb plugin.
category: music
tags:
  - case-study
publishedDate: 2026-02-12T20:07:00
featured: false
featuredImage: /images/uploads/st-barts.jpg
readTime: 10
---

### The Church of Massive Volume

St. Bartholomew’s (or St. Barts) in Brighton is an absolute beast of a building. It’s a neo-gothic giant, widely considered the tallest parish church in Britain. Because of its unique non-standard shape, it has a staggering internal volume. This makes it a reverb enthusiast’s dream and when I lived in Brighton my morning commute that went past it always had me thinking about how it sounded.

### Capturing the "Sonic Fingerprint"

Years ago, while I was teaching, I managed to convince the Church's priest to let me and a group of undergrads into the nave for an afternoon of acoustic archaeology - to capture the Impulse Response (IR) of the space.

Armed with a bag of balloons, pins, a pair of stereo microphones, and a laptop, we took turns triggering the room. A popped balloon is a low-tech but highly effective way to stimulate a room's acoustics. It provides a sharp impulse that covers a wide frequency range in a single point in time.

> **The Method:** By recording the balloon pop and using a process called convolution, you can invert the recording. This allows you to play any clean audio, like a dry vocal or a synth, through the inverted recording and place it inside that recorded space. The result here is instant goth-church atmosphere.

We got some very confused looks from the worshippers (the priest insisted the church stay open for silent prayer), but the students were floored when we got back to the studio and heard their own tracks suddenly sounding like they were performed in a Victorian cathedral.

***

### The Unwanted Passerby

I recently found one of the recordings from the day on an old hard drive. The initial balloon pop was perfect, but a few seconds into the decaying tail, a car or motorbike zoomed past the church.

The result was a textbook case of the Doppler Effect. As the vehicle sped by, it created a rasping, filtered zing that rose in frequency and fluctuated in volume, completely masking the natural decay of the church. It was a beautiful recording ruined by a 50cc engine.

Here's an AI-slop infographic of the doppler effect to save me stealing someone elses:

![doppler effect diagram](/images/uploads/doppler-effect.jpeg "The Doppler Effect on how we perceive sound")

### The Restoration: Spectral Surgery

I didn't want to let that rich, early reflection go to waste, so I decided to attempt a digital restoration.

First, I used **iZotope RX** to manually attenuate the frequency spikes of the engine. However, cleaning out the noise left me with a stunted reverb - as at a certain time, the noise outweighed the reverb tail. The measured _RT\~60\~_ (the time it takes for a sound to decay by 60dB) was only \~4.2 seconds which is way too short for a space of St. Bart's magnitude.

### Before spectral repair

![spectrogram before repair](/images/uploads/Screenshot%202026-02-10%20at%2020.15.53.png)

### After spectral repair

![spectrogram after spectral repair](/images/uploads/Screenshot%202026-02-10%20at%2020.14.18.png)

So the goal was to using some processing magic to somehow extend that _RT \~60\~_ to a more realistic 6.5 seconds.

To bridge the gap between real audio and synthetic tail, I worked with some custom code to handle the heavy lifting. Specifically:

| Step | Process | Goal |
| --- | --- | --- |
| 1. Decay Analysis | Measuring the slope of the cleaned audio. | Ensure the new tail matches the original's vibe. |
| 2. Spectral Extension | Generating filtered noise matched to the IR’s late reflections. | Creating a seamless ghost of the original sound. |
| 3. Crossfade Blending | Smoothing the transition from real data to synthesized tail. | Avoiding any audible seams or jumps. |
| 4. Exponential Envelope | Applying a natural decay curve targeting 6.5s *RT \~60\~*. | Mimicking the physics of a massive stone room. |

***

### Building the Plugin

To actually _use_ this restored IR, I built a plugin in C++ using a partitioned overlap-add FFT convolution algorithm. This is the gold standard for real-time reverb because it allows the computer to process long audio files without catching fire. The UI wrapper was built in [JUCE](https://juce.com/).

#### The DSP Specs:

- **FFT Size:** 2 ^12^  (4096 samples) — A sweet spot for balancing CPU load and latency.
- **Partition Size:** 2048 samples.
- **Total IR Length:** 7.5 seconds (\~360,000 samples).
- **Gain Normalization:** The IR is peaked at -12dB. This ensures that when you crank the Wet knob to 100%, you don't accidentally blow your speakers. Saying that, is is loud so gain staging is needed!

The final result is an IR that preserves the authentic, dark, early character of St. Bartholomew’s while offering a smooth, natural tail that (thankfully) is free of motorbikes.

## Experience the St. Bart’s Sound

I’ve uploaded everything to [the project page](../../projects/st-barts-reverb-plugin) so you can put the restoration to the test. There you can listen to some demos and download the Plugin to bring a piece of Brighton's gothic history into your DAW.
