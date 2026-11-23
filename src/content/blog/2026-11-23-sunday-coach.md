---
title: Sunday Coach - An AI Voice Note About My Running Week
slug: sunday-coach
draft: false
description: Gluing AI onto the apps I already built, for next to nothing.
category: running
tags:
  - case-study
publishedDate: 2026-11-23T19:00:00
featured: false
featuredImage: /images/uploads/sunday-coach-canvas.png
readTime: null
---

Every Sunday night I do the same thing. Open JAVA, my training log (yeah, my own version of Strava), and look back through the week. Open Elevate, the plan I coach from, and look at what's coming up - for me and the folk I coach. I jump between the two side by side, do some mental maths on miles and paces, and decide whether next week still makes sense based on how well the previous week went.

I built both of those apps. They both sit on Supabase. And as of yet they had never once spoken to each other. They were built for different purposes. Elevate for the people I coach - I just then happened to put my own training plan in it. JAVA was built for me, no more of my fitness and physiological data for companies with me paying. And as of yet they had never once spoken to each other.

So I wanted to see what happens if, instead of building a third app, I just glued AI onto the two I already had. No new UI, no new database. Just something that reads both, has an opinion, and tells me about it, and can even proactively make changes.

## What it does

I built it in [n8n](https://n8n.io), which is basically a visual canvas for wiring services together (think plumbing, but for APIs). Every Sunday at 7pm it:

- Pulls my last 7 days of activities and my current fitness/fatigue/form numbers from JAVA
- Pulls this week's and next week's sessions from Elevate
- Crunches the numbers - miles run vs planned, longest run, miles at 2:40 marathon pace
- Hands that summary to an AI "coach" for a short review
- Eases next week's hardest session if I'm genuinely cooked
- Turns the review into a voice note using a cloned voice in ElevenLabs, and sends it to my phone on Telegram. Ping! A Sunday Coach summary lands on my phone

![The Sunday Coach workflow in n8n](/images/uploads/sunday-coach-canvas.png "The whole thing on one canvas. Collect, analyse, coach, adjust, deliver.")

That last bit is the one that gets a reaction. There's something about an actual voice telling you that 13.7 miles against a planned 32 isn't going to cut it for a 2:40 that lands harder than a number on a screen. It's a coach in your pocket, minus the coach.

![Sunday Coach voice note](/images/uploads/sunday-coach-voice-note.mp3)

## The AI is the easy bit

The surprising thing was how little of this is "AI". Most of the work is boring plumbing - getting the right rows out of the right tables, converting metres to miles, working out pace per mile.

I deliberately kept the maths out of the language model. LLMs are great with words and iffy with numbers, so a few lines of JavaScript do the sums and the model only gets a tidy summary. It has to return a strict format back (a review, plus the ID of a session to ease or nothing), and it can look up a single activity in more detail if something looks odd. Small, boxed in, one job.

## The AI advises, the rules decide

Here's the bit I'm most pleased with, and it happened by accident while testing.

The coach is told to only ease a session if my form is below -20 (i.e. properly fatigued). My form was sitting at +10.2. Fresh as a daisy. The AI decided to ease my 4x1600m session anyway.

Fair enough, maybe it was being cautious after a light week. But that's not its call to make. So the workflow has a hard rule after the AI - it only touches my plan in Elevate if the AI picks a session _and_ my numbers actually say I'm tired. The rule said no, and the session stayed put.

That's the pattern I keep coming back to with these tools. Let the AI do the fuzzy stuff (reading a week of training and writing something useful), but don't let it near anything that changes real data without a dumb, predictable check in front of it.

## The price of (almost) free

As I mentioned in my [Leaving Google](/blog/leaving-google) post you'll know I'm a bit twitchy about free (well, free and data). So, looking at this:

- **n8n** - free to self-host, or a trial on their cloud
- **Supabase** and **Telegram** - free tiers, more than enough here
- **OpenAI** - a small model, roughly 2,000 tokens a week. A fraction of a penny per run
- **ElevenLabs** - voice cloning isn't on the free tier, so this is the one bit I actually pay for

And yes, I'm aware of the irony of writing a whole post about taking my data back from big tech, then handing voice samples to ElevenLabs and a weekly summary of my training to an LLM. That's the trade I'm making for the fun of it, eyes open. 

## Augment, don't rebuild

The real takeaway for me isn't the voice note. It's that I didn't have to touch JAVA or Elevate at all. Two apps I'd already built became more useful because something cheap and a bit clever now sits between them, reads both, and joins the dots I was joining in my head every Sunday.

There's loads more I could do with it (a mid-week check-in, pulling in sleep data, letting athletes I coach get their own version) but for now I'm just enjoying getting told off once a week.

The whole workflow is up on [GitHub](https://github.com/joeleaton/sunday-coach) if you want to have a poke around, including a sample voice note.
