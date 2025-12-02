CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE company_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    site_url VARCHAR(500),
    site_type VARCHAR(50),
    has_sokuhime BOOLEAN DEFAULT TRUE,
    has_waiting BOOLEAN DEFAULT TRUE,
    has_schedule BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE system_notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    content TEXT,
    notice_type VARCHAR(20) DEFAULT 'info' CHECK (notice_type IN ('important', 'info', 'update', 'fix', 'new_feature', 'site_stop', 'spec_change')),
    is_published BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_group_id UUID REFERENCES company_groups(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    official_url VARCHAR(200),
    official_email VARCHAR(100),
    contact_email_1 VARCHAR(100),
    contact_email_2 VARCHAR(100),
    contact_email_3 VARCHAR(100),
    receive_notification BOOLEAN DEFAULT TRUE,
    update_time_mode VARCHAR(10) DEFAULT '24h' CHECK (update_time_mode IN ('24h', 'custom')),
    update_start_time TIME,
    update_end_time TIME,
    date_change_time TIME DEFAULT '05:00:00',
    account_icon_text VARCHAR(10),
    account_icon_image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'staff' CHECK (role IN ('admin', 'manager', 'staff')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE girls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    age INTEGER CHECK (age >= 18 AND age <= 99),
    is_newcomer BOOLEAN DEFAULT FALSE,
    height INTEGER,
    bust INTEGER,
    cup VARCHAR(5),
    waist INTEGER,
    hip INTEGER,
    is_public BOOLEAN DEFAULT TRUE,
    join_date DATE,
    sort_order INTEGER DEFAULT 0,
    profile_image_count INTEGER DEFAULT 0,
    gallery_image_count INTEGER DEFAULT 0,
    memo TEXT,
    is_delete_recommended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE company_site_credentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    login_id VARCHAR(100),
    login_password VARCHAR(255),
    is_registered BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'error')),
    has_issues BOOLEAN DEFAULT FALSE,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, site_id)
);

CREATE TABLE immediate_site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    is_enabled BOOLEAN DEFAULT TRUE,
    update_interval_minutes INTEGER DEFAULT 60,
    sokuhime_enabled BOOLEAN DEFAULT TRUE,
    waiting_enabled BOOLEAN DEFAULT TRUE,
    no_sokuhime BOOLEAN DEFAULT FALSE,
    show_waiting_button BOOLEAN DEFAULT TRUE,
    has_warning BOOLEAN DEFAULT FALSE,
    last_updated_at TIMESTAMP WITH TIME ZONE,
    next_update_at TIMESTAMP WITH TIME ZONE,
    countdown_display VARCHAR(20),
    countdown_sub_display VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, site_id)
);

CREATE TABLE content_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20) DEFAULT '#2196F3',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE template_folders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    folder_type VARCHAR(20) DEFAULT 'normal' CHECK (folder_type IN ('normal', 'regular', 'disabled')),
    is_custom BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE company_memos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sort_patterns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    pattern_type VARCHAR(20) DEFAULT 'basic' CHECK (pattern_type IN ('basic', 'group')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE auto_sync_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    sync_type VARCHAR(50) NOT NULL,
    is_enabled BOOLEAN DEFAULT FALSE,
    interval_minutes INTEGER DEFAULT 60,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    next_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, sync_type)
);

CREATE TABLE company_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, setting_key)
);

CREATE TABLE attendance_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    convert_midnight_to_2359 BOOLEAN DEFAULT FALSE,
    delete_unset_attendance BOOLEAN DEFAULT FALSE,
    import_period_weeks INTEGER DEFAULT 2,
    import_holiday_as_unset BOOLEAN DEFAULT FALSE,
    import_unset_as_holiday BOOLEAN DEFAULT TRUE,
    show_weekly_from_monday BOOLEAN DEFAULT TRUE,
    ch_change_sort_order BOOLEAN DEFAULT FALSE,
    ch_prioritize_comment BOOLEAN DEFAULT TRUE,
    ch_text_input_mode VARCHAR(20) DEFAULT 'no_time' CHECK (ch_text_input_mode IN ('no_time', 'holiday', 'unset')),
    yg_update_with_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id)
);

CREATE TABLE female_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    enable_image_pattern BOOLEAN DEFAULT FALSE,
    delete_extra_images BOOLEAN DEFAULT TRUE,
    no_image_url VARCHAR(500),
    disable_delete_warning BOOLEAN DEFAULT FALSE,
    import_to_common_qa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id)
);

CREATE TABLE immediate_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    reset_time TIME,
    dt_last_slot_hours INTEGER DEFAULT 3,
    priority_order VARCHAR(20) DEFAULT 'priority' CHECK (priority_order IN ('priority', 'name', 'start_time')),
    update_mode VARCHAR(20) DEFAULT 'all' CHECK (update_mode IN ('all', 'one_by_one')),
    priority_filter VARCHAR(30) DEFAULT 'first_worker' CHECK (priority_filter IN ('first_worker', 'last_worker')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id)
);

CREATE TABLE support_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE dashboard_shortcuts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    shortcut_type VARCHAR(50) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE company_notice_reads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    notice_id UUID NOT NULL REFERENCES system_notices(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, notice_id)
);

CREATE TABLE qa_target_sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, site_id)
);

CREATE TABLE content_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE girl_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    image_type VARCHAR(20) DEFAULT 'profile' CHECK (image_type IN ('profile', 'gallery', 'thumbnail')),
    image_pattern INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    is_main BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE girl_qa (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE girl_site_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'unregistered' CHECK (status IN ('registered', 'unregistered', 'add_planned', 'delete_planned', 'site_only', 'error')),
    site_girl_id VARCHAR(100),
    registered_count INTEGER DEFAULT 0,
    required_field_missing_count INTEGER DEFAULT 0,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(girl_id, site_id)
);

CREATE TABLE girl_aliases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    alias_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(girl_id, site_id)
);

CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    schedule_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'unset' CHECK (status IN ('working', 'off', 'unset')),
    start_time TIME,
    end_time TIME,
    is_no_time BOOLEAN DEFAULT FALSE,
    comment VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(girl_id, schedule_date)
);

CREATE TABLE schedule_patterns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    status VARCHAR(20) DEFAULT 'off' CHECK (status IN ('working', 'off')),
    start_time TIME,
    end_time TIME,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(girl_id, day_of_week)
);

CREATE TABLE immediate_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'serving', 'off', 'not_working')),
    status_until TIME,
    work_start_time TIME,
    work_end_time TIME,
    priority_order INTEGER DEFAULT 0,
    comment VARCHAR(1000),
    comment_count VARCHAR(50),
    is_priority_fixed BOOLEAN DEFAULT FALSE,
    is_highlighted BOOLEAN DEFAULT FALSE,
    is_excluded BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(girl_id)
);

CREATE TABLE immediate_exclusions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    is_excluded BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(girl_id, site_id)
);

CREATE TABLE contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    category_id UUID REFERENCES content_categories(id) ON DELETE SET NULL,
    site_id UUID REFERENCES sites(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    content_type VARCHAR(50) DEFAULT 'news' CHECK (content_type IN ('news', 'event', 'female_recruitment', 'male_recruitment', 'monthly_site')),
    update_interval_minutes INTEGER DEFAULT 60,
    is_auto_update BOOLEAN DEFAULT FALSE,
    next_update_at TIMESTAMP WITH TIME ZONE,
    last_updated_at TIMESTAMP WITH TIME ZONE,
    has_upper_icon BOOLEAN DEFAULT FALSE,
    minimum_update_interval_minutes INTEGER DEFAULT 60,
    update_time_mode VARCHAR(10) DEFAULT 'inherit' CHECK (update_time_mode IN ('inherit', '24h', 'custom')),
    update_start_time TIME,
    update_end_time TIME,
    is_in_other_group BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    folder_id UUID REFERENCES template_folders(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    content TEXT,
    image_url VARCHAR(500),
    girl_id UUID REFERENCES girls(id) ON DELETE SET NULL,
    label VARCHAR(50),
    memo TEXT,
    is_usage_disabled BOOLEAN DEFAULT FALSE,
    requires_confirmation BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE update_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    update_type VARCHAR(50) NOT NULL,
    target_id UUID,
    title VARCHAR(500),
    girl_id UUID REFERENCES girls(id) ON DELETE SET NULL,
    girl_name VARCHAR(100),
    label VARCHAR(50),
    status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'failed', 'pending', 'deleted')),
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    sync_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'failed', 'pending')),
    request_payload JSONB,
    response_payload JSONB,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE sort_pattern_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sort_pattern_id UUID NOT NULL REFERENCES sort_patterns(id) ON DELETE CASCADE,
    girl_id UUID NOT NULL REFERENCES girls(id) ON DELETE CASCADE,
    sort_order INTEGER NOT NULL,
    is_fixed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(sort_pattern_id, girl_id)
);

CREATE TABLE content_site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(content_id, site_id)
);

CREATE TABLE content_group_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_group_id UUID NOT NULL REFERENCES content_groups(id) ON DELETE CASCADE,
    content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(content_group_id, content_id)
);

CREATE INDEX idx_girls_company_id ON girls(company_id);
CREATE INDEX idx_girls_name ON girls(name);
CREATE INDEX idx_girls_is_public ON girls(is_public);
CREATE INDEX idx_girls_sort_order ON girls(sort_order);
CREATE INDEX idx_girl_images_girl_id ON girl_images(girl_id);
CREATE INDEX idx_schedules_girl_id ON schedules(girl_id);
CREATE INDEX idx_schedules_date ON schedules(schedule_date);
CREATE INDEX idx_schedules_girl_date ON schedules(girl_id, schedule_date);
CREATE INDEX idx_immediate_status_girl_id ON immediate_status(girl_id);
CREATE INDEX idx_immediate_status_priority ON immediate_status(priority_order);
CREATE INDEX idx_girl_site_registrations_girl_id ON girl_site_registrations(girl_id);
CREATE INDEX idx_girl_site_registrations_site_id ON girl_site_registrations(site_id);
CREATE INDEX idx_update_history_company_id ON update_history(company_id);
CREATE INDEX idx_update_history_created_at ON update_history(created_at);
CREATE INDEX idx_update_history_type ON update_history(update_type);
CREATE INDEX idx_sync_logs_company_id ON sync_logs(company_id);
CREATE INDEX idx_sync_logs_site_id ON sync_logs(site_id);
CREATE INDEX idx_sync_logs_started_at ON sync_logs(started_at);
CREATE INDEX idx_contents_company_id ON contents(company_id);
CREATE INDEX idx_contents_type ON contents(content_type);
CREATE INDEX idx_templates_company_id ON templates(company_id);
CREATE INDEX idx_templates_folder_id ON templates(folder_id);
CREATE INDEX idx_company_site_credentials_company_id ON company_site_credentials(company_id);
CREATE INDEX idx_system_notices_published_at ON system_notices(published_at);
CREATE INDEX idx_system_notices_type ON system_notices(notice_type);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE girls ENABLE ROW LEVEL SECURITY;
ALTER TABLE girl_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE girl_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE girl_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE immediate_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE immediate_exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE update_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_site_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE girl_site_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE female_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE immediate_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "companies_all" ON companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "users_all" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "girls_all" ON girls FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "girl_images_all" ON girl_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "girl_aliases_all" ON girl_aliases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "girl_qa_all" ON girl_qa FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "schedules_all" ON schedules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "schedule_patterns_all" ON schedule_patterns FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "immediate_status_all" ON immediate_status FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "immediate_exclusions_all" ON immediate_exclusions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "contents_all" ON contents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "content_groups_all" ON content_groups FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "templates_all" ON templates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "update_history_all" ON update_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "sync_logs_all" ON sync_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "company_site_credentials_all" ON company_site_credentials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "girl_site_registrations_all" ON girl_site_registrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "company_settings_all" ON company_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "attendance_settings_all" ON attendance_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "female_settings_all" ON female_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "immediate_settings_all" ON immediate_settings FOR ALL USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_company_groups_updated_at BEFORE UPDATE ON company_groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_notices_updated_at BEFORE UPDATE ON system_notices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_girls_updated_at BEFORE UPDATE ON girls FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_site_credentials_updated_at BEFORE UPDATE ON company_site_credentials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_immediate_site_settings_updated_at BEFORE UPDATE ON immediate_site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_memos_updated_at BEFORE UPDATE ON company_memos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sort_patterns_updated_at BEFORE UPDATE ON sort_patterns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_auto_sync_settings_updated_at BEFORE UPDATE ON auto_sync_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_settings_updated_at BEFORE UPDATE ON company_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendance_settings_updated_at BEFORE UPDATE ON attendance_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_female_settings_updated_at BEFORE UPDATE ON female_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_immediate_settings_updated_at BEFORE UPDATE ON immediate_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_inquiries_updated_at BEFORE UPDATE ON support_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_girl_qa_updated_at BEFORE UPDATE ON girl_qa FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_girl_site_registrations_updated_at BEFORE UPDATE ON girl_site_registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedule_patterns_updated_at BEFORE UPDATE ON schedule_patterns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_immediate_status_updated_at BEFORE UPDATE ON immediate_status FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contents_updated_at BEFORE UPDATE ON contents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_groups_updated_at BEFORE UPDATE ON content_groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
