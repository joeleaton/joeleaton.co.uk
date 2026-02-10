---
title: St. Barts reverb VST/AU
slug: st-barts-reverb-plugin
description: A plug-in that captures the reverb of a neo-gothic church that you can apply to your music.
categories:
  - music
tags:
  - tools
  - composition
year: 2026
location: ''
featured: false
featuredImage: ''
videoUrl: ''
technologies:
  - c++
  - JUCE
  - Impulse response
  - Convolution reverb
links: null
publishedDate: 2026-02-07T19:35:00
---

# St. Barts Reverb

St. Bartholomew's is a neo-gothic church in Brighton (UK), and is widely considered to be the tallest church in Britian with potentially the largest volume due to it's non-standard shape - it's huge!

## Capturing a space's character

When I lived in Brighton I was fascinated with the acoustics character of the building, and way back when I was teaching I took a group of undergraduate students there one afternoon, with the permission of the priest in an attempt to capture the sound of the place.

Armed with a bag of balloons, some pins, a pair of stereo microphones and a laptop, the students took it in turns to record IR's, or impulse responses (balloons popping); a method of recording how a space reacts to a wide of frequencies over time from a single initiation. A popped balloon is a great way to stimulate the response of a room (it's echo) across the frequency range from a single point in time.

Aside from eliciting some rather odd looks from worshippers (the priest insisted the church stayed open for silent prayers), banging balloons and recording the result is a great way to capture the sonic fingerprint of an environment and when the recorded response is inverted using a process called convolution, you can play music through the reverb - emulating the effect of it being played in the church. This was a great activity to do with creatively and sonically curious students, and they were fascinated back in the studio when we listened back to  their own music with the reverb applied. Instant goth-church!

## The unwanted passerby

Only recently, I stumbled across one of the recordings from St. Barts on an old hard drive and fired it up for a listen. It must have been an outtake or one from an unfortunate student group's recording as although the initial pop of the balloon can be heard echoing around the giant space, the decaying sound is marred by a passing car or motorbike masking the balloon echoes from around 6 seconds in for a good 5-6 seconds. A real shame as the early reflections and the period of the recording sounded amazingly rich.

Just to check, I fired the raw file into a convolution reverb and gave it a quick listen, and sure enough the first echoes sounded wonderful, followed by a rasping filtered zing applied to the source material, rising in frequency (the doppler effect was real!) and changing in amplitude - the car/bike it sounded like it went away then slowly came back!

## Fixing the tail

Undeterred, I went about a few ways to fix this as I really wanted to try and get an IR that could be usable. I knew there would have to be a trade off with the final result, particularly around the lenght of the tail, as towards the end of recording the amplitude of the car/bike had exceeded the tail of the balloon decaying.

## Spectral blurring

In the spectrogram views here, you can clearly see the predominant low frequency area of the car/bike and it's rise. Harmonics appear in higher frequency content too.

Before spectral repair (first 4.5 seconds):

After spectral repair (first 4.5 seconds):

## Further restoration

After attneuating the audio file by ear in Izotope RX, the measured RT60 (the time taken for the impulse to decay by 60db and the true measure of an IR) was only \~4.2 seconds, too short for a large church space.

**Target:**  Extend to 6-7 second RT60 to match the acoustic reality of the space.

To achieve this, I used Claude code to:

1. **Decay analysis** - Measure the existing decay rate from the cleaned audio
2. **Decay compensation** - Apply an envelope to counteract the premature fade, boosting the tail
3. **Spectral extension** - Generated filtered noise matched to the spectral characteristics of the original IR's late reflections
4. **Crossfade blending** - Smoothly transitioned from real IR data into the synthesized extension
5. **Natural decay envelope** - Applied exponential decay targeting \~6.5s RT60

## The repaired IR

The resluting IR  is \~7.5 seconds duration, approximately 6.2s RT60, preserving the authentic early reflections and spatial character while extending the tail naturally. It actually sounds pretty smooth considering, and the total duration really focuses on the dark early character.

As a final stage, gain normalization  is applied to the IR. A -12dB peak during loading to ensure the wet signal doesn't overpower the dry signal at 100% mix - turns out this is a standard practice in convolution reverbs.

## Creating the plugin

The plugin uses a **partitioned overlap-add FFT convolution** algorithm, which is the standard approach for real-time convolution with long impulse responses.

**Key design choices:**

- **FFT Size**: 4096 samples (2^12) - balances latency vs. computational efficiency
- **Partition Size**: 2048 samples (half FFT size) - the "hop" between blocks
- **Latency**: 2048 samples (\~43ms at 48kHz)

**How it works:**

1. The IR is divided into 2048-sample partitions, each pre-transformed to frequency domain
2. Incoming audio is buffered into 2048-sample blocks
3. Each input block is FFT'd and stored in a circular history buffer
4. For each output block, all IR partitions are multiplied with corresponding input history blocks (frequency-domain convolution)
5. Results are summed and inverse-FFT'd back to time domain
6. Overlap-add reconstructs the continuous output stream

This approach allows a 7.5-second IR (\~360,000 samples) to run efficiently in real-time by spreading the convolution work across multiple smaller FFT operations.
