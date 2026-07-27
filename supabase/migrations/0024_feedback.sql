create table if not exists public.product_feedback (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        references auth.users (id) on delete set null,
  name        text,
  email       text        not null,
  category    text        not null default 'general',
  rating      smallint,
  message     text        not null,
  source      text        not null default 'web',
  page_url    text,
  status      text        not null default 'new',
  created_at  timestamptz not null default now(),
  constraint product_feedback_rating_check check (rating is null or rating between 1 and 5),
  constraint product_feedback_category_check check (category in ('general','idea','bug','content','love')),
  constraint product_feedback_status_check check (status in ('new','reviewed','planned','completed','archived'))
);

create index if not exists product_feedback_created_idx
  on public.product_feedback (created_at desc);
create index if not exists product_feedback_status_idx
  on public.product_feedback (status);

alter table public.product_feedback enable row level security;
-- All reads and writes go through server APIs. This keeps public submissions
-- write-only and the complete inbox founder-only.
