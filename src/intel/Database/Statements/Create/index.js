export const platform = `
    DROP TABLE IF EXISTS platform;
    CREATE TABLE IF NOT EXISTS platform (
        id INT NOT NULL AUTO_INCREMENT,
        platformName VARCHAR(80) NOT NULL,
        platformUrl VARCHAR(2048) NOT NULL,
        avatarUrl VARCHAR(2048) NOT NULL,
        websiteUrl VARCHAR(2048) NOT NULL,
        company VARCHAR(80) NOT NULL,
        email VARCHAR(254) NOT NULL,
        username VARCHAR(80) NOT NULL,
        fullName VARCHAR(80) NOT NULL,
        createdAt DATE NOT NULL,
        location VARCHAR(80) NULL,
        statusMessage VARCHAR(80) NULL,
        statusEmojiHTML VARCHAR(80) NULL,
        PRIMARY KEY (id)
    );
`;

export const organization = `
    DROP TABLE IF EXISTS organization;
    CREATE TABLE IF NOT EXISTS organization (
        id INT NOT NULL AUTO_INCREMENT,
        avatarUrl VARCHAR(2048) NOT NULL,
        name VARCHAR(80) NOT NULL,
        url VARCHAR(2048) NOT NULL,
        PRIMARY KEY (id)
    );
`;

export const member = `
    DROP TABLE IF EXISTS member;
    CREATE TABLE IF NOT EXISTS member (
        id INT NOT NULL AUTO_INCREMENT,
        avatarUrl VARCHAR(2048) NOT NULL,
        name VARCHAR(80) NULL,
        username VARCHAR(80) NOT NULL,
        url VARCHAR(2048) NOT NULL,
        PRIMARY KEY (id)
    );
`;

export const languagePie = `
    DROP TABLE IF EXISTS languagePie;
    CREATE TABLE IF NOT EXISTS languagePie (
        id INT NOT NULL AUTO_INCREMENT,
        size INT NOT NULL,
        total INT NOT NULL,
        PRIMARY KEY (id)
    );
`;

export const repository = `
    DROP TABLE IF EXISTS repository;
    CREATE TABLE IF NOT EXISTS repository (
        id INT NOT NULL AUTO_INCREMENT,
        avatarUrl VARCHAR(2048) NOT NULL,
        name VARCHAR(80) NOT NULL,
        member_id INT NOT NULL,
        owner_id INT NULL,
        languagePie_id INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_repository_member1
            FOREIGN KEY (member_id)
            REFERENCES member (id),
        CONSTRAINT fk_repository_owner1
            FOREIGN KEY (owner_id)
            REFERENCES member (id),
        CONSTRAINT fk_repository_languagePie1
            FOREIGN KEY (languagePie_id)
            REFERENCES languagePie (id)
    );
`;

export const languageSlice = `
    DROP TABLE IF EXISTS languageSlice;
    CREATE TABLE IF NOT EXISTS languageSlice (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        color VARCHAR(7) NULL,
        name VARCHAR(80) NOT NULL,
        size INT NOT NULL,
        total INT NOT NULL,
        pie_id INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_pie_id
            FOREIGN KEY (pie_id)
            REFERENCES languagePie (id)
    );
`;

export const busiestDay = `
    DROP TABLE IF EXISTS busiestDay;
    CREATE TABLE IF NOT EXISTS busiestDay (
        id INT NOT NULL AUTO_INCREMENT,
        date DATE NOT NULL,
        total INT NOT NULL,
        PRIMARY KEY (id)
    );
`;

export const statistic = `
    DROP TABLE IF EXISTS statistic;
    CREATE TABLE IF NOT EXISTS statistic (
        id INT NOT NULL AUTO_INCREMENT,
        year INT NOT NULL,
        busiestDay_id INT NOT NULL,
        platform_id INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_statistic_busiestDay1
            FOREIGN KEY (busiestDay_id)
            REFERENCES busiestDay (id),
        CONSTRAINT fk_statistic_platform
            FOREIGN KEY (platform_id)
            REFERENCES platform (id)
    );
`;

export const streak = `
    DROP TABLE IF EXISTS streak ;
    CREATE TABLE IF NOT EXISTS streak (
        id INT NOT NULL AUTO_INCREMENT,
        startDate DATE NULL,
        endDate DATE NULL,
        total INT NULL,
        statistic_id INT NOT NULL REFERENCES statistic(id),
        PRIMARY KEY (id)
    );
`;

export const calendar = `
    DROP TABLE IF EXISTS calendar;
    CREATE TABLE IF NOT EXISTS calendar (
        id INT NOT NULL AUTO_INCREMENT,
        date DATE NOT NULL,
        week INT NOT NULL,
        weekday INT NOT NULL,
        total INT NOT NULL,
        color VARCHAR(7) NULL,
        platform_id INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_calendar_platform1
            FOREIGN KEY (platform_id)
            REFERENCES platform (id)
    );
`;

export const contrib = `
    DROP TABLE IF EXISTS contrib;
    CREATE TABLE IF NOT EXISTS contrib (
        id INT NOT NULL AUTO_INCREMENT,
        datetime DATETIME NOT NULL,
        nameWithOwner VARCHAR(255) NOT NULL,
        repoUrl VARCHAR(255) NOT NULL,
        additions INT NULL,
        deletions INT NULL,
        changedFiles INT NULL,
        type VARCHAR(255) NOT NULL,
        calendar_id INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_contrib_calendar1
            FOREIGN KEY (calendar_id)
            REFERENCES calendar (id)
    );
`;

export const organization_has_member = `
    DROP TABLE IF EXISTS organization_has_member ;
    CREATE TABLE IF NOT EXISTS organization_has_member (
        organization_id INT NOT NULL,
        member_id INT NOT NULL,
        PRIMARY KEY (organization_id, member_id),
        CONSTRAINT fk_organization_has_member_organization1
            FOREIGN KEY (organization_id)
            REFERENCES organization (id),
        CONSTRAINT fk_organization_has_member_member1
            FOREIGN KEY (member_id)
            REFERENCES member (id)    
    );
`;

export const repository_has_member = `
    DROP TABLE IF EXISTS repository_has_member;
    CREATE TABLE IF NOT EXISTS repository_has_member (
        repository_id INT NOT NULL,
        member_id INT NOT NULL,
        PRIMARY KEY (repository_id, member_id),
        CONSTRAINT fk_repository_has_member_repository1
            FOREIGN KEY (repository_id)
            REFERENCES repository (id),
        CONSTRAINT fk_repository_has_member_member1
            FOREIGN KEY (member_id)
            REFERENCES member (id)
    );
`;

export const platform_has_organization = `
    DROP TABLE IF EXISTS platform_has_organization;
    CREATE TABLE IF NOT EXISTS platform_has_organization (
        platform_id INT NOT NULL,
        organization_id INT NOT NULL,
        PRIMARY KEY (platform_id, organization_id),
        CONSTRAINT fk_platform_has_organization_platform1
            FOREIGN KEY (platform_id)
            REFERENCES platform (id),
        CONSTRAINT fk_platform_has_organization_organization1
            FOREIGN KEY (organization_id)
            REFERENCES organization (id)
    );
`;

export const platform_has_repository = `
    DROP TABLE IF EXISTS platform_has_repository ;
    CREATE TABLE IF NOT EXISTS platform_has_repository (
        platform_id INT NOT NULL,
        repository_id INT NOT NULL,
        PRIMARY KEY (platform_id, repository_id),
        CONSTRAINT fk_platform_has_repository_platform1
            FOREIGN KEY (platform_id)
            REFERENCES platform (id),
        CONSTRAINT fk_platform_has_repository_repository1
            FOREIGN KEY (repository_id)
            REFERENCES repository (id)    
    );
`;