-- ============================================================================
-- Bucket de Storage para os documentos (equivalente ao "file_url" que o
-- Base44 gerenciava automaticamente). Rode após schema.sql.
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

create policy "documents bucket: dono envia arquivos"
  on storage.objects for insert
  with check (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "documents bucket: dono lê seus arquivos"
  on storage.objects for select
  using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "documents bucket: dono remove seus arquivos"
  on storage.objects for delete
  using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);
