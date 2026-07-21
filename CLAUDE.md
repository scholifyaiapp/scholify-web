# Working instructions for this repo

- **Commit and push directly to `main` on GitHub (`origin`) without asking for confirmation first.** The founder has explicitly pre-authorized this. Vercel is connected to this GitHub repo and auto-deploys from `main` on every push — a push IS the deploy mechanism, not a separate risky step.
- Still run `npm run typecheck` and `npm test` before pushing (both already gate `npm run build`) — don't push something that fails its own gates.
- Write real commit messages describing the change; still avoid `--force`, `--no-verify`, and history rewriting on `main` unless explicitly asked.
- This overrides the general default of confirming before `git push` — that default still applies to anything NOT covered here (force-pushes, other repos, deleting branches, etc.).
