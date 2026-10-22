-- आर एल वाई संप्रभु कोर डेटाबेस आर्किटेक्चर (SQL Master Schema)

CREATE TABLE rly_sovereign_vault (
    rly_uid INTEGER PRIMARY KEY AUTOINCREMENT,
    pulse_matrix_hash TEXT NOT NULL,         
    invisible_pin_secure TEXT NOT NULL,       
    ocr_identity_sandbox TEXT NOT NULL,      
    language_preference TEXT DEFAULT 'hi',   
    decency_filter_status TEXT DEFAULT 'LOCKED', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rly_omnimart_catalog (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,              
    item_category TEXT NOT NULL,             
    item_name TEXT NOT NULL,                 
    base_price DECIMAL(15, 2) NOT NULL,      
    gst_percentage INTEGER NOT NULL,          
    live_sync_status TEXT DEFAULT '100% LIVE',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rly_financial_kill_switch (
    trigger_id INTEGER PRIMARY KEY AUTOINCREMENT,
    node_source TEXT DEFAULT 'SOVEREIGN-NODE-01',
    external_interference_detected BOOLEAN DEFAULT FALSE,
    gst_distribution_status TEXT DEFAULT 'ACTIVE', 
    frozen_funds_ledger DECIMAL(15, 2) DEFAULT 0.00,
    action_taken_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO rly_omnimart_catalog (company_name, item_category, item_name, base_price, gst_percentage) 
VALUES 
('Toyota', 'Automotive', 'Fortuner Legender (2026 Facelift)', 4300000.00, 18),
('Mahindra', 'Automotive', 'Scorpio-N (2026 Facelift)', 1800000.00, 5);
