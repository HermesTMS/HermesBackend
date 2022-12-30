CREATE POLICY tenant_isolation_policy ON users USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO hermestms;
GRANT ALL PRIVILEGES ON DATABASE hermes_tms to hermestms;
GRANT USAGE, CREATE ON SCHEMA public TO hermestms;

CREATE POLICY tenant_isolation_policy ON address USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON banking_details USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON client USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON contact_person USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON driver USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON ensamble USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON expense USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON file USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON invoice USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON orders USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON package USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON trailers USING ("tenantId" = current_setting('hermestms.current_tenant')::text);
CREATE POLICY tenant_isolation_policy ON vehicles USING ("tenantId" = current_setting('hermestms.current_tenant')::text);

ALTER TABLE address ENABLE ROW LEVEL SECURITY;
ALTER TABLE address FORCE ROW LEVEL SECURITY;

ALTER TABLE banking_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE banking_details  FORCE ROW LEVEL SECURITY;

ALTER TABLE client ENABLE ROW LEVEL SECURITY;
ALTER TABLE client FORCE ROW LEVEL SECURITY;

ALTER TABLE contact_person ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_person FORCE ROW LEVEL SECURITY;

ALTER TABLE driver ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver FORCE ROW LEVEL SECURITY;

ALTER TABLE ensamble ENABLE ROW LEVEL SECURITY;
ALTER TABLE ensamble FORCE ROW LEVEL SECURITY;

ALTER TABLE expense ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense FORCE ROW LEVEL SECURITY;

ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE files FORCE ROW LEVEL SECURITY;

ALTER TABLE invoice ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice FORCE ROW LEVEL SECURITY;

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;

ALTER TABLE package ENABLE ROW LEVEL SECURITY;
ALTER TABLE package FORCE ROW LEVEL SECURITY;

ALTER TABLE trailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE trailers FORCE ROW LEVEL SECURITY;

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles FORCE ROW LEVEL SECURITY;
