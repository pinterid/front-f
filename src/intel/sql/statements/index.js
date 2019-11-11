const init_platform = `
  DROP TABLE IF EXISTS platform;
  CREATE TABLE IF NOT EXISTS platform (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    url VARCHAR(2048) NOT NULL,
    avatarUrl VARCHAR(2048) NOT NULL,
    websiteUrl VARCHAR(2048) NOT NULL,
    company VARCHAR(80) NOT NULL,
    email VARCHAR(254) NOT NULL,
    fullName VARCHAR(80) NOT NULL,
    createdAt DATE NOT NULL,
    location VARCHAR(80) NULL,
    statusMessage VARCHAR(80) NULL,
    statusEmojiHTML VARCHAR(80) NULL,
    PRIMARY KEY (id)
  );
`;
const init_organization = `
  DROP TABLE IF EXISTS organization;
  CREATE TABLE IF NOT EXISTS organization (
    id INT NOT NULL AUTO_INCREMENT,
    avatarUrl VARCHAR(2048) NOT NULL,
    name VARCHAR(80) NOT NULL,
    url VARCHAR(2048) NOT NULL,
    PRIMARY KEY (id)
  );
`;
const init_member = `
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
const init_languagePie = `
  DROP TABLE IF EXISTS languagePie;
  CREATE TABLE IF NOT EXISTS languagePie (
    id INT NOT NULL AUTO_INCREMENT,
    size INT NOT NULL,
    total INT NOT NULL,
    PRIMARY KEY (id)
  );
`;
const init_repository = `
  DROP TABLE IF EXISTS repository;
  CREATE TABLE IF NOT EXISTS repository (
    id INT NOT NULL AUTO_INCREMENT,
    avatarUrl VARCHAR(2048) NOT NULL,
    name TINYTEXT NOT NULL,
    member_id INT NOT NULL,
    languagePie_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_repository_member1
      FOREIGN KEY (member_id)
      REFERENCES member (id),
    CONSTRAINT fk_repository_languagePie1
      FOREIGN KEY (languagePie_id)
      REFERENCES languagePie (id)
  );
`;
const init_languageSlice = `
  DROP TABLE IF EXISTS languageSlice;
  CREATE TABLE IF NOT EXISTS languageSlice (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    size INT NOT NULL,
    total INT NOT NULL,
    pie_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_pie_id
      FOREIGN KEY (pie_id)
      REFERENCES languagePie (id)
  );
`;
const init_languageCrumb = `
  DROP TABLE IF EXISTS languageCrumb ;
  CREATE TABLE IF NOT EXISTS languageCrumb (
    id INT NOT NULL AUTO_INCREMENT,
    name TINYTEXT NOT NULL,
    size INT NOT NULL,
    color TINYTEXT NULL,
    slice_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT slice_id
      FOREIGN KEY (slice_id)
      REFERENCES languageSlice (id)
  );
`;
const init_busiestDay = `
  DROP TABLE IF EXISTS busiestDay;
  CREATE TABLE IF NOT EXISTS busiestDay (
    id INT NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    total INT NOT NULL,
    PRIMARY KEY (id)
  );
`;
const init_statistic = `
  DROP TABLE IF EXISTS statistic;
  CREATE TABLE IF NOT EXISTS statistic (
    id INT NOT NULL AUTO_INCREMENT,
    year INT NOT NULL,
    busiestDay_id INT NOT NULL,
    platform_id INT NOT NULL,
    current_streak_id INT NULL,
    longest_streak_id INT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_statistic_busiestDay1
      FOREIGN KEY (busiestDay_id)
      REFERENCES busiestDay (id),
    CONSTRAINT fk_statistic_streak1
      FOREIGN KEY (current_streak_id)
      REFERENCES streak (id),
    CONSTRAINT fk_statistic_streak2
      FOREIGN KEY (longest_streak_id)
      REFERENCES streak (id),
    CONSTRAINT fk_statistic_platform
      FOREIGN KEY (platform_id)
      REFERENCES platform (id)
  );
`;

const init_streak = `
  DROP TABLE IF EXISTS streak ;
  CREATE TABLE IF NOT EXISTS streak (
    id INT NOT NULL AUTO_INCREMENT,
    startDate DATE NULL,
    endDate DATE NULL,
    total INT NULL,
    statistic_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_streak_statistic1
      FOREIGN KEY (statistic_id)
      REFERENCES statistic (id)
  );
`;

const init_calendar = `
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
const init_contrib = `
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
    languageSlice_id INT NULL,
    calendar_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_contrib_languageSlice1
      FOREIGN KEY (languageSlice_id)
      REFERENCES languageSlice (id),
    CONSTRAINT fk_contrib_calendar1
      FOREIGN KEY (calendar_id)
      REFERENCES calendar (id)
  );
`;
const init_organization_has_member = `
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
const init_repository_has_member = `
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
const init_platform_has_organization = `
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
const init_platform_has_repository = `
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

//> Insert statements
// Basic

export const create_platform = `
INSERT INTO platform(
  name,
  url,
  avatarUrl,
  websiteUrl,
  company,
  email,
  fullName,
  createdAt,
  location,
  statusMessage,
  statusEmojiHTML
)
VALUES (?,?,?,?,?,?,?,?,?,?,?)
`;

export const create_organization = `
INSERT INTO organization(
  avatarUrl,
  name,
  url
)
VALUES (?,?,?)
`;

export const create_member = `
INSERT INTO member(
  avatarUrl,
  name,
  username,
  url
)
VALUES (?,?,?,?)
`;

export const create_languagePie = `
INSERT INTO languagePie(
  size,
  total
)
VALUES (?,?)
`;

export const create_repository = `
INSERT INTO repository(
  avatarUrl,
  name,
  member_id,
  languagePie_id
)
VALUES (?,?,?,?)
`;

export const create_languageSlice = `
INSERT INTO languageSlice(
  size,
  total,
  pie_id
)
VALUES (?,?,?)
`;

export const create_languageCrumb = `
INSERT INTO languageCrumb(
  name,
  size,
  color,
  slice_id
)
VALUES (?,?,?,?)
`;

export const create_busiestDay = `
INSERT INTO busiestDay(
  date,
  total
)
VALUES (?,?)
`;

export const create_statistic = `
INSERT INTO statistic(
  year,
  busiestDay_id,
  platform_id
)
VALUES (?,?,?)
`;

export const create_streak = `
INSERT INTO streak(
  startDate,
  endDate,
  total,
  statistic_id
)
VALUES (?,?,?,?)
`;

export const create_calendar = `
INSERT INTO calendar(
  date,
  week,
  weekday,
  total,
  color,
  platform_id
)
VALUES (?,?,?,?,?,?)
`;

export const create_contrib = `
INSERT INTO contrib(
  datetime,
  nameWithOwner,
  repoUrl,
  additions,
  deletions,
  changedFiles,
  type,
  languageSlice_id,
  calendar_id
)
VALUES (?,?,?,?,?,?,?,?,?)
`;

// Mappings
export const map_platform_has_organization = `
INSERT INTO platform_has_organization(
  platform_id,
  organization_id
)
VALUES (?,?)
`;

export const map_platform_has_repository = `
INSERT INTO platform_has_repository(
  platform_id,
  repository_id
)
VALUES (?,?)
`;

export const map_organization_has_member = `
INSERT INTO organization_has_member(
  organization_id,
  member_id
)
VALUES (?,?)
`;

export const map_repository_has_member = `
INSERT INTO repository_has_member(
  repository_id,
  member_id
)
VALUES (?,?)
`;

export const update_statistic_current_streak= `
UPDATE statistic SET current_streak_id = ? WHERE name = ?
`;

export const update_statistic_longest_streak= `
UPDATE statistic
  SET longest_streak_id=?
  WHERE id=?
`;

export const init_tables = `
  ${init_platform}
  ${init_organization}
  ${init_member}
  ${init_languagePie}
  ${init_repository}
  ${init_languageSlice}
  ${init_languageCrumb}
  ${init_busiestDay}
  ${init_statistic}
  ${init_streak}
  ${init_calendar}
  ${init_contrib}
  ${init_organization_has_member}
  ${init_repository_has_member}
  ${init_platform_has_organization}
  ${init_platform_has_repository}
`;
