-- Persist the provenance and Charles feedback for an uploaded result baseline.
-- Original PDFs are deliberately never stored.
alter table public.acca_diagnostics
  add column if not exists source text not null default 'diagnostic'
    check (source in ('diagnostic', 'result-upload')),
  add column if not exists evidence jsonb not null default '{}'::jsonb;
