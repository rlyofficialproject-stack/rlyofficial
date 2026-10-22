-- ब्लॉक २: आर एल वाई संप्रभु सुरक्षा ट्रिगर्स नोड

CREATE TRIGGER IF NOT EXISTS rly_m मर्यादा_मजबूती_चेक
BEFORE UPDATE ON rly_sovereign_vault
FOR EACH ROW
BEGIN
    -- ५-प्लेटफ़ॉर्म मर्यादा शून्य-अश्लीलता फ़िल्टर को हमेशा LOCKED मोड पर रखने का कड़ा नियम
    SET NEW.decency_filter_status = 'LOCKED';
END;
