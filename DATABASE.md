# Policy and user privileges for connection
```
    CREATE POLICY tenant_isolation_policy ON users USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE users FORCE ROW LEVEL SECURITY;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO hermestms;
    GRANT ALL PRIVILEGES ON DATABASE hermes_tms to hermestms;
    GRANT USAGE, CREATE ON SCHEMA public TO hermestms;
```