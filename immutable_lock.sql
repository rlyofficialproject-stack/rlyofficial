-- ब्लॉक ३: स्वचालित वित्तीय किल-स्विच एवं अपरिवर्तनीय लॉक

CREATE TRIGGER IF NOT EXISTS rly_gst_freeze_trigger
BEFORE UPDATE ON rly_financial_kill_switch
FOR EACH ROW
WHEN NEW.external_interference_detected = TRUE
BEGIN
    -- हस्तक्षेप डिटेक्ट होते ही टैक्स वितरण तत्काल फ्रीज
    SET NEW.gst_distribution_status = 'FREEZE_TO_QUARTZ';
END;
