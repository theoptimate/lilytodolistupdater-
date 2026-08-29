# Running this weekly

Three ways, in ascending order of how little you have to remember.

## 1. Cron, on a machine that stays on

```cron
# Friday 07:00 — pull nothing, process whatever is in agent/state/inbox/
0 7 * * 5 cd ~/code/lilytodolistupdater- && agent/schedule/weekly.sh >> ~/venture-agent.log 2>&1
```

Cron cannot read your mail. Something has to leave a dump in `agent/state/inbox/`
first — a Gmail filter exporting to a folder, an IMAP script, or option 3.

## 2. A Claude Code routine

The mailbox side is the awkward part of this, and an assistant that already holds a
Gmail connection removes it. Set a weekly routine with a prompt along these lines:

> Search Gmail for `from:(ideabrowser.com OR bizbuysell.com OR flippa.com OR
> acquire.com OR empireflippers.com OR quietlight.com OR ifttt.com) newer_than:7d`,
> write the messages to `agent/state/inbox/<today>.json` in the venture agent's
> ingest shape, run `node agent/run.mjs bridge --in` that file, do the extraction
> pass against the prompts it writes, save `records.json`, then run
> `agent/schedule/weekly.sh`. Send me the digest.

The audit inside `weekly.sh` is what keeps that honest: an assistant that invents a
figure fails the run rather than publishing it.

## 3. By hand

```bash
agent/schedule/weekly.sh ~/mail/ventures
```

## What good looks like after a few weeks

- The repeat count starts carrying information — a listing seen five times at three
  prices is telling you something the first sighting could not.
- `node agent/run.mjs calibrate` has enough verdicts to run, and one of the six
  dimensions turns out not to separate anything you kept from anything you dropped.
- The kill criteria have grown, because you learned what you actually will not do.
