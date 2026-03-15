-- Verify all tables and indexes exist
SELECT table_name
FROM   information_schema.tables
WHERE  table_schema = 'public'
ORDER  BY table_name;

SELECT indexname, tablename
FROM   pg_indexes
WHERE  schemaname = 'public'
ORDER  BY tablename, indexname;
