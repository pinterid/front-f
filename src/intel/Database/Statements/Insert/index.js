export const platform = `
INSERT INTO platform(
    platformName,
    platformUrl,
    avatarUrl,
    websiteUrl,
    company,
    email,
    username,
    fullName,
    createdAt,
    location,
    statusMessage,
    statusEmojiHTML
)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
`;

export const organization = `
INSERT INTO organization(
    avatarUrl,
    name,
    url
)
VALUES (?,?,?)
`;

export const member = `
INSERT INTO member(
    avatarUrl,
    name,
    username,
    url
)
VALUES (?,?,?,?)
`;

export const languagePie = `
INSERT INTO languagePie(
    size,
    total
)
VALUES (?,?)
`;

export const repository = `
INSERT INTO repository(
    avatarUrl,
    name,
    member_id,
    owner_id,
    languagePie_id
)
VALUES (?,?,?,?,?)
`;

export const languageSlice = `
INSERT INTO languageSlice(
    name,
    color,
    size,
    total,
    pie_id
)
VALUES (?,?,?,?,?)
`;

export const busiestDay = `
INSERT INTO busiestDay(
    date,
    total
)
VALUES (?,?)
`;

export const statistic = `
INSERT INTO statistic(
    year,
    busiestDay_id,
    platform_id
)
VALUES (?,?,?)
`;

export const streak = `
INSERT INTO streak(
    startDate,
    endDate,
    total,
    statistic_id
)
VALUES (?,?,?,?)
`;

export const calendar = `
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

export const contrib = `
    INSERT INTO contrib(
    datetime,
    nameWithOwner,
    repoUrl,
    additions,
    deletions,
    changedFiles,
    type,
    calendar_id
)
VALUES (?,?,?,?,?,?,?,?)
`;

export const platform_has_organization = `
INSERT INTO platform_has_organization(
    platform_id,
    organization_id
)
VALUES (?,?)
`;

export const platform_has_repository = `
INSERT INTO platform_has_repository(
    platform_id,
    repository_id
)
VALUES (?,?)
`;

export const organization_has_member = `
INSERT INTO organization_has_member(
    organization_id,
    member_id
)
VALUES (?,?)
`;

export const repository_has_member = `
INSERT INTO repository_has_member(
    repository_id,
    member_id
)
VALUES (?,?)
`;