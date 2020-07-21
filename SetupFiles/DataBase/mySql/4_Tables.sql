
-- ==========================  TABLES  =====================--

CREATE TABLE CLIENT (
  INTERNAL_ID BIGINT(16) PRIMARY KEY AUTO_INCREMENT,
  ID VARCHAR(40),
  SECRET VARCHAR(40),
  LOGIN_ID VARCHAR(40) UNIQUE,
  PASSWORD VARCHAR(40),
  REDIRECT_URI VARCHAR(2048),
  EMAIL VARCHAR(128)
);

CREATE TABLE USER (
  INTERNAL_ID BIGINT(16) PRIMARY KEY AUTO_INCREMENT,
  LOGIN_ID VARCHAR(64) UNIQUE,
  PASSWORD VARCHAR(64),
  EMAIL VARCHAR(128)
);

CREATE TABLE PROFILE (
  INTERNAL_ID BIGINT(16) PRIMARY KEY AUTO_INCREMENT,
  USER_INTERNAL_ID BIGINT(16),
  NAME VARCHAR(64),
  JSON LONGBLOB,
  CONSTRAINT COMP_PK_PROFILE PRIMARY KEY (USER_INTERNAL_ID, NAME),
  CONSTRAINT FK_PROFILE_USER FOREIGN KEY (USER_INTERNAL_ID) REFERENCES USER(INTERNAL_ID)
);

CREATE TABLE CLIENT_PROFILE_MAP {
  USER_INTERNAL_ID BIGINT(16),
  CLIENT_INTERNAL_ID BIGINT(16),
  PROFILE_INTERNAL_ID BIGINT(16),
  CONSTRAINT FK_TOKEN_USER FOREIGN KEY (USER_INTERNAL_ID) REFERENCES USER(INTERNAL_ID),
  CONSTRAINT FK_CLIENT_USER FOREIGN KEY (CLIENT_INTERNAL_ID) REFERENCES CLIENT(INTERNAL_ID),
  CONSTRAINT COMP_PK_CLIENT_PROFILE_MAP PRIMARY KEY (USER_INTERNAL_ID, CLIENT_INTERNAL_ID)
}

CREATE TABLE TOKEN (
  VALUE VARCHAR(40),
  USER_INTERNAL_ID BIGINT(16),
  CLIENT_INTERNAL_ID BIGINT(16),
  EXPIRES_AT DATETIME,
  SCOPE VARCHAR(256),
  CONSTRAINT FK_TOKEN_USER FOREIGN KEY (USER_INTERNAL_ID) REFERENCES USER(INTERNAL_ID),
  CONSTRAINT FK_CLIENT_USER FOREIGN KEY (CLIENT_INTERNAL_ID) REFERENCES CLIENT(INTERNAL_ID),
  CONSTRAINT COMP_PK_TOKEN PRIMARY KEY (USER_INTERNAL_ID, CLIENT_INTERNAL_ID),
);

CREATE TABLE USER_LOGGED_IN (
  USER_INTERNAL_ID BIGINT(16),
  TOKEN VARCHAR(40),
  EXPIRES_AT DATETIME,
  CONSTRAINT COMP_PK_USER_LOG_IN PRIMARY KEY (USER_INTERNAL_ID, TOKEN),
  CONSTRAINT FK_LOG_IN_USER FOREIGN KEY (USER_INTERNAL_ID) REFERENCES USER(INTERNAL_ID)
);

CREATE TABLE CLIENT_LOGGED_IN (
  CLIENT_INTERNAL_ID BIGINT(16),
  TOKEN VARCHAR(40),
  EXPIRES_AT DATETIME,
  CONSTRAINT COMP_PK_CLIENT_LOG_IN PRIMARY KEY (CLIENT_INTERNAL_ID, TOKEN),
  CONSTRAINT FK_LOG_IN_CLIENT FOREIGN KEY (CLIENT_INTERNAL_ID) REFERENCES CLIENT(INTERNAL_ID)
);

CREATE TABLE SERVER (
  INTERNAL_ID BIGINT(16) PRIMARY KEY AUTO_INCREMENT,
  USER_INTERNAL_ID BIGINT(16),
  EMAIL VARCHAR(128),
  PHONE_NUMBER INT,
  HOST VARCHAR(512),
  ID_COUNT INT,
  ID_MAX INT
);

CREATE TABLE ID_SERVER_MAP (
  LOGIN_ID VARCHAR(64) UNIQUE,
  SERVER_INTERNAL_ID BIGINT(16),
  CONSTRAINT COMP_PK_ID_SERVER_MAP PRIMARY KEY (LOGIN_ID, SERVER_INTERNAL_ID),
  CONSTRAINT FK_ID_SER_MAP_SERVER FOREIGN KEY (SERVER_INTERNAL_ID) REFERENCES SERVER(INTERNAL_ID)
);
