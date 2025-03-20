-- CREATE DATABASE hobbyplanner;

USE hobbyplanner;

DROP TABLE IF EXISTS userProfile;
DROP TABLE IF EXISTS hobbyItem;

CREATE TABLE userProfile (
    userName VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (userName)
);

CREATE TABLE hobbyItem (
	userName VARCHAR(255) NOT NULL,
    itemId INT auto_increment,
    title VARCHAR(255) NOT NULL,
    itemDescription VARCHAR(255),
    availDateTimeStart DATETIME,
    availDateTimeEnd DATETIME,
    timestamp DATETIME DEFAULT NOW(),
    
    PRIMARY KEY (itemId)
);

-- SELECT * FROM userProfile;
-- SELECT * FROM hobbyItem;

INSERT INTO userProfile (
    userName,
    userPassword
) VALUES (
    "new",
    "1234"
),
(
    "User23",
    "root"
);

INSERT INTO hobbyItem (
    userName,
    title,
    itemDescription,
    availDateTimeStart,
    availDateTimeEnd
) VALUES (
    "User23",
    "TCG",
    "Pokemon",
    "2025-03-22 15:00:00",
    "2025-03-22 16:30:00"
),
(
    "User23",
    "Video Game",
    "Elden Ring",
    "2025-03-25 08:00:00",
    "2025-03-25 14:00:00"
),
(
    "User23",
    "Knitting",
    "A turtle",
    "2025-03-27 12:30:00",
    "2025-03-27 13:00:00"
),
(
    "User23",
    "Video Game",
    "Mario Kart",
    "2025-03-25 02:00:00",
    "2025-03-25 04:00:00"
);